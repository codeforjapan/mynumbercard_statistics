"""Tests of download.py"""

import pytest

from mynumbercard_data import download

get_file_id_input = [
    ("https://www.soumu.go.jp/main_content/000728832.pdf", "000728832"),
    ("https://www.soumu.go.jp/main_content/000703058.xlsx", "000703058"),
]


@pytest.mark.parametrize("filepath,expected", get_file_id_input)
def test_getFileID(filepath, expected):
    actual = download.getFileID(filepath)

    assert actual == expected
