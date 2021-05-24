import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import * as config from '../src/config';
import star from '../src/icon/star.png';
import fullStar from '../src/icon/full-star.png';

export function PillList(props) {

    const navigation = useNavigation();
    const [favorite, setFavorite] = useState(star);

    // props로 즐겨찾기 상태 받아와서 true면 노란별 렌더링
    useEffect(() => {
        if (props.favorite) {
            setFavorite(fullStar)
        }
    }, [])
    
    // 토큰 유무 확인 -> 토큰 있으면 즐겨찾기 추가/제거, 없으면 alert
    async function changeFavorite() {
        AsyncStorage.getItem('token', (err, token) => {
            if (token !== null) {
                if (favorite === star) {
                    fetch("http://3.34.96.230/favorite", {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json',
                            Authorization : `Bearer ${token}`
                        },
                        body : JSON.stringify({
                            "pillId" : props.id,
                            "isFavorite" : true
                        })
                    }).then(res => res.json())
                    .then(response => { 
                        console.log(response)
                        setFavorite(fullStar)
                    })
                    .catch(error => console.error('Error:', error));
                } else {
                    Alert.alert("내 약통에서 삭제하시겠습니까?", "", [
                        { text: "네", onPress: () => {
                        fetch("http://3.34.96.230/favorite", {
                            method : "POST",
                            headers: {
                                'Content-Type' : 'application/json',
                                Authorization : `Bearer ${token}`
                            },
                            body : JSON.stringify({
                                "pillId" : props.id,
                                "isFavorite" : false
                            })
                        }).then(res => res.json())
                        .then(response => { 
                            console.log(response)
                            setFavorite(star)
                        })
                        .catch(error => console.error('Error:', error));
                        navigation.navigate("MyPill")}},
                        { text: "아니요", onPress: () => console.log("아니라는데") },
                      ],
                      { cancelable: false });
                }
            } else {
                Alert.alert("로그인이 필요한 기능입니다.\n로그인 하시겠습니까?", "", [
                    { text: "네", onPress: () => navigation.navigate("Login")},
                    { text: "아니요", onPress: () => console.log("아니라는데") },
                  ],
                  { cancelable: false });
            }
        })
    }

    return(
        <View>
            <TouchableOpacity 
                style={styles.PillContainer}
                onPress={() => navigation.navigate('PillDetail', {id: props.id})
                }>
                <Image source={{
                    uri:
                    'data:image/jpeg;base64,' +
                    config.arrayBufferToBase64(props.imgUrl.data),
                }} style={styles.imageStyle} resizeMode="contain"
                />
                <View style={{width: '50%'}}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.MainText} numberOfLines={2} ellipsizeMode="tail">{props.name}</Text>
                        <TouchableOpacity
                            onPress={changeFavorite}>
                            <Image
                            style={styles.icon}
                            source={favorite}
                            /> 
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.SubText}>{props.className}</Text>
                    <Text style={styles.SubText}>{props.codeName}</Text>
                </View>
            </TouchableOpacity>
            <View style= {styles.hr}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    PillContainer : {
        width: '95%',
        height: 125,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        marginBottom: 2
    },
    hr : {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5',
    },
    nameContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageStyle: {
        width: '55%', 
        height: '90%',
    },
    icon : {
        width: 20,
        height: 20,
    },
    MainText : {
        marginBottom : 5, 
        marginLeft : 15,
        width: '70%',
        height: 52,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 21,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#000000',
    },
    SubText : {
        marginLeft : 15,
        marginTop: 5,
        width: 150,
        height: 16,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 15,
        fontWeight: '300',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#585858'
    }
});