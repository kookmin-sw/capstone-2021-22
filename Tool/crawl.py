import requests
from bs4 import BeautifulSoup
webpage = requests.get(" https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq=200402489 ")
soup = BeautifulSoup(webpage.content, "html.parser")
print(soup)