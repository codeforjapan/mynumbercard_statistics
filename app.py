import os
import json
import pprint

import urllib.request
import lxml.html

# url of the mynumber card PDF
PDF_URL = "https://www.soumu.go.jp/kojinbango_card/"
# DATA FILE
DATA_FILE = "./data/loaded_files.json"
# load data file
loaded = []
if (os.path.exists(DATA_FILE)):
  with open(DATA_FILE) as f:
    loaded = json.load(f)

# download PDF files
print('DOWNLOAD Mynumber file')
html = urllib.request.urlopen(PDF_URL).read()
tree = lxml.html.fromstring(html)
result = tree.xpath('//*[@id="contentsWrapper"]/div[2]/div[2]/div[4]/ul/li')

for elem in result:
  link = elem.find('a')
  if (link.get('href') in loaded):
    print("skip " + link.text)
  else:
    print("get" + link.text)
    print (link.get('href'))
    loaded.append(link.get('href'))

# save loaded files data
with open(DATA_FILE, 'w') as f:
    json.dump(loaded, f, indent=2)
