import pandas as pd


class CityCode:
    def __init__(self):
        df_code = pd.read_csv(
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vR__LlI0QK_dZhhYt-2zDtpYjWqQ38o4lCLlBv8VYUrgKaxKajhacM36F-tlXpt8_WvhyfLTCQ6QFVM/pub?gid=0&single=true&output=csv')
        df_code["市区町村名"] = df_code["郡名"].fillna("") + df_code["市区町村名"]
        df_code.drop("郡名", axis=1, inplace=True)
        self._df_code = df_code

    def add_citycode(self, data: list, header: list) -> list:
        cjk = str.maketrans("⻲⻑黑戶⻯⻄⻘⻤", "亀長黒戸竜西青鬼")
        df_local = pd.DataFrame(data)
        df_local.columns = header
        # normalize
        df_local["都道府県名"] = df_local["都道府県名"].str.normalize("NFKC")
        df_local["市区町村名"] = df_local["市区町村名"].str.normalize("NFKC")
        df_local["都道府県名"] = df_local["都道府県名"].apply(lambda s: s.translate(cjk))
        df_local["市区町村名"] = df_local["市区町村名"].apply(lambda s: s.translate(cjk))
        # remove spaces
        df_local["市区町村名"] = df_local["市区町村名"].str.replace(
            ' ', '').replace('　', '')
        # 都道府県と市区町村を繋げたカラムを作る
        df_local.insert(0, '地名', df_local["都道府県名"] + df_local["市区町村名"])
        # PDFと市区町村コード表との差異を吸収
        df_local["市区町村名"] = df_local["市区町村名"].mask(
            df_local["地名"] == "兵庫県篠山市", "丹波篠山市")
        df_local["市区町村名"] = df_local["市区町村名"].mask(
            df_local["地名"] == "高知県高岡郡梼原町", "高岡郡檮原町")
        df_local["市区町村名"] = df_local["市区町村名"].mask(
            df_local["地名"] == "福岡県糟屋郡須惠町", "糟屋郡須恵町")
        df_local["市区町村名"] = df_local["市区町村名"].mask(
            df_local["地名"] == "福岡県筑紫郡那珂川町", "那珂川市")
        # マージする
        df_local = pd.merge(df_local, self._df_code, on=[
            '都道府県名', '市区町村名'], how="left")
        df_local["団体コード"] = df_local["団体コード"].astype("Int64")

        # errorデータ
        if (df_local.isnull().values.sum() > 0):
            print("Code is not found")
            print(df_local[df_local['団体コード'].isnull()])

        df_local.drop("地名", axis=1, inplace=True)
        return [df_local.columns.tolist()] + df_local.values.tolist()
