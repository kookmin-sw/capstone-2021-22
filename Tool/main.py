import pandas as pd
from urllib.request import urlretrieve
xlsx = pd.read_excel('./공공데이터개방_낱알식별목록.xlsx', usecols='A,E')

for index in range(0,len(xlsx)):
    try:
        urlretrieve(xlsx['큰제품이미지'][index], "./image/%s.jpg" %xlsx['품목일련번호'][index])
    except TypeError :
        print(xlsx['품목일련번호'][index])



