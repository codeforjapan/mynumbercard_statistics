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

### Download and convert data

This command will run below command, `download` and `convert` one time.
[notice] This command will take a long time when you run this command first time.

```bash
make download_and_convert
```

### Download csv data from PDF file

[notice] This command will take a long time when you run this command first time.

```bash
make download
```

The `download` script will skip files which is already downloaded. If you want to redownload all files, run `download_all`.

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

## GitHub Actions

GitHub Actions in this repository will create new data and publish the data to the `gh-pages` branch.

## DEVELOPMENT

[Script Development](DEV_SCRIPT.md)

[Website Developtment](DEV_SITE.md)
