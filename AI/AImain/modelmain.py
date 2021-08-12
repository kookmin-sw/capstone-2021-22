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

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "whatsthepill-a6a1b7680b12.json"
from google.cloud import vision
from google.cloud.vision_v1 import types
import argparse
import tensorflow as tf

tf.autograph.set_verbosity(3)
import logging

tf.get_logger().setLevel(logging.ERROR)


def findtext(img_dir):
    # vision api 를 통해 음각 출력
    client = vision.ImageAnnotatorClient()

    file_name = os.path.join(os.path.abspath("__file__"), img_dir)

    file_name = img_dir
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    respose = client.text_detection(image=image)
    labels = respose.text_annotations
    # 출력된 음각 textlist 리스트에 추가
    for label in labels:
        # print(label.description)
        textlist.append(label.description)

    return textlist


def test(img_dir):
    image = cv2.imread(img_dir)
    output = imutils.resize(image, width=400)

    # 이미지 전처리
    image = cv2.resize(image, (96, 96))
    image = image.astype("float") / 255.0
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)

    # 학습된 네트워크와 `MultiLabelBinarizer`를 로드
    model = load_model('./model/multilabel_model.h5')
    mlb = pickle.loads(open('./model/labelbin.txt', "rb").read())

    # 이미지에 대한 분류를 수행한 후,
    # 확률이 가장 높은 두 개의 클래스 라벨을 출력
    proba = model.predict(image)[0]
    idxs = np.argsort(proba)[::-1][:4]
    for (i, j) in enumerate(idxs):
        # label = "{}: {:.2f}%".format(mlb.classes_[j], proba[j] * 100)
        shapecolor.append(mlb.classes_[j])
        # print(label)

    cv2.waitKey(0)
    return shapecolor



def mergeimg():
    # 쉘에서 입력받은 이미지 머지
    parser = argparse.ArgumentParser()
    parser.add_argument('img1_dir', type=str, help="what is the first img")
    parser.add_argument('img2_dir', type=str, help="what is the second img")
    args = parser.parse_args()

    img1_dir = args.img1_dir
    img2_dir = args.img2_dir

    image1 = Image.open(img1_dir)
    image2 = Image.open(img2_dir)

    image1_size = image1.size

    new_image = Image.new('RGB', (2 * image1_size[0], image1_size[1]), (250, 250, 250))
    new_image.paste(image1, (0, 0))
    new_image.paste(image2, (image1_size[0], 0))
    new_image.save("input.jpeg", "JPEG")


def get_jaccard_sim(str1, str2):
    # 음각 유사도 jaccard 유사도 진행
    a = set(str1)
    b = set(str2)
    c = a.intersection(b)
    return float(len(c)) / (len(a) + len(b) - len(c))


