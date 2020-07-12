# MyNumberCard Dashboard

## Japanese

マイナンバーカードの交付率のダッシュボードです。
`https://www.soumu.go.jp/kojinbango_card/` にある PDF、「マイナンバーカード交付状況について」から CSV データを抜き出し、CSV として保存しています。

## English

This is a dashboard of the the my number card statistics.

Extract and convert csv data from the PDF file under マイナンバーカード交付状況について on the `https://www.soumu.go.jp/kojinbango_card/`

## REQUIREMENT

### Use Docker

Please install Docker and Docker Compose

## INSTALL

```bash
git clone git@github.com:codeforjapan/mynumbercard_statistics.git
```

## USAGE

### Download csv data from PDF file

```bash
make download
```

The script will skip file which is already downloaded. If you want to redownload all files, run:
[notice] This command will take a long time when you run this command first time

```bash
make download_all
```

### Create csv files from downloaded data

```bash
make convert
```

This command will create below csv files under `data/out/{YYYYMMDD}/` dir.

- `summary_by_types.csv` summary data by govenment types (団体区分別)
- `all_prefectures.csv` the statistics of all prefectures (都道府県一覧)
- `demographics.csv` the demographics data (男女・年齢別)
- `all_localsgovs.csv`: the statistics of all local governments (基礎自治体)

### Download and convert data

```bash
make download_and_convet
```

### reconvert CSV files in the github cache

```bash
echo GITHUB_TOKEN={YOUR_TOKEN_HERE} > .env # you need github access token for trigger action event
make trigger-reconvert
```

## GitHub Actions

GitHub Actions will create new data and publish the data to the `gh-pages` branch.

## DEVELOPMENT

### Use Python

Please install Python 3 and below dependencies

```bash
brew install ghostscript
pip install pipenv
```

Then sync the libraries.

```bash
pipenv sync
```

### When you want to add new libraries

```bash
pipenv install [new_library]
docker-compose up -d --build
```

## Web Site

The web site <http://mynumbercard.code4japan.org> is built by [gatsby.js](https://www.gatsbyjs.org/).
The project source is located under the `site` directory.

### Web site development

#### REQUIREMENT FOR WEBSITE DEVELOPMENT

- node version 12.18.2 (version 13 or later failed installing sharp in OSX 10.15.5.)

### SETUP

#### install node 12..18.2

```bash
brew install nodenv # if you don't have any node version controller
nodenv install 12.18.2
```

### install dependencies

```bash
cd site
yarn install
```

### Run local dev site

```bash
gatsby develop
```

### build static files

```bash
yarn build
```
