# -*- coding: utf-8 -*-
"""Usage: download.py [-h] [--all]

Read (all) PDF file and save as CSV file of extracted tables.

Options:
  -h, --help  show this help message and exit
  --all       get all data
"""
import os
import json

import urllib.request
import lxml.html
from docopt import docopt
import camelot

args = docopt(__doc__)


def getFileID(filepath: str):
    return filepath.rsplit('/', 1)[1].replace('.pdf', '').replace('.xlsx', '')

# load PDF file and save table data to csv files


def loadExcel(filepath: str):
    raise Exception("Excel parser is not implemented yet")
    # not implemented yet


def loadPDF(filepath: str):
    print("load: " + filepath)
    id = getFileID(filepath)
    tables = camelot.read_pdf(filepath, pages="all",
                              split_text=True, strip_text="\n", line_scale=40)
    print("Total tables extracted:", tables.n)
    if (not os.path.exists('./data/raw')):
        os.makedirs('./data/raw')
    for idx, table in enumerate(tables):
        fname = './data/raw/{0}/{1}.csv'.format(id, idx)
        print(fname)
        if (not os.path.exists('./data/raw/{0}'.format(id))):
            os.makedirs('./data/raw/{0}'.format(id))

        table.to_csv(fname)


def downloadFiles(elem, loaded: dict):
    # read PDF links
    links = elem.findall('a')
    if (len(links) == 1):
        link = links[0]
        id = getFileID(link.get('href'))
        if (loaded.get(id)):
            print("skip " + link.text)
        else:
            print("get " + link.text)
            loadPDF(link.get('href'))
            loaded[id] = link.text
    else:
        # in case that Excel file is provided
        fname = links[0].get('href')
        id = getFileID(fname)
        if (loaded.get(id)):
            print("skip " + elem.text)
        else:
            if (fname.endswith('.xlsx')):
                print("get Excel " + fname)
                loadExcel(fname)
                loaded[id] = elem.text
            elif (fname.endswith('.pdf')):
                print("get PDF " + fname)
                loadPDF(fname)
                loaded[id] = elem.text
            else:
                print("file format is unknown")


def downloadSingleFile(month: str, elem, loaded: dict):
    # if a tag is provided, load it
    id = getFileID(elem.get('href'))
    if (loaded.get(id)):
        print("skip " + month)
    else:
        print("get " + month)
        loadPDF(elem.get('href'))
        loaded[id] = month
    return


if __name__ == "__main__":
    # url of the mynumber card PDF
    PDF_URL = "https://www.soumu.go.jp/kojinbango_card/kofujokyo.html"
    ABSOLUTE_URL = "https://www.soumu.go.jp/kojinbango_card/"
    # DATA FILE
    DATA_FILE = "./data/loaded_files.json"
    # load data file
    loaded = {}
    if (not args.get('--all') and os.path.exists(DATA_FILE)):
        with open(DATA_FILE) as f:
            loaded = json.load(f)

    # download PDF files
    print('DOWNLOAD statistics file!')
    html = urllib.request.urlopen(PDF_URL).read()
    tree = lxml.html.fromstring(html)
    tree.make_links_absolute(ABSOLUTE_URL)
    years = tree.xpath(
        '//*[@id="contentsWrapper"]/div[2]/div/div[3]/ul/li')

    print(years)
    for page in years:
        for link in page.findall('a'):
            print('scan ' + link.get('href'))
            html = urllib.request.urlopen(link.get('href')).read()
            tree2 = lxml.html.fromstring(html)
            tree2.make_links_absolute(ABSOLUTE_URL)
            resources = tree2.xpath(
                '//*[@id="contentsWrapper"]/div[@class="contentsBody"]//ul/li')
            for data in resources:
                downloadFiles(data, loaded)
    print('current year')
    links = tree.xpath(
        '//dt/text()[contains(.,"全体資料")]/following-sibling::a[1]')
    texts = tree.xpath(
        '//dt/text()[contains(.,"全体資料")]/preceding-sibling::text()[1]')
    for idx, link in enumerate(links):
        downloadSingleFile(texts[idx].strip(), link, loaded)

# save loaded files data
with open(DATA_FILE, 'w', encoding='utf-8') as f:
    json.dump(loaded, f, indent=2, ensure_ascii=False)
