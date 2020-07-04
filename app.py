import urllib.request
import lxml.html

print('DOWNLOAD Mynumber file')
url = "https://www.soumu.go.jp/kojinbango_card/"
html = urllib.request.urlopen(url).read()
tree = lxml.html.fromstring(html)
result = tree.xpath('//*[@id="contentsWrapper"]/div[2]/div[2]/div[4]/ul/li')

for elem in result:
    print (elem.find('a').text)
