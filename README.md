# MyNumberCard Dashboard

マイナンバーカードの交付率のダッシュボードです。
https://www.soumu.go.jp/kojinbango_card/ にあるPDF、「マイナンバーカード交付状況について」からCSVデータを抜き出し、CSVとして保存しています。

## DEPENDENCIES

Ghostscipt
```
brew install ghostscript
```

## INSTALL

```
git clone git@github.com:codeforjapan/mynumbercard_statistics.git
docker-compose up -d
```

## When you want to add new libraries

```
pipenv install `library`
docker-compose up -d --build
```

## Download csv data from PDF file

```
docker-compose run app pytnon download.py
```

The script will skip file which is already downloaded. If you want to redownload all files, run:
```
docker-compose run app pytnon download.py --all
```

## Create csv files from downloaded data

```
docker-compose run app pytnon convert_data.py
```

This command will create below csv files under `data/out/{YYYYMMDD}/` dir.

* `summary_by_types.csv` summary data by govenment types (団体区分別)
* `all_prefectures.csv` the statistics of all prefectures (都道府県一覧)
* `demographics.csv` the demographics data (男女・年齢別)
* `all_localsgovs.csv`: the statistics of all local governments (基礎自治体)
