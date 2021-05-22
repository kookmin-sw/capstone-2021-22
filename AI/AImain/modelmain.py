import os
import warnings
warnings.filterwarnings(action='ignore')
os.environ['TF_XLA_FLAGS'] = '--tf_xla_enable_xla_devices'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from keras.preprocessing.image import img_to_array
from keras.models import load_model
import keras
import numpy as np
import argparse
import imutils
import pickle
import cv2
import pandas as pd
from PIL import Image
import io
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="whatsthepill-a6a1b7680b12.json"
from google.cloud import vision
from google.cloud.vision_v1 import types
import argparse
import tensorflow as tf
tf.autograph.set_verbosity(3)
import logging
tf.get_logger().setLevel(logging.ERROR)


def findtext(img_dir) :
    client = vision.ImageAnnotatorClient()

    file_name = os.path.join(os.path.abspath("__file__"), img_dir)

    file_name = img_dir
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    respose = client.text_detection(image=image)
    labels = respose.text_annotations

    for label in labels:
        # print(label.description)
        textlist.append(label.description)

    return textlist


def test(img_dir):
    # 이미지를 로드
    image = cv2.imread(img_dir)
    output = imutils.resize(image, width=400)

    # # 이미지 전처리
    image = cv2.resize(image, (96, 96))
    image = image.astype("float") / 255.0
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    # # 학습된 네트워크와 `MultiLabelBinarizer`를 로드
    model = load_model('./model/multilabel_model.h5')
    mlb = pickle.loads(open('./model/labelbin.txt', "rb").read())
    # # 이미지에 대한 분류를 수행한 후,
    # # 확률이 가장 높은 두 개의 클래스 라벨을 출력
    # print("[INFO] classifying image...")
    proba = model.predict(image)[0]
    idxs = np.argsort(proba)[::-1][:4]
    for (i, j) in enumerate(idxs):

        label = "{}: {:.2f}%".format(mlb.classes_[j], proba[j] * 100)
        # cv2.putText(output, label, (10, (i * 30) + 25),
        #   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        shapecolor.append(mlb.classes_[j])
        # print(label)


    cv2.waitKey(0)
    return shapecolor

# def mergeimg(img1_dir,img2_dir) :
def mergeimg():
    parser = argparse.ArgumentParser()
    parser.add_argument('img1_dir', type=str, help="what is the first img")
    parser.add_argument('img2_dir', type=str, help="what is the second img")
    args = parser.parse_args()

    img1_dir= args.img1_dir
    img2_dir =args.img2_dir

    image1 = Image.open(img1_dir)
    image2 = Image.open(img2_dir)

    image1_size = image1.size

    new_image = Image.new('RGB', (2 * image1_size[0], image1_size[1]), (250, 250, 250))
    new_image.paste(image1, (0, 0))
    new_image.paste(image2, (image1_size[0], 0))
    new_image.save("input.jpeg", "JPEG")

def get_jaccard_sim(str1, str2):
    a = set(str1)
    b = set(str2)
    c = a.intersection(b)
    return float(len(c)) / (len(a) + len(b) - len(c))


