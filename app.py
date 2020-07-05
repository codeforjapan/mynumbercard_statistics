"""Usage: app.py [-h] [--all]

Process some integers.

Options:
  -h, --help  show this help message and exit
  --all       get all data
"""
import os
import json
import pprint

import urllib.request
import lxml.html
from docopt import docopt
import camelot

args = docopt(__doc__) 

def getFileID(filepath: str):
  return filepath.rsplit('/',1)[1].replace('.pdf','')

# load PDF file and save table data to csv files
def loadPDF(filepath: str):
  print("load: " + filepath)
  id = getFileID(filepath)
  tables = camelot.read_pdf(filepath, pages = "1-end")
  print("Total tables extracted:", tables.n)
  for idx, table in enumerate(tables):
    fname = './data/{0}_{1}.csv'.format(id, idx)
    print(fname)
    table.to_csv(fname)

# url of the mynumber card PDF
PDF_URL = "https://www.soumu.go.jp/kojinbango_card/"
# DATA FILE
DATA_FILE = "./data/loaded_files.json"
# load data file
loaded = {}
if (not args.get('--all') and os.path.exists(DATA_FILE)):
  with open(DATA_FILE) as f:
    loaded = json.load(f)

# download PDF files
print('DOWNLOAD Mynumber file')
html = urllib.request.urlopen(PDF_URL).read()
tree = lxml.html.fromstring(html)
tree.make_links_absolute('https://www.soumu.go.jp/kojinbango_card/')
result = tree.xpath('//*[@id="contentsWrapper"]/div[2]/div[2]/div[4]/ul/li')

# read PDF links
for elem in result:
  link = elem.find('a')
  id = getFileID(link.get('href'))
  if (loaded.get(id)):
    print("skip " + link.text)
  else:
    print("get " + link.text)
    loadPDF(link.get('href'))
    loaded[id] = link.text

# save loaded files data
with open(DATA_FILE, 'w', encoding='utf-8') as f:
    json.dump(loaded, f, indent=2, ensure_ascii=False)
