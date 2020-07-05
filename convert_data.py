"""Usage: convert_data.py

Convert downloaded csv data to the correctly readable data

Options:
  -h, --help  show this help message and exit
"""
import os
import re
import json
import datetime
import csv
import pprint
from japanera import Japanera, EraDate, Era

from natsort import natsorted

from enum import Enum
class FILETYPE(Enum):
      TYPES = 'summary_by_types'
      DEMOGRAPHIC = 'all_prefectures'
      PREFECTURES = 'demographics'
      LOCALGOVS = 'all_localgovs'
      
def extract_date(title: str):
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

def save_csv(ymd: str, data: list, ftype:FILETYPE):
  """save csv file

  Args:
      ymd (str): the day of data YYYYMMDD
      data (list): data
      ftype (FILETYPE): file types
  """
  with open(OUT_DIR + "/" + date.strftime('{0}/{1}.csv'.format(ymd, ftype.value)), 'w') as f:
    writer = csv.writer(f, quoting=csv.QUOTE_NONNUMERIC)
    writer.writerows(data)
  print('saved {0} lines for {1}.csv'.format(len(data), ftype.value))

RAW_DIR = './data/raw'
OUT_DIR = './data/out'
# DATA FILE
DATA_FILE = "./data/loaded_files.json"

# If data file does not exist, finish process
if (not os.path.exists(DATA_FILE)):
  print('Error: data file {0} does not extst. Run download.py first'.format(DATA_FILE))
  exit(1)

# load data file
with open(DATA_FILE) as f:
  loaded: dict = json.load(f)

# create dir if it does not exist
if (not os.path.exists(OUT_DIR)):
  os.makedirs(OUT_DIR)

# load csv data
for key in loaded.keys():
  types = []
  localgovs = []
  prefectures = []
  demographic = []
  date = extract_date(loaded.get(key))
  if (not date):
    print('The system could not retrieve date string from the title "{0}" '.format(loaded.get(key)))
    continue
  print('Create file for the date {0}'.format(date))
  target_dir = RAW_DIR + '/' + key
  if (not os.path.exists(target_dir)):
    print('The data for the key {0} does not exists. Skip this key'.format(key))
    continue
  # read all csv file of the raw data
  for csvfile in natsorted(os.listdir(target_dir)):
    l = []
    with open(target_dir + '/' + csvfile) as f:
      reader = csv.reader(f)
      for row in reader:
        l.append(list(map(to_number, row)))
    if (l[0][0] == '都道府県名' and l[0][1] == '市区町村名'):
      if (localgovs == []):
        localgovs.extend(l)
      else:
        localgovs.extend(l[2:])
    if (l[0][0] == '区分'):
      types = l
    if (l[0][0] == '都道府県名' and l[0][1] != '市区町村名'):
      prefectures = l
  # save extended data
  if (not os.path.exists(OUT_DIR + "/" + date.strftime('%Y%m%d'))):
    os.makedirs(OUT_DIR + "/" + date.strftime('%Y%m%d'))  
  # list of 基礎自治体
  save_csv(date.strftime('%Y%m%d'), localgovs, FILETYPE.LOCALGOVS)
  # list of 基礎自治体
  save_csv(date.strftime('%Y%m%d'), types, FILETYPE.TYPES)
