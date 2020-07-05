"""Usage: convert_data.py

Convert downloaded csv data to the correctly readable data

Options:
  -h, --help  show this help message and exit
"""
import os
import json

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
  loaded = json.load(f)

# create dir if it does not exist
if (not os.path.exists(OUT_DIR)):
  os.makedirs(OUT_DIR)

for key in loaded.keys():
  target_dir = RAW_DIR + '/' + key
  if (not os.path.exists(target_dir)):
    print('The data for the key {0} does not exists. Skip this key'.format(key))
    continue
  for csv in os.listdir(target_dir):
    print(csv)
    