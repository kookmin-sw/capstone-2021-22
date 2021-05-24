import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import star from '../src/icon/star.png';
import fullStar from '../src/icon/full-star.png';

export function PillDetail(props) {

    const navigation = useNavigation();
    const [favorite, setFavorite] = useState(star);

    // props로 즐겨찾기 상태 받아와서 true면 노란별 렌더링
    useEffect(() => {
        if (props.favorite) {
            setFavorite(fullStar)
        }
    })

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
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'MyPill'}]
                        })}},
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

    // html 태그 제거
    function replaceTag(str) {
        if (str) {
            return str.replace(/<[^>]+>/g,'\n')
        } else {
            return
        }
    }

    // props.flag가 false면(PillDetail 정보가 없을 때) 상세정보 페이지로 이동할 수 있는 링크 렌더링, true면 PillDetail 정보 렌더링
    function showDetail() {
        if (!props.flag) {
            return (
                <View style={styles.body}>
                    <Text style={styles.text} onPress={() => Linking.openURL("https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq="+props.id)}>
                        상세정보 링크 이동
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  효능 효과</Text>
                        <Text style={styles.sectionDescription}>{replaceTag(props.efcy)}</Text>       
                        <View style= {styles.hr} />                
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  복용방법</Text>
                        <Text style={styles.sectionDescription}>{replaceTag(props.useMethod)}</Text>       
                        <View style= {styles.hr} />                
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  복약정보</Text>
                        <Text style={styles.sectionDescription}>{replaceTag(props.atpnWarn)}</Text>       
                        <View style= {styles.hr} />                
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  사용상 주의사항</Text>
                        <Text style={styles.sectionDescription}>{replaceTag(props.atpn)}</Text>       
                        <View style= {styles.hr} />                
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  복용시 주의사항</Text>
                        <Text style={styles.sectionDescription}>{replaceTag(props.intrc)}</Text>       
                        <View style= {styles.hr} />                
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  부작용</Text>
                        <Text style={styles.sectionDescription}>{replaceTag(props.se)}</Text>       
                        <View style= {styles.hr} />                
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  보관방법</Text>
                        <Text style={styles.sectionDescription}>{replaceTag(props.depositMethod)}</Text>       
                        <View style= {styles.hr} />                
                    </View>
                </View>
            )
        }
    }

    return(
        <View>
            <Image source={{uri: props.imgUrl}} style={styles.image} resizeMode="contain"/>
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{props.name}</Text>
                    <TouchableOpacity onPress={changeFavorite}>
                        <Image style={styles.icon} source={favorite}/>
                    </TouchableOpacity>
                </View>      

                <View style= {styles.hr} />            
                <View style={styles.textContainer}>
                    <View style={styles.key}>
                        <Text style={styles.keyText}>제조수입사</Text>
                        <Text style={styles.keyText}>분류명</Text>
                        <Text style={styles.keyText}>제형코드명</Text>
                    </View>
                    <View style={styles.value}>
                        <Text style={styles.valueText}>{props.company}</Text>
                        <Text style={styles.valueText}>{props.className}</Text>
                        <Text style={styles.valueText}>{props.codeName}</Text>
                    </View>
                </View>
                <View style={styles.hr} />            
            </View>
            {showDetail()}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        backgroundColor: '#ffff',
        padding: 35, 
    },
    titleContainer : {
        flexDirection: 'row',
    },
    textContainer : {
        flexDirection: 'row',
    },
    image : {
        alignItems: 'center',
        justifyContent : 'center',
        width: '100%',
        height: 250,
    },
    icon : {
        width: 30,
        height: 30,
    },
    titleText : {
        flex: 1,
        width: 92,
        height: 31,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 25,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: -0.25,
        textAlign: 'left',
        color: '#000000',
        marginLeft : 20
    },
    keyText : {
        height: 21,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 18,
        fontWeight: '100',
        fontStyle: 'normal',
        letterSpacing: -0.18,
        textAlign: 'left',
        color: '#3b3b3b',
        margin : 6,
        marginLeft : 20
    },
    valueText : {
        height: 21,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 18,
        fontWeight: '300',
        fontStyle: 'normal',
        letterSpacing: -0.18,
        textAlign: 'left',
        color: '#000000',
        margin : 6,
        marginLeft : 20
    },
    hr : {
        borderBottomWidth: 1, 
        borderBottomColor: '#D5D5D5',
        marginTop: 14.5,
        marginBottom: 14.5,
    },
    body: {
        marginTop : 20,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: '300',
        fontStyle: 'normal',
        margin: 20,
    },
    sectionContainer: {
        paddingHorizontal: 35,
        marginTop: 10,
        width: '95%'
    },
    sectionTitle : {
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.33,
        textAlign: 'left',
        color: '#000000',
        marginTop : 20,
    },
    sectionDescription : {
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 18,
        fontWeight: '200',
        fontStyle: 'normal',
        letterSpacing: -0.27,
        textAlign: 'left',
        color: '#000000',
    },
});