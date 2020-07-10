import re
from japanera import Japanera, EraDate, Era
from datetime import datetime

class StringUtil():
  @staticmethod
  def extract_date_from_header(header: str) -> datetime:
    """'人口（H28.1.1時点）' といったテキストから日付を取得

    Args:
        header (str): '人口（H28.1.1時点）' といったテキスト

    Returns:
        datetime: 取得した日付
    """
    # 
    janera = Japanera()
    match =  re.search(r'[（(](.*)[)）]', header)
    if (not match):
      return False
    datesource = re.search(r'([^0-9元]*)([0-9元]*)\.(.*)\.(.*)時点', match.groups()[0])
    mydate = sorted(janera.strptime('{0}{1}年{2}月{3}日'.format(
      datesource.groups()[0],
      datesource.groups()[1].replace('元','1').zfill(2),
      datesource.groups()[2].zfill(2),
      datesource.groups()[3].zfill(2)
    ), "%-a%-o年%m月%d日"), key=lambda x: x.year)
    return mydate[-1]
  
  @staticmethod
  def extract_date_from_title(title: str) -> datetime:
    """extract date object from title string

    Args:
        title (str): Title string, like マイナンバーカード交付状況（令和2年6月1日現在)

    Returns:
        datetime: Date object
    """
    janera = Japanera()
    match =  re.search(r'[（(](.*)[)）]', title)
    if (not match):
      return False
    datesource = re.search(r'([^0-9元]*)([0-9元]*)年(.*)月(.*)日', match.groups()[0])
    mydate = janera.strptime('{0}{1}年{2}月{3}日'.format(
      datesource.groups()[0],
      datesource.groups()[1].replace('元','1').zfill(2),
      datesource.groups()[2].zfill(2),
      datesource.groups()[3].zfill(2)
    ), "%-E%-o年%m月%d日")
    return mydate[0]

  @staticmethod
  def to_number(text: str):
    """return number object if the text is number, otherwise return text

    Args:
        text (str): text
    """
    if (text.replace(',', '').replace('.', '').replace('-', '').replace('%', '').isnumeric()):
      if ('.' in text):
        return float(text.replace(',', '').replace('%',''))
      else:
        return int(text.replace(',', '').replace('%',''))
    return text
