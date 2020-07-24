---
path: "/about"
date: 2020-07-22T17:12:33.962Z
title: "このサイトについて"
menu: "このサイトについて"
---

## このサイトは何？

本サイトは、「BADオープンデータ供養寺」プロジェクトの一環として、総務省が発行している[「マイナンバーカード交付状況について」](https://www.soumu.go.jp/kojinbango_card/)から自動的にデータを抜き出し、CSVとして保存しています。

本サイトで提供されているデータについては、自由に使っていただいてかまいませんが、総務省のウェブサイトには、データについてのライセンスが記載されていませんので、自己責任の上お使いください。

### BADオープンデータ供養寺って何？

**BADオープンデータ供養寺**とは、Code for Japan Summit の人気コンテンツの一つで、世の中のBADオープンデータが二度とこの世を彷徨わないように、「供養（データクレンジング）」する方法を考える場です。

データの公開に携わる行政職員の方や、データを利活用するエンジニア・データサイエンティスト等の皆さまと、より使いやすく品質の高いオープンデータの公開と加工の仕組みを考えていくために建立されました。

[Code for Japan Summit 2019でのセッション](https://www.youtube.com/watch?v=hWs0jal7R1Q)が動画で公開されています。

## 何ができるの？

### マイナンバーの普及率を確認する

[トップページ](/)では、CSVデータを [Tableau](https://www.tableau.com/) でビジュアライゼーションしたデータを閲覧することができます。
データは1日1回のペースで深夜に更新されます。

### CSV データを入手する

[データ一覧](/data)から、CSVファイルをダウンロードすることができます。総務省のPDFファイルが公開されている日付のフォルダの下に、以下のファイルが存在しています。

| ファイル名           | 解説                                           |
| -------------------- | ---------------------------------------------- |
| summary_by_types.csv | 団体区分別                                     |
| demographics.csv     | 男女・年齢別（2017年3月8日分には存在しません） |
| all_prefectures.csv  | 都道府県一覧                                   |
| all_localgovs.csv    | 市区町村一覧                                   |

### Google Spreadsheet で見る

[Google Spreadsheet](https://drive.google.com/drive/u/0/folders/1G9HgcddjUzOzEQjXHNazXYOSaFdKxZIc)に、CSVファイルの内容がインポートされています。
各ファイル名のファイルの中に、年月日ごとのタブが存在しています。

## どんな処理をしているの？

マイナンバーカードの交付状況のような情報は、データの性格的にはPDFではなくCSV等の形式で提供すべきものですが、PDFで公開されています。それをデータ化するために様々な処理を行っています。
本来、PDFではなく CSV 形式でデータを提供していれば、数多くの処理は必要ありません。行政関係者は、ぜひ総務省の担当部署に本サイトの存在をお伝えいただければと思います。

## ソースコードについて

PDF→CSVの変換スクリプトや本ウェブページのソースコードについては、[mynumbercard_statistics on GitHub](https://github.com/codeforjapan/mynumbercard_statistics)で公開されています。
ご要望やご質問等、ご提案等ございましたら、[Issues](https://github.com/codeforjapan/mynumbercard_statistics) よりご自由にご登録ください。
MITライセンスで提供されており、ご自身のためにカスタマイズしてご利用いただくことも可能です。

Google Spreadsheet から CSV を取り込む処理についても、[gspreadsheet-importer on GitHub](https://github.com/codeforjapan/gspreadsheet-importer)にて公開されています。
Google Spreadsheet から インターネット上にある CSV ファイルを自動的に取得できるスクリプトですので、ご自由に利用ください。

## 開発者について

[Code for Japan](https://code4japan.org/) が開発、メンテナンスしています。
