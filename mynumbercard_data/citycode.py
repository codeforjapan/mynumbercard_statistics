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
        df_local["都道府県名"] = df_local["都道府県名"].str.normalize("NFKC")
        df_local["市区町村名"] = df_local["市区町村名"].str.normalize("NFKC")
        df_local["都道府県名"] = df_local["都道府県名"].apply(lambda s: s.translate(cjk))
        df_local["市区町村名"] = df_local["市区町村名"].apply(lambda s: s.translate(cjk))
        df_local = pd.merge(df_local, self._df_code, on=[
            '都道府県名', '市区町村名'], how="left")
        df_local["団体コード"] = df_local["団体コード"].astype("Int64")
        return [df_local.columns.tolist()] + df_local.values.tolist()
