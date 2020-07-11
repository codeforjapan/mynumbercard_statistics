"""Usage: convert_data.py

Convert downloaded csv data to the correctly readable data

Options:
  -h, --help  show this help message and exit
"""
import os
import json
import csv
from stringutil import StringUtil

from natsort import natsorted

from converter import Processor, FILETYPE


def delete_total_csvs(outdir: str):
    """delete csv files in the outdir

    Args:
        outdir (str): the dir that have target csv files
    """
    for filetype in FILETYPE:
        filename = "{0}/{1}.csv".format(outdir, filetype.value)
        if (os.path.exists(filename)):
            os.remove(filename)


RAW_DIR = './data/raw'
OUT_DIR = './data/out'
# DATA FILE
DATA_FILE = "./data/loaded_files.json"

# If data file does not exist, finish process
if (not os.path.exists(DATA_FILE)):
    print(
        'Error: data file {0} does not extst. Run download.py first'
        .format(DATA_FILE))
    exit(1)

# load data file
with open(DATA_FILE) as f:
    loaded: dict = json.load(f)

# create dir if it does not exist
if (not os.path.exists(OUT_DIR)):
    os.makedirs(OUT_DIR)

# delete total files
delete_total_csvs(OUT_DIR + "/total")

# load csv data
for key in loaded.keys():
    date = StringUtil.extract_date_from_title(loaded.get(key))
    ymd = date.strftime('%Y%m%d')
    if (not date):
        print('The system could not retrieve date string from the title "{0}" '
              .format(
                  loaded.get(key)))
        continue
    processor = Processor(date)  # create processor instance
    print('Create file for the date {0}'.format(date))
    target_dir = RAW_DIR + '/' + key
    if (not os.path.exists(target_dir)):
        print(
            'The data for the key {0} does not exists. Skip this key'
            .format(key))
        continue

    # read all csv file of the raw data
    for csvfile in natsorted(os.listdir(target_dir)):
        l: list = []
        with open(target_dir + '/' + csvfile) as f:
            reader = csv.reader(f)
            for row in reader:
                l.append(list(map(StringUtil.to_number, row)))
        processor.appendData(l)
    # save extended data
    processor.saveFiles(OUT_DIR + "/" + ymd)
