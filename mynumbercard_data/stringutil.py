import re
from japanera import Japanera
from datetime import datetime


class StringUtil():
    @staticmethod
    def extract_date_from_header(header: str) -> datetime:
        """'人口（H28.1.1時点）' といったテキストから日付を取得

        Args:
            header (str): '人口（H28.1.1時点）' といったテキスト

        Returns:
            datetime: 取得した日付
        """
        janera = Japanera()
        header = header.replace("\n", '')
        if (len(re.findall(r'[【（(](.*?)[)）】]', header)) == 0):
            print('Error: {0} has no date text.'.format(header))
            return None
        match = re.findall(r'[【（(](.*?)[)）】]', header)[-1]
        datesource = re.search(r'([^0-9元]*)([0-9元]*)\.(.*)\.(.*)時点', match)
        if (not datesource):
            print('Error: {0} has no date text.'.format(header))
            return None
        mydate = sorted(janera.strptime('{0}{1}年{2}月{3}日'.format(
            datesource.groups()[0],
            datesource.groups()[1].replace('元', '1').zfill(2),
            datesource.groups()[2].zfill(2),
            datesource.groups()[3].zfill(2)
        ), "%-a%-o年%m月%d日"), key=lambda x: x.year)
        return mydate[-1]

    @staticmethod
    def extract_date_from_title(title: str) -> datetime:
        """extract date object from title string

        Args:
            title (str): Title string, like マイナンバーカード交付状況（令和2年6月1日現在)

        Returns:
            datetime: Date object
        """
        janera = Japanera()
        match = re.search(r'[（(](.*)[)）]', title)
        if (not match):
            datesource = re.search(
                r'(令和)([0-9元]*)年(.*)月(.*)日', title)
            if (not datesource or len(datesource.groups()) < 4):
                return False
        else:
            datesource = re.search(
                r'([^0-9元]*)([0-9元]*)年(.*)月(.*)日', match.groups()[0])
        print(datesource.groups())
        mydate = janera.strptime('{0}{1}年{2}月{3}日'.format(
            datesource.groups()[0],
            datesource.groups()[1].replace('元', '1').zfill(2),
            datesource.groups()[2].zfill(2),
            datesource.groups()[3].zfill(2)
        ), "%-E%-o年%m月%d日")
        return mydate[0]

    @staticmethod
    def to_number(text: str):
        """return number object if the text is number, otherwise return text

        Args:
            text (str): text
        """
        if (text.replace(',', '').replace('.', '').replace('-', '')
                .replace('%', '').replace('％', '').isnumeric()):
            if ('.' in text):
                return float(text.replace(',', '').replace('%', '')
                             .replace('％', ''))
            else:
                return int(text.replace(',', '').replace('%', '')
                           .replace('％', ''))
        return text

    @staticmethod
    def fix_numberfield_error(lines: list, start_row: int = 0,
                              end_row: int = None,
                              skip_lines: list = []) -> list:
        """Fix data which should have number fields but contains errors

        Args:
            lines (list): target lines
            start_row (int, optional): start row index which should have
                                         number fiels.. Defaults to 0.
            end_row (int, optional): end row index which should have
                                        number fiels.. Defaults to None.
            skip_lines (list, optional): Number list of the index which must
                                        be skipped. Defaults to [].

        Returns:
            list: Fixed lines
        """
        if (end_row is None):
            end_row = len(lines[0])
        ret = []
        for (idx, line) in enumerate(lines):
            if (idx in skip_lines):
                ret.append(line)
            else:
                ret.append(StringUtil.fix_line(line, start_row, end_row))
        return ret

    @staticmethod
    def fix_line(line: list, start_row: int, end_row: int) -> list:
        """ Fix lines if it has a miss-parsed line.

        Args:
            line (list): one line of the data
            start_row (int): Start row index of the data which should have data
            end_row (int): End row index of the data which should have data

        Returns:
            list: fixed line
        """
        data = line[start_row:end_row]
        indexes = [n for n, v in enumerate(data) if v == ""]
        # "" が含まれる列がなければそのまま帰す
        if (len(indexes) == 0):
            return line
        # ' 'が含まれる列を取得
        str_list = {}
        for (idx, row) in enumerate(data):
            if(type(row) is str and len(row.split()) > 1):
                str_list[idx] = row.split()
        ret = []
        # チェックしない列を追加
        if (start_row > 0):
            ret = line[0:start_row]
        # 一列づつチェック
        for (idx, row) in enumerate(data):
            if (row == ''):
                for key, value in str_list.items():
                    # 前後にスペースを含む列があったらそれを追加する
                    if (key - len(value) + 1 <= idx and idx < key):
                        row = StringUtil.to_number(value.pop(0))
                        str_list[key] = value
                        break
                    if (key < idx and idx <= key + len(value)):
                        row = StringUtil.to_number(value.pop(1))
                        str_list[key] = value
                        break
            # スペースが含む列自身
            if (idx in str_list.keys()):
                row = StringUtil.to_number(str_list[idx][0])
            ret.append(row)

        # チェックしない列を追加
        if (end_row < len(line)):
            ret = ret + line[end_row]
        return ret

    @staticmethod
    def complement_error_lines(lists: list, row_index: int,
                               skip_first_line: bool) -> list:
        ret = []
        if (skip_first_line):
            ret.append(lists.pop(0))
        fill_data = ""
        isEmpty = False
        for lst in lists:
            if (lst[row_index] is not None and lst[row_index] != ""):
                fill_data = lst[row_index]
                if (isEmpty):
                    break
            else:
                isEmpty = True
                if (fill_data != ''):
                    break
        if ((not isEmpty) or fill_data == ""):
            return ret + lists
        for lst in lists:
            if (lst[row_index] is None or lst[row_index] == ""):
                lst[row_index] = fill_data
            ret.append(lst)
        return ret