if __name__ == "__main__":
    # 이미지 머지후, 크기 resize
    mergeimg()
    img = Image.open('input.jpeg')
    img_resize = img.resize((int(img.width / 2), int(img.height / 2)))
    img_resize.save('input.jpeg')
    textlist = []
    # 음각 출력
    textlist = findtext('input.jpeg')
    ######################
    # 낱알식별목록 불러옴
    xlsx = pd.read_excel('pillist.xlsx', usecols='A,H,I,F,G', engine='openpyxl')
    showpilllist = []
    pilllist = []
    indexlist = []
    # 서버에서 한글을 못읽어오는 것을 방지하기 위해 한글 ascii로 진행
    euyakpoomjaehyung = chr(51032) + chr(50557) + chr(54408) + chr(51228) + chr(54805)
    saeksangap = chr(49353) + chr(49345) + chr(50526)
    poommoknumber = chr(54408) + chr(47785) + chr(51068) + chr(47144) + chr(48264) + chr(54840)
    pyosiap = chr(54364) + chr(49884) + chr(50526)
    pyosidui = chr(54364) + chr(49884) + chr(46244)

    if not textlist:
        # 음각을 읽지 못하면 빈 리스트 리턴
        pilllist = []

    else:
        # 음각 찾았을 때
        check = 0
        for a in range(len(textlist)):
            # 음각 불필요한 값 replace
            textlist[a] = textlist[a].rstrip('\n')
            textlist[a] = textlist[a].replace('\n', ' ')
            textlist[a] = textlist[a].replace('\'', '')
            textlist[a] = textlist[a].replace('.', '')
            # textlist[a] = unicodedata.normalize('NFC' , textlist[a])
            # import difflib
            # print('\n'.join(difflib.ndiff('СС+', 'CC+')))
            # print('\n'.join(difflib.ndiff('CC+', 'CC+')))
            textlist[a] = textlist[a].replace('СС+', 'CC+')

        if ' ' in textlist[0]:
            # 음각 중간에 공백 추가된 경우, 제거한 값도 비교
            textlist.append(textlist[0].replace(' ', ''))
            check = 1

        # print(textlist)

        for index in range(23935):
            # 음각 인덱스 0 값( 출력된 음각을 모두 포함하고 있는 위치 인덱스 )과 완전 일치하는 알약 pilllist 에 append
            if check == 0:
                if (textlist[0] == str(xlsx[pyosiap][index])) or (textlist[0] == str(xlsx[pyosidui][index])):
                    if xlsx[poommoknumber][index] != 200806190 and xlsx[poommoknumber][index] != 200806191 and \
                            xlsx[poommoknumber][index] != 200806192:
                        if xlsx[poommoknumber][index] not in pilllist:
                            pilllist.append(xlsx[poommoknumber][index])
                            indexlist.append(index)
                    else:
                        pilllist.append(xlsx[poommoknumber][index])
                        indexlist.append(index)
            else:
                if (textlist[0] == str(xlsx[pyosiap][index])) or (textlist[0] == str(xlsx[pyosidui][index])) or (
                        textlist[-1] == str(xlsx[pyosiap][index])) or (textlist[-1] == str(xlsx[pyosidui][index])):
                    if xlsx[poommoknumber][index] != 200806190 and xlsx[poommoknumber][index] != 200806191 and \
                            xlsx[poommoknumber][index] != 200806192:
                        if xlsx[poommoknumber][index] not in pilllist:
                            pilllist.append(xlsx[poommoknumber][index])
                            indexlist.append(index)
                    else:
                        pilllist.append(xlsx[poommoknumber][index])
                        indexlist.append(index)

        if not pilllist:
            # print('B')
            # 음각 완전 일치하는 알약이 없으면, textlist 에 담겨있는 모든 음각에 대해 비교 후 pilllist 에 append
            # 알약 앞/ 뒤 음각과 완전 일치하는 알약에 대해 우선적으로 append 진행
            for index in range(23935):
                for c in range(len(textlist)):
                    if (textlist[c] == str(xlsx[pyosiap][index])):
                        for d in range(len(textlist)):
                            if (textlist[d] == str(xlsx[pyosidui][index])):
                                if xlsx[poommoknumber][index] != 200806190 and xlsx[poommoknumber][
                                    index] != 200806191 and xlsx[poommoknumber][index] != 200806192:
                                    if xlsx[poommoknumber][index] not in pilllist:
                                        pilllist.append(xlsx[poommoknumber][index])
                                        indexlist.append(index)
                                else:
                                    pilllist.append(xlsx[poommoknumber][index])
                                    indexlist.append(index)

            for index in range(23935):
                for c in range(len(textlist)):
                    if (textlist[c] == str(xlsx[pyosidui][index])):
                        for d in range(len(textlist)):
                            if (textlist[d] == str(xlsx[pyosiap][index])):
                                if xlsx[poommoknumber][index] != 200806190 and xlsx[poommoknumber][
                                    index] != 200806191 and xlsx[poommoknumber][index] != 200806192:
                                    if xlsx[poommoknumber][index] not in pilllist:
                                        pilllist.append(xlsx[poommoknumber][index])
                                        indexlist.append(index)
                                else:
                                    pilllist.append(xlsx[poommoknumber][index])
                                    indexlist.append(index)

            for index in range(23935):
                for c in range(len(textlist)):
                    if (textlist[c] == str(xlsx[pyosiap][index])) or (textlist[c] == str(xlsx[pyosidui][index])):
                        if xlsx[poommoknumber][index] != 200806190 and xlsx[poommoknumber][index] != 200806191 and \
                                xlsx[poommoknumber][index] != 200806192:
                            if xlsx[poommoknumber][index] not in pilllist:
                                pilllist.append(xlsx[poommoknumber][index])
                                indexlist.append(index)
                        else:
                            pilllist.append(xlsx[poommoknumber][index])
                            indexlist.append(index)

        if not pilllist:
            # print('C')
            # 음각과 일치하는 알약을 찾지 못했을 때 음각을 일부 포함하고 있는 알약을 pilllist에 append
            for index in range(23935):
                for c in range(len(textlist)):
                    if (textlist[c] in str(xlsx[pyosiap][index])) or (textlist[c] in str(xlsx[pyosidui][index])):
                        if xlsx[poommoknumber][index] != 200806190 and xlsx[poommoknumber][index] != 200806191 and \
                                xlsx[poommoknumber][index] != 200806192:
                            if xlsx[poommoknumber][index] not in pilllist:
                                pilllist.append(xlsx[poommoknumber][index])
                                indexlist.append(index)
                        else:
                            pilllist.append(xlsx[poommoknumber][index])
                            indexlist.append(index)

        if not pilllist:
            # print('D')
            # 음각 일부를 포함하고 있는 알약을 찾지 못했을때, jaccard 유사도를 진행하여 pilllist 에 append
            # ( 'RDUQ','마크DUQ') ->0.5  / (saridon, sandon )->0.75 , 유사도 0.5를 기준으로 진행
           for index in range(23935):
                for c in range(len(textlist)):
                    if get_jaccard_sim(textlist[c], str(xlsx[pyosiap][index])) >= 0.5 or get_jaccard_sim(textlist[c],
                                                                                                         str(xlsx[
                                                                                                                 pyosidui][
                                                                                                                 index])) >= 0.5:
                        if xlsx[poommoknumber][index] != 200806190 and xlsx[poommoknumber][index] != 200806191 and \
                                xlsx[poommoknumber][index] != 200806192:
                            if xlsx[poommoknumber][index] not in pilllist:
                                pilllist.append(xlsx[poommoknumber][index])
                                indexlist.append(index)
                        else:
                            pilllist.append(xlsx[poommoknumber][index])
                            indexlist.append(index)

        ############################

        if len(pilllist) == 1:
            # 음각 비교된 후 일치하는 알약이 1개 일때 해당 알약을 출력
            showpilllist = pilllist
        elif len(pilllist) > 1:
            # 음각 비교된 후 일치하는 알약이 2개 이상 일때 배경을 제거한 뒤, 다중라벨분류모델을 통해 색깔과 제형 예측
            # 예측된 색깔과 제형이 일치하는 알약에 대해 추가 선별하여 showpillist 에 append
            os.system("python3 main.py -i input.jpeg -o input-out.png -m u2net -prep None -postp No")
            shapecolor = []
            shapecolor = test('input-out.png')

            shape = []
            color = []
            # 예측값에 대해서 색깔과 제형으로 분리
            for a in range(len(shapecolor)):
                if shapecolor[a][-1] == chr(54805):
                    shape.append(shapecolor[a])
                else:
                    color.append(shapecolor[a])

            for c in range(len(color)):
                for s in range(len(shape)):
                    for index in range(len(indexlist)):
                        if (xlsx[euyakpoomjaehyung][indexlist[index]] == shape[s] and xlsx[saeksangap][
                            indexlist[index]] == color[c]):
                            if xlsx[poommoknumber][indexlist[index]] not in showpilllist:
                                showpilllist.append(xlsx[poommoknumber][indexlist[index]])

    if not showpilllist:
        # 최종적으로 선별된 showpilllist 가 비었을 경우
        # 기존에 음각 비교만 진행한 pilllist 에서 상위 5개 출력

        if len(pilllist) > 5:
            temp = ''
            for i in pilllist[:5]:
                temp = temp + str(i) + ','
            print(temp)
        else:
            temp = ''
            for i in pilllist:
                temp = temp + str(i) + ','
            print(temp)
    else:
        # 최종적으로 선별된 showpilllist 가 있을 경우
        # showpilllist 에서 상위 5개 출력

        temp = ''
        for i in showpilllist[:5]:
            temp = temp + str(i) + ','
        print(temp)







