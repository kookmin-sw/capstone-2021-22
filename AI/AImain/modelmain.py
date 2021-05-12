
from keras.preprocessing.image import img_to_array
from keras.models import load_model
import keras
import numpy as np
import argparse
import imutils
import pickle
import cv2
import os
import pandas as pd
from PIL import Image


def test(img_dir):
    # 이미지를 로드합니다
    image = cv2.imread(img_dir)
    output = imutils.resize(image, width=400)

    # # 이미지 전처리를 수행
    image = cv2.resize(image, (96, 96))
    image = image.astype("float") / 255.0
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    # # 학습된 네트워크와 `MultiLabelBinarizer`를 로드
    print("[INFO] loading network...")
    model = load_model('./model/multilabel_model.h5')
    mlb = pickle.loads(open('./model/labelbin.txt', "rb").read())
    # # 이미지에 대한 분류를 수행한 후,
    # # 확률이 가장 높은 두 개의 클래스 라벨을 출력
    print("[INFO] classifying image...")
    proba = model.predict(image)[0]
    idxs = np.argsort(proba)[::-1][:2]
    for (i, j) in enumerate(idxs):
        label = "{}: {:.2f}%".format(mlb.classes_[j], proba[j] * 100)
        # cv2.putText(output, label, (10, (i * 30) + 25),
        #   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        shapecolor.append(mlb.classes_[j])
        print(label)


    cv2.waitKey(0)
    return shapecolor

def mergeimg(img1_dir,img2_dir) :
    image1 = Image.open(img1_dir)
    # image1.show()
    image2 = Image.open(img2_dir)
    # image2.show()
    image1_size = image1.size
    image2_size = image2.size
    new_image = Image.new('RGB', (2 * image1_size[0], image1_size[1]), (250, 250, 250))
    new_image.paste(image1, (0, 0))
    new_image.paste(image2, (image1_size[0], 0))
    new_image.save("input.jpeg", "JPEG")



if __name__ == "__main__":

    mergeimg('./image/2.jpg','./image/22.jpg')
    os.system("python3 main.py -i input.jpeg -o input-out.png -m u2net -prep bbd-fastrcnn -postp rtb-bnb")
    shapecolor = []
    shapecolor = test('./input-out.png')
    # test('./input-out.png')
    print(shapecolor)
    xlsx = pd.read_excel('pillist.xlsx', usecols='A,H,I', engine='openpyxl')
    pilllist = []
    for index in range(20000):
        if xlsx['의약품제형'][index] == shapecolor[0] and xlsx['색상앞'][index] == shapecolor[1] :
            pilllist.append(xlsx['품목일련번호'][index])

    print(len(pilllist))
    print(pilllist)


