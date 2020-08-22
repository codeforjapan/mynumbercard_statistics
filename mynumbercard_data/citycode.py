import pandas as pd


class CityCode:
    def __init__(self):
        self._df_code = pd.read_csv(
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vR__LlI0QK_dZhhYt-2zDtpYjWqQ38o4lCLlBv8VYUrgKaxKajhacM36F-tlXpt8_WvhyfLTCQ6QFVM/pub?gid=0&single=true&output=csv')

    def add_citycode(self, data: list, key_headers: list) -> list:
        df_local = pd.DataFrame(data)
        print(df_local)
        df_code = self._df_code
        df_code["市区町村名"] = df_code["郡名"].fillna("") + df_code["市区町村名"]
        df_code.drop("郡名", axis=1, inplace=True)

        df_local = pd.merge(df_local, df_code, on=[
            '都道府県名', '市区町村名'], how="left")
        df_local["団体コード"] = df_local["団体コード"].astype("Int64")

        print("市区町村別一覧", df_local.isnull().values.sum())
