import requests
from bs4 import BeautifulSoup
webpage = requests.get(" https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq=201306176 ")
soup = BeautifulSoup(webpage.content, "html.parser")
new_tag = soup.new_tag("h3")
for div in soup.find_all("div", {'class':'info_sec notPkInfo scroll_02'}): 
    div.decompose()
for div in soup.find_all("div", {'class':'info_sec notPkInfo scroll_08'}): 
    div.decompose()
for div in soup.find_all("div", {'class':'info_sec notPkInfo scroll_09'}): 
    div.decompose()
for div in soup.find_all("div", {'class':'info_sec notPkInfo scroll_10'}): 
    div.decompose()
for div in soup.find_all("div", {'class':'info_sec notPkInfo scroll_06'}): 
    div.decompose()
for div in soup.find_all("div", {'class':'info_sec _preview notPkInfo scroll_99'}): 
    div.decompose()
for div in soup.find_all("div", {'class':'btn_area btn_mob fr'}): 
    div.decompose()
for div in soup.find_all("a"): 
    div.decompose()
for div in soup.find_all("button"): 
    div.decompose()
for div in soup.find_all("span"): 
    div.decompose()
for p in soup.find_all("p", {'class':'title'}): 
    p.name = "h4"
   


temp = soup.find_all(attrs={'class':'drug_info_mid'})


print(str(temp))