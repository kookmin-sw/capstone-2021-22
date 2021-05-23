import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';


import plus from '../src/icon/plus.png';

export function PhotoScreen(){

    const navigation = useNavigation();

    const [firstImage, setFirstImage] = useState({});
    const [secondImage, setSecondImage] = useState({});

    function uploadImage () {
        const formData = new FormData();
        formData.append("first", { uri: firstImage.uri, type: "image/jpeg", name: "first" });
        formData.append("second", { uri: secondImage.uri, type: "image/jpeg", name: "second" });
        console.log(formData)
        navigation.navigate('Loading', {formData: formData})
        // AsyncStorage.getItem('token', (err, token) => {
        //     if (token !== null) {
        //         fetch("http://3.34.96.230/imageSearch/", {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //                 Authorization : `Bearer ${token}`
        //             },
        //             body: formData,
        //         })
        //         .then((res) => res.json())
        //         .then((response) => {
        //             console.log('response',response);
        //             // return responseJson;
        //         })
        //         .catch((error) => {
        //             console.log('error',error);
        //         });
        //     }
        // });
    }
    
    runFirstCamera = async () => {
        ImageCropPicker.openCamera({
            width: 400,
            height: 400,
            cropping: true
          }).then(image => {
              console.log(image);
              setFirstImage({
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime
              });
          });
    }
    runSecondCamera = async () => {
        ImageCropPicker.openCamera({
            width: 400,
            height: 400,
            cropping: true
          }).then(image => {
              console.log(image);
              setSecondImage({
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime
              });
          });
    }
    const renderImage = (order) => {
        if (firstImage.uri != undefined && order == 1) {
            return <Image
                source={{ uri:firstImage.uri }}
                style={styles.images}
            />
        } else if (secondImage.uri != undefined && order == 2) {
            return <Image
                source={{ uri:secondImage.uri }}
                style={styles.images}
            />
        } else {
            return <View style={styles.images}>
                <Image
                    source={plus}
                    style={styles.plusIcon}
                />
            </View>
        }
    }

    async function searchImage()  { // 서버로 사진 전송
        if (firstImage.uri === undefined || secondImage.uri === undefined) {
            console.log("실패")
            Alert.alert('두 장의 사진을 모두 찍어주세요.')
        } else {
            console.log("성공")
            uploadImage()
            // navigation.reset({
            //     index: 0,
            //     routes: [{name: 'SearchFail'}]
            // })
        }
    }
    
    return (
        <View style={styles.MainView}>
            <View style={styles.ImageView}>
                <TouchableOpacity onPress={runFirstCamera} style={styles.cameraBtn}>
                    {renderImage(1)}
                </TouchableOpacity>
                <TouchableOpacity onPress={runSecondCamera} style={styles.cameraBtn}>
                    {renderImage(2)}
                </TouchableOpacity>
            </View>
            <View style={styles.TextView}>
                <Text style={styles.text}>+를 터치하여 알약의 <Text style={styles.highlight}>양쪽 면</Text>을 찍어주세요</Text>
            </View>
                
            <View style={styles.ButtonView}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={()=>searchImage()}>
                    <Text style={styles.ButtonText}>검색하기</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    MainView : {
        flex : 1,
        backgroundColor : "white",
        justifyContent: "center"
    },
    ImageView: {
        alignItems: "center",
        marginBottom: 10,
    },
    images: {
        marginBottom: 30,
        width: 235,
        height: 235,
        borderWidth: 1,
        borderColor: "#cccccc",
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusIcon: {
        width: 50,
        height: 50,
    },
    TextView : {
        alignItems: "center",
        justifyContent : "center",
    },
    text : {
        width: 266,
        height: 19,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 16,
        fontWeight: "200",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#707070"
    },
    ButtonView : {
        flexDirection: "row",
        alignItems: "center",
        justifyContent : "center",
        padding : 20
    },
    Button : {
        alignItems: "center",
        justifyContent : "center",
        width: 240,
        height: 53,
        borderRadius: 32,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#c86e65",
        margin : 10
    },
    ButtonText : {
        width: 82,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 22,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: -0.48,
        textAlign: "center",
        color: "#c86e65"

    },
    highlight : {
        width: 266,
        height: 19,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 16,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#707070"

    }
})

export default PhotoScreen;