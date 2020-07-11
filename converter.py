from enum import Enum
import os
import csv
from stringutil import StringUtil
from datetime import date


class FILETYPE(Enum):
    TYPES = 'summary_by_types'
    DEMOGRAPHIC = 'demographics'
    PREFECTURES = 'all_prefectures'
    LOCALGOVS = 'all_localgovs'


class Converter:
    def __init__(self, list: list):
        self._list = list
        self._alllist = []
        self._ftype = Converter.detectType(list)

    def add_list_column(self, data: list, adddata: list) -> list:
        """return new list that is added new list of adddata

        Args:
            data (list): list data which will have new row
            adddata (list)): list data which will be added to the data

        Returns:
            list: new list which have new row
        """
        ret = []
        for idx, row in enumerate(data):
            ret = ret + [row + adddata[idx]]
        return ret

    def add_column(self, header: str, contents):
        """add new column to the self list

        Args:
            header (str): a header string
            contents (str, number or list): a contents that should be added.
            if this is not the list, the data will be added into all rows
        """
        if (type(contents) == list):
            self._list = self.add_list_column(self._list, [header] + contents)
        else:
            self._list[0].append(header)
            map(lambda x: x.append(contents), self._list[1:])

    def reset(self):
        """reset alllist instances
        """
        self._alllist = []

    def save_csv(self, path):
        """save csv file

        Args:
            path (str): path
        """
        if (len(self._alllist) == 0):
            return
        with open('{0}/{1}.csv'.format(path, self._ftype.value), 'w') as f:
            writer = csv.writer(f, quoting=csv.QUOTE_NONNUMERIC)
            writer.writerows(self._alllist)
        print(
            '* saved {0} lines for {1}.csv'.format(len(self._alllist),
                                                   self._ftype.value))

    @staticmethod
    def detectType(lst: list) -> FILETYPE:
        if (lst[0][0] == '都道府県名' and lst[0][1] == '市区町村名'):
            return FILETYPE.LOCALGOVS
        if (lst[0][0] == '区分'):
            return FILETYPE.TYPES
        if (lst[0][0] == '都道府県名' and lst[0][1] != '市区町村名'):
            return FILETYPE.PREFECTURES
        if (lst[0][0] == '年齢'):
            return FILETYPE.DEMOGRAPHIC

    @staticmethod
    def getConverterInstance(list: list):
        """get Converter instance from the list data

        Args:
            list (list): list data

        Returns:
            Converter: an instance of the Converter
        """
        if (Converter.detectType(list) == FILETYPE.TYPES):
            return TypesConverter(list)
        elif (Converter.detectType(list) == FILETYPE.DEMOGRAPHIC):
            return DemographicConverter(list)
        elif (Converter.detectType(list) == FILETYPE.PREFECTURES):
            return PrefecturesConverter(list)
        elif (Converter.detectType(list) == FILETYPE.LOCALGOVS):
            return LocalgovsConverter(list)
        else:
            return None

    def convert(self, _list: list, created_at: date) -> list:
        """convert data

        Args:
            list (list, optional): listdata. Defaults to None.

        Returns:
            list: converted data
        """
        new_list = self._convert(_list) if _list else self._convert(self._list)
        header = ['公開日'] + new_list[0]
        ret = [header] + list(map(lambda x:
                                  [created_at.strftime('%Y/%m/%d')] + x,
                                  new_list[1:]))
        return ret

    def _convert(self, list) -> list:
        """convet list data, mainly used for subclass (overrided from subclasses)

        Args:
            list ([type]): list of the data

        Returns:
            list: converted list
        """
        self._list = list
        return list

    def appendData(self, list: list, created_at: date):
        """append new data to all array

        Args:
            list (list): [description]
        """
        self._alllist.extend(self.convert(list, created_at))


class Processor:
    """Processor class is used for process the csv files
    """

    def __init__(self, process_date: date):
        self._converters = []
        self._date = process_date

    def findConverterInstance(self, list: list):
        """find Converter instance in the local list

        Args:
            list (list): source data

        Returns:
            Processor: Processor class instance
        """
        converter = Converter.getConverterInstance(list)

        for c in self._converters:
            if (isinstance(c, type(converter))):
                return c
        return None

    def appendData(self, list: list):
        """append list data to the same instance of the converter

        Args:
            list (list): data
        """
        converter = self.findConverterInstance(list)
        if (not converter):
            converter = Converter.getConverterInstance(list)
            if (converter is not None):
                self._converters.append(converter)

        if (converter is not None):
            converter.appendData(list, self._date)

    def saveFiles(self, path: str):
        """save local instance as csv file

        Args:
            path (str): path
        """
        if (not os.path.exists(path)):
            os.makedirs(path)
        # save files
        for c in self._converters:
            c.save_csv(path)

# converter child class


class TypesConverter(Converter):
    def _convert(self, _list: list) -> list:
        """
        "区分","","人口
        （H29.1.1時点）","交付枚数
        （H29.8.31時点）","人口に対する交付枚数率"
        というヘッダになっているので基準日を抜き出して列として追加する
        """
        population_ymd = None
        card_ymd = None
        population_date = StringUtil.extract_date_from_header(_list[0][2])
        if (population_date is not None):
            population_ymd = population_date.strftime('%Y/%m/%d')
        card_date = StringUtil.extract_date_from_header(_list[0][3])
        if (card_date is not None):
            card_ymd = card_date.strftime('%Y/%m/%d')
        header = ["区分", "", "人口", "交付枚数", "人口に対する交付枚数率", "人口算出基準日", "交付件数基準日"]
        data = list(map(lambda x: x + [population_ymd, card_ymd], _list[1:]))
        self._list = [header] + data
        return self._list


class DemographicConverter(Converter):
    def _convert(self, _list: list) -> list:
        """
    なぜか データの1行目の人口(女)と人口(計)がくっついて閉まっているので分割する
    '65,269,421 127,443,563  11,249,560' というふうになっている
    """
        fixdata = _list[2][3]

        if (type(fixdata) is str):
            _list[2][2] = int(fixdata.split(' ')[0].replace(',', ''))
            _list[2][3] = int(fixdata.split(' ')[1].replace(',', ''))
        """
    CSVのヘッダが
    ["年齢","人口（H28.1.1時点）","","","交付件数（H29.5.15時点）","","","交付率","","","全体に対する交付件数割合","",""]
    ["","男","女","計","男","女","計","男","女","計","男","女","計"]
    という2段組になってしまっているので、ヘッダを一行にして、（＊時点）の部分を抜き出して最終列に加える処理を行う
    """
        population_ymd = StringUtil.extract_date_from_header(
            self._list[0][1]).strftime('%Y/%m/%d')
        card_ymd = StringUtil.extract_date_from_header(
            self._list[0][4]).strftime('%Y/%m/%d')
        header = ["年齢", "人口(男)", "人口(女)", "人口(計", "交付件数(男)",
                  "交付件数(女)", "交付件数(計)",
                  "交付率(男)", "交付率(女)", "交付率(計)",
                  "全体に対する交付件数割合(男)", "全体に対する交付件数割合(女)", "全体に対する交付件数割合(計)",
                  "人口算出基準日", "交付件数基準日"]
        self._list = [
            header] + list(map(lambda x: x +
                               [population_ymd, card_ymd], _list[2:]))
        return self._list


class PrefecturesConverter(Converter):
    def _convert(self, _list):
        """"
        ヘッダが
        "都道府県名","総数（人口）
        【H28.1.1時点】","交付枚数
        【H29.5.15時点】","人口に対する
        交付枚数率"
        となっているので、日付を抜き出して列に追加する
        """
        population_ymd = None
        card_ymd = None
        population_date = StringUtil.extract_date_from_header(_list[0][1])
        if (population_date is not None):
            population_ymd = population_date.strftime('%Y/%m/%d')
        card_date = StringUtil.extract_date_from_header(_list[0][2])
        if (card_date is not None):
            card_ymd = card_date.strftime('%Y/%m/%d')
        header = ["都道府県名", "総数（人口）", "交付枚数", "交付率", "人口算出基準日", "交付件数基準日"]
        data = list(map(lambda x: x + [population_ymd, card_ymd], _list[1:]))
        self._list = [header] + data
        return self._list

    def appendData(self, list: list, created_at: date):
        if (len(self._alllist) == 0):
            self._alllist.extend(self.convert(list, created_at))
        else:
            self._alllist = self.convert(list, created_at) + self._alllist[1:]


class LocalgovsConverter(Converter):
    def _convert(self, _list):
        """"
        ヘッダが
        都道府県名","市区町村名","総数（人口）
        【H28.1.1時点】","交付枚数
        【H29.5.15時点】","交付率"
        となっているので、日付を抜き出して列に追加する
        """
        population_ymd = None
        card_ymd = None
        population_date = StringUtil.extract_date_from_header(_list[0][2])
        if (population_date is not None):
            population_ymd = population_date.strftime('%Y/%m/%d')
        card_date = StringUtil.extract_date_from_header(_list[0][3])
        if (card_date is not None):
            card_ymd = card_date.strftime('%Y/%m/%d')
        header = ["都道府県名", "市区町村名", "総数（人口）",
                  "交付枚数", "交付率", "人口算出基準日", "交付件数基準日"]
        if (_list[1][0] == '全国'):  # remove 全国
            data = list(
                map(lambda x: x + [population_ymd, card_ymd], _list[2:]))
        else:
            data = list(
                map(lambda x: x + [population_ymd, card_ymd], _list[1:]))
        self._list = [header] + data
        return self._list

    def appendData(self, _list: list, created_at: date):
        if (len(self._alllist) == 0):
            self._alllist.extend(self.convert(
                _list, created_at))
        else:
            self._alllist.extend(self.convert(_list, created_at)[1:])
