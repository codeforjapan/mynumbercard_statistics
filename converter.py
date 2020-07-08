from enum import Enum
import os
import csv

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
    print('* saved {0} lines for {1}.csv'.format(len(self._alllist), self._ftype.value))

  @staticmethod
  def detectType(l: list) -> FILETYPE:
    if (l[0][0] == '都道府県名' and l[0][1] == '市区町村名'):
      return FILETYPE.LOCALGOVS
    if (l[0][0] == '区分'):
      return FILETYPE.TYPES
    if (l[0][0] == '都道府県名' and l[0][1] != '市区町村名'):
      return FILETYPE.PREFECTURES
    if (l[0][0] == '年齢'):
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
      return Converter(list)

  def convert(self, list: list = None) -> list:
    return self._convert(list) if list else self._convert(self._list)

  def _convert(self, list) -> list:
    return list

  def appendData(self, list: list):
    self._alllist.extend(self.convert(list))

class Processor:
  """Processor class is used for process the csv files
  """
  def __init__(self):
    self._converters = []

  def findConverterInstance(self, list: list):
    """find Converter instance in the local list

    Args:
        list (list): source data

    Returns:
        [type]: [description]
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
      print('getConverter')
      converter = Converter.getConverterInstance(list)
      self._converters.append(converter)
    converter.appendData(list)

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
  def _convert(self, list: list) -> list:
    print('TypesConverter')
    return self._list
class DemographicConverter(Converter):
  def _convert(self, list: list) -> list:
    print('DemographicConverter')
    """
    CSVのヘッダが
    ["年齢","人口（H28.1.1時点）","","","交付件数（H29.5.15時点）","","","交付率","","","全体に対する交付件数割合","",""]
    ["","男","女","計","男","女","計","男","女","計","男","女","計"]
    という2段組になってしまっているので、ヘッダを一行にして、（＊時点）の部分を抜き出して最終列に加える処理を行う
    """
    return self._list
class PrefecturesConverter(Converter):
  def appendData(self, list: list):
    if (len(self._alllist) == 0):
      self._alllist.extend(self.convert(list))
    else:
      self._alllist = self.convert(list) + self._alllist[1:]
class LocalgovsConverter(Converter):
  def appendData(self, list: list):
    if (len(self._alllist) == 0):
      self._alllist.extend(self.convert(list))
    else:
      self._alllist.extend(self.convert(list)[2:])