if __name__ == "__main__":

    mergeimg()
    # mergeimg('./image/199603003_2_1.png','./image/199603003_2_2.png')
    img = Image.open('input.jpeg')
    img_resize = img.resize((int(img.width / 2), int(img.height / 2)))
    img_resize.save('input.jpeg')
    textlist = []
    textlist = findtext('input.jpeg')
    ######################
    # print(textlist)
    xlsx = pd.read_excel('pillist.xlsx', usecols='A,H,I,F,G', engine='openpyxl')
    showpilllist = []
    pilllist = []
    indexlist = []

    if not textlist : #텍스트 찾지 못했을때 모양/색깔만 일치하는 알약 찾
        # print('음각을 찾을 수 없습니다')
        shapecolor = []
        os.system("python3 main.py -i input.jpeg -o input-out.png -m u2net")
        shapecolor = test('input-out.png')
        # shapecolor = test('input.jpeg')

        # test('./input-out.png')
        # print(shapecolor)
        shape = []
        color = []

        for a in range(len(shapecolor)):
            if shapecolor[a][-1] == '형':
                shape.append(shapecolor[a])
            else:
                color.append(shapecolor[a])

        # print(color)
        # print(shape)
        ############################
        for c in range(len(color)):
            for s in range(len(shape)):
                for index in range(23936):
                    if (xlsx['의약품제형'][index] == shape[s] and xlsx['색상앞'][index] == color[c]):
                            pilllist.append(xlsx['품목일련번호'][index])

        # print(len(pilllist))
        # print(pilllist[:5])

    else : #음각 찾았을 떄
        check = 0
        for a in range(len(textlist)):
            textlist[a] = textlist[a].rstrip('\n')
            textlist[a] = textlist[a].replace('\n', ' ')
            textlist[a] = textlist[a].replace('\'', '')
            textlist[a] = textlist[a].replace('.', '')
            # textlist[a] = unicodedata.normalize('NFC' , textlist[a])
            # import difflib
            # print('\n'.join(difflib.ndiff('СС+', 'CC+')))
            # print('\n'.join(difflib.ndiff('CC+', 'CC+')))
            textlist[a] = textlist[a].replace('СС+', 'CC+')
        if ' ' in textlist[0] :
            textlist.append(textlist[0].replace(' ', ''))
            check = 1

        # print(textlist)
        #전체 텍스트 일치하는 것 찾
        for index in range(23935):
            if check == 0 :
                if (textlist[0] == str(xlsx['표시앞'][index])) or (textlist[0] == str(xlsx['표시뒤'][index])) :
                    if xlsx['품목일련번호'][index] != 200806190 and xlsx['품목일련번호'][index] != 200806191 and xlsx['품목일련번호'][index] != 200806192:
                        if xlsx['품목일련번호'][index] not in pilllist :
                            pilllist.append(xlsx['품목일련번호'][index])
                            indexlist.append(index)
                    else :
                        pilllist.append(xlsx['품목일련번호'][index])
                        indexlist.append(index)
            else :
                if (textlist[0] == str(xlsx['표시앞'][index])) or (textlist[0] == str(xlsx['표시뒤'][index])) or (textlist[-1] == str(xlsx['표시앞'][index])) or (textlist[-1] == str(xlsx['표시뒤'][index])) :
                    if xlsx['품목일련번호'][index] != 200806190 and xlsx['품목일련번호'][index] != 200806191 and xlsx['품목일련번호'][index] != 200806192:
                        if xlsx['품목일련번호'][index] not in pilllist :
                            pilllist.append(xlsx['품목일련번호'][index])
                            indexlist.append(index)
                    else :
                        pilllist.append(xlsx['품목일련번호'][index])
                        indexlist.append(index)

        #모든 텍스트에 대해서 전체 텍스트 일치하는 것 찾
        if not pilllist:
            # print('B')
            for index in range(23935):
                for c in range(len(textlist)) :
                    if (textlist[c] == str(xlsx['표시앞'][index])) or (textlist[c] == str(xlsx['표시뒤'][index])) :
                        if xlsx['품목일련번호'][index] != 200806190 and xlsx['품목일련번호'][index] != 200806191 and xlsx['품목일련번호'][index] != 200806192:
                            if xlsx['품목일련번호'][index] not in pilllist:
                                pilllist.append(xlsx['품목일련번호'][index])
                                indexlist.append(index)
                        else:
                            pilllist.append(xlsx['품목일련번호'][index])
                            indexlist.append(index)

        ##전체인덱스 일치하는것 없으면 텍스트 포함하고 있는 모든 알약추출
        if not pilllist :
            # print('C')
            for index in range(23935):
                for c in range(len(textlist)):
                    if (textlist[c] in str(xlsx['표시앞'][index])) or (textlist[c] in str(xlsx['표시뒤'][index])) :
                        if xlsx['품목일련번호'][index] != 200806190 and xlsx['품목일련번호'][index] != 200806191 and xlsx['품목일련번호'][index] != 200806192:
                            if xlsx['품목일련번호'][index] not in pilllist:
                                pilllist.append(xlsx['품목일련번호'][index])
                                indexlist.append(index)
                        else:
                            pilllist.append(xlsx['품목일련번호'][index])
                            indexlist.append(index)

        if not pilllist :
            # print('D')
            for index in range(23935):
                for c in range(len(textlist)):
                    if get_jaccard_sim(textlist[c],str(xlsx['표시앞'][index])) >= 0.5 or get_jaccard_sim(textlist[c],str(xlsx['표시뒤'][index])) >= 0.5 :
                        if xlsx['품목일련번호'][index] != 200806190 and xlsx['품목일련번호'][index] != 200806191 and xlsx['품목일련번호'][index] != 200806192:
                            if xlsx['품목일련번호'][index] not in pilllist:
                                pilllist.append(xlsx['품목일련번호'][index])
                                indexlist.append(index)
                        else:
                            pilllist.append(xlsx['품목일련번호'][index])
                            indexlist.append(index)

        # print(len(pilllist))
        # print(pilllist[:20])

        ############################
        if len(pilllist) == 1 :
            showpilllist = pilllist
        elif len(pilllist) > 0 :
            os.system("python3 main.py -i input.jpeg -o input-out.png -m u2net")
            shapecolor = []
            shapecolor = test('input-out.png')
            # shapecolor = test('input.jpeg')

            # test('./input-out.png')
            # print(shapecolor)
            shape = []
            color = []
            # print(shapecolor[0][-1])
            for a in range(len(shapecolor)) :
                if shapecolor[a][-1] == '형':
                    shape.append(shapecolor[a])
                else :
                    color.append(shapecolor[a])

            # print(color)
            # print(shape)
            ############################
            for c in range(len(color)):
                for s in range(len(shape)):
                    for index in range(len(indexlist)):
                        if (xlsx['의약품제형'][indexlist[index]] == shape[s] and xlsx['색상앞'][indexlist[index]] == color[c]) :
                            if xlsx['품목일련번호'][indexlist[index]] not in showpilllist:
                                showpilllist.append(xlsx['품목일련번호'][indexlist[index]])



    if not showpilllist:
        # 보여질 알약이 없다면
        # if not pilllist :
        #     print('알약을 찾을 수 없습니다.')
        if len(pilllist) > 5 : 
            temp=''
            for i in pilllist[:5]:
                temp=temp+str(i)+','
            print(temp)
        else : 
            temp=''
            for i in pilllist:
                temp=temp+str(i)+','
            print(temp)
    else:
        # 보여질 알약이 있다면
        # print(len(showpilllist))
        temp=''
        for i in showpilllist[:5]:
            temp=temp+str(i)+','
        print(temp)
       






