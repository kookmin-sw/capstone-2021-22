import requests
from bs4 import BeautifulSoup
webpage = requests.get(" https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq=200402489 ")
soup = BeautifulSoup(webpage.content, "html.parser")
print(type(soup))
for div in soup.find_all("div", {'class':'btn_area btn_mob fr'}): 
    div.decompose()
for div in soup.find_all("a"): 
    div.decompose()
for div in soup.find_all("button"): 
    div.decompose()
temp = soup.find_all(attrs={'class':'info_sec _preview notPkInfo scroll_05'})
print(temp)