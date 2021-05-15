import os
import io
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="whatsthepill-a6a1b7680b12.json"
from google.cloud import vision
from google.cloud.vision_v1 import types
import pandas as pd

client = vision.ImageAnnotatorClient()


file_name = os.path.join(os.path.dirname(__file__), 'mergeimg/198800154_11_1.png')

file_name = 'mergeimg/198800154_11_1.png'
with io.open(file_name,'rb') as image_file :
    content = image_file.read()

image = types.Image(content=content)

respose = client.text_detection(image = image)
labels = respose.text_annotations

aa = []
for label in labels :
    print(label.description)
    aa.append(label.description)

print(type(aa[2]))

xlsx = pd.read_excel('pillist.xlsx', usecols='A,H,I,F,G', engine='openpyxl')
print(type(xlsx['표시앞'][0]))
pilllist = []
for index in range(23000):
    for c in range(len(aa)):
        if (aa[c] in str(xlsx['표시앞'][index])) or (aa[c] == str(xlsx['표시뒤'][index])):
            pilllist.append(xlsx['품목일련번호'][index])

print(len(pilllist))
print(pilllist)