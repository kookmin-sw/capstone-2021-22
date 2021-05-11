import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';

export function PhotoScreen(){

    const navigation = useNavigation();

    const [firstImage, setFirstImage] = useState({});
    const [secondImage, setSecondImage] = useState({});
    
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
              console.log(secondImage);
          });
    }
    const renderImage = (order) => {
        if (order == 1) {
            return <Image
                source={{ uri:firstImage.uri }}
                style={styles.images}
            />
        } else if (order == 2) {
            return <Image
                source={{ uri:secondImage.uri }}
                style={styles.images}
            />
        } else {
            return <Text style={styles.images}>
                +
            </Text>
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
                    onPress={()=>{
                        navigation.reset({
                            index: 0,
                            routes: [{name: "Search"}]
                        })
                }}>
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
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 30,
        width: 235,
        height: 235,
        borderWidth: 1,
        borderColor: "#cccccc"
    },
    nullImages: {
        width: 90,
        height: 90,
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