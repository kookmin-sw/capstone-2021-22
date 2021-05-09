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
                <Text style={styles.text}>해당 사진으로 검색하시겠습니까?</Text>
            </View>
                
            <View style={styles.ButtonView}>
                <TouchableOpacity 
                    style={styles.Button}
                    onPress={()=>{
                        navigation.reset({
                            index: 0,
                            routes: [{name: "PhotoGuide"}]
                        })
                }}>
                    <Text style={styles.ButtonText}>다시 촬영하기</Text>
                </TouchableOpacity>
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
        width: 262,
        height: 24,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 20,
        fontWeight: "500",
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
        width: 140,
        height: 43,
        borderRadius: 22,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#c86e65",
        margin : 10
    },
    ButtonText : {
        width: 96,
        height: 21,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 18,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: -0.36,
        textAlign: "center",
        color: "#c86e65"

    },
})

export default PhotoScreen;