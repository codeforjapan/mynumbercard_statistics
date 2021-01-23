"""Tests of download.py"""

from unittest import TestCase
from unittest.mock import mock_open, patch

import lxml.html
import pytest
from docopt import Dict

from mynumbercard_data import download

get_file_id_input = [
    ("https://www.soumu.go.jp/main_content/000728832.pdf", "000728832"),
    ("https://www.soumu.go.jp/main_content/000703058.xlsx", "000703058"),
]


@pytest.mark.parametrize("filepath,expected", get_file_id_input)
def test_getFileID(filepath, expected):
    actual = download.getFileID(filepath)

    assert actual == expected


pdf_only_list_item = lxml.html.fromstring(
    '<li><a href="https://www.soumu.go.jp/main_content/000490029.pdf">'
    "マイナンバーカード交付状況（平成29年5月15日時点）"
    '<img alt="PDF" src="/main_content/000000011.gif"></a></li>'
)


class MainTestCase(TestCase):
    @patch("mynumbercard_data.download.json")
    @patch("mynumbercard_data.download.loadPDF")
    @patch("mynumbercard_data.download.lxml.html")
    @patch("mynumbercard_data.download.urllib.request")
    @patch("mynumbercard_data.download.os")
    def test_when_only_pdf_link_without_cache(
        self, os, urllib_request, lxml_html, loadPDF, json
    ):
        args = Dict({"--all": False, "--help": False})
        os.path.exists.return_value = False
        tree = lxml_html.fromstring.return_value
        tree.xpath.return_value = [pdf_only_list_item]
        m = mock_open()

        with patch("builtins.open", m):
            download.main(args)

        os.path.exists.assert_called_once_with("./data/loaded_files.json")
        urllib_request.urlopen.assert_called_once_with(
            "https://www.soumu.go.jp/kojinbango_card/"
        )
        urllib_request.urlopen.return_value.read.assert_called_once_with()
        lxml_html.fromstring.assert_called_once_with(
            urllib_request.urlopen.return_value.read.return_value
        )
        tree.xpath.assert_called_once_with(
            '//*[@id="contentsWrapper"]/div[2]/div[2]/div[4]/ul/li'
        )
        tree.make_links_absolute.assert_called_once_with(
            "https://www.soumu.go.jp/kojinbango_card/"
        )
        loadPDF.assert_called_once_with(
            "https://www.soumu.go.jp/main_content/000490029.pdf"
        )
        m.assert_called_once_with(
            "./data/loaded_files.json", "w", encoding="utf-8"
        )
        json.dump.assert_called_once_with(
            {"000490029": "マイナンバーカード交付状況（平成29年5月15日時点）"},
            m(),
            indent=2,
            ensure_ascii=False,
        )
