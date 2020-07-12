# MyNumberCard Dashboard

## Japanese

マイナンバーカードの交付率のダッシュボードです。
`https://www.soumu.go.jp/kojinbango_card/` にある PDF、「マイナンバーカード交付状況について」から CSV データを抜き出し、CSV として保存しています。

## English

This is a dashboard of the the my number card statistics.

Extract and convert csv data from the PDF file under マイナンバーカード交付状況について on the `https://www.soumu.go.jp/kojinbango_card/`

## DEPENDENCIES

### Use Docker

Please install Docker and Docker Compose

# INSTALL

```
git clone git@github.com:codeforjapan/mynumbercard_statistics.git
```

# usage

## Download csv data from PDF file

```
make download
```

The script will skip file which is already downloaded. If you want to redownload all files, run:

```
make download_all
```

## Create csv files from downloaded data

```
make convert
```

This command will create below csv files under `data/out/{YYYYMMDD}/` dir.

- `summary_by_types.csv` summary data by govenment types (団体区分別)
- `all_prefectures.csv` the statistics of all prefectures (都道府県一覧)
- `demographics.csv` the demographics data (男女・年齢別)
- `all_localsgovs.csv`: the statistics of all local governments (基礎自治体)

## Download and convert data

```
make download_and_convet
```

## reconvert CSV files in the github cache

```
echo GITHUB_TOKEN={YOUR_TOKEN_HERE} > .env # you need github access token for trigger action event
make trigger-reconvert
```

# GitHub Actions

GitHub Actions will create new data and publish the data to the `gh-pages` branch.

# DEVELOPMENT

## Use Python

Please install Python 3 and below dependencies

```
brew install ghostscript
pip install pipenv
```

Then sync the libraries.

```
pipenv sync
```

## When you want to add new libraries

```
pipenv install [new_library]
docker-compose up -d --build
```

# Web Site

The web site http://mynumbercard.code4japan.org is built by [gatsby.js](https://www.gatsbyjs.org/).
The project source is located under the `site` directory.

## Web site development

### DEPENDENCIES

- node version 12.18.2 (version 13 or later failed installing sharp in OSX 10.15.5.)

## SETUP

```
cd site
nodebrew use v12.18.2
yarn install
```

## Run local dev site

```
gatsby develop
```

## build static files

```
yarn build
```
