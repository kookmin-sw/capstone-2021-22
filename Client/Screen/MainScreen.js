import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import * as config from '../src/config';
import  logo  from './images/pill.png';
import  MyPillLogo  from '../src/icon/pills-bottle.png';

export function MainScreen() {

    const navigation = useNavigation();
    const [myPillText, setMyPillText] = useState('');
    const [myPillNum, setMyPillNum] = useState('')
    const [navScreen, setNavScreen] = useState('');

    // 메인 스크린
    // 토큰 유무 확인 -> 토큰 있으면 유저이름, 즐겨찾기 된 알약 수 포함해서 렌더링
    useEffect(() => {
        AsyncStorage.getItem('token', (err, token) => {
            if (token !== null) {
                config.IS_LOGIN = true;
                fetch("http://3.34.96.230/favorite", {
                    method : "GET",
                    headers : {
                        'Content-Type' : 'application/json',
                        Authorization : `Bearer ${token}`
                    },
                }).then(res => res.json())
                .then(response => { 
                    console.log(response)
                    setMyPillText(response.name + "님의 약통");
                    setMyPillNum(response.numOfPill);
                    setNavScreen("MyPill")
                    console.log(config.IS_LOGIN);
                })
                .catch(error => console.error('Error:', error));
            } else {
                config.IS_LOGIN = false;
                setMyPillText("내 약통");
                setNavScreen("Login")
                console.log(config.IS_LOGIN);
            }
        });
    }, []);

    return (
        <View style={styles.MainView}>
            <View style={styles.TextView}>
                <Text style={styles.Text}><Text style={styles.highlight}>사진</Text>을 찍어서</Text>
                <Text style={styles.Text}>무슨 약인지 알아보세요</Text>
            </View>

            <View style={styles.MainButtonView}>
                <View style={styles.MainButtonContainer}>
                    <Image style={styles.LogoImage}
                        source={logo}/>
                    <TouchableOpacity 
                        style={styles.MainButton}
                        onPress={()=>{
                            navigation.navigate('PhotoGuide')
                        }}>
                        <Text style={styles.MainButtonText}>알약 사진 찍기</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.SearchButtonView}>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'Search'}]
                        })
                    }}>
                    <Text style={styles.SearchButton}>알약 이름을 알고 계신가요?</Text>
                    <View style={styles.hr} />
                </TouchableOpacity>
            </View>
            <View style={styles.MyPillButtonView}>
                <TouchableOpacity
                    style={styles.MyPillButton}
                    onPress={()=>{
                        navigation.navigate(navScreen)
                    }}>
                    <View style={styles.MyPillLogoView}>
                        <Image style={styles.MyPillLogoImage}
                            source={MyPillLogo}/>
                    </View>
                    <Text style={styles.MyPillButtonText}>{myPillText}</Text>
                    <Text style={styles.MyPillNumText}>{myPillNum + ' >'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    MainView : {
        flex : 1,
        backgroundColor : 'white'
    },
    TextView : {
        alignItems: 'center',
        paddingTop : 57,
        paddingBottom : 57

    },
    Text: {
        width: 287,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 32,
        fontWeight: '300',
        fontStyle: 'normal',
        letterSpacing: -0.64,
        textAlign: 'left',
        color: '#525252'
    }, 
    MainButtonView : {
        flex : 3,
        alignItems: 'center',
        justifyContent : 'center',
    },
    LogoImage : {
        width: 121,
        height: 121,
        marginBottom : 38
    },
    MainButtonContainer : {
        alignItems: 'center',
        justifyContent : 'center',
        width: 314,
        height: 294,
        // opacity: 0.14,
        borderRadius: 27,
        // backgroundColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D5D5D5'
    },
    MainButton : {
        width: 256,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#c86e65',
        alignItems: 'center',
        justifyContent : 'center',
    },
    MainButtonText : {
        height: 29,
        // fontFamily: 'AppleSDGothicNeo',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: '800',
        fontStyle: 'normal',
        letterSpacing: -0.48,
        textAlign: 'left',
        color: '#ffffff'
    },
    searchText: {
        marginTop: 15,
        fontSize: 16,
        color: '#525252'
    },
    MyPillButtonView : {
        flex : 2,
        alignItems: 'center',
        justifyContent : 'center',
    },
    MyPillButton : {
        flexDirection: 'row',
        width: 322,
        height: 97.9,
        backgroundColor: '#f0f2f0',
        alignItems: 'center',
        borderRadius: 20,
    },
    MyPillLogoView : {
        width: 60,
        height: 60,
        backgroundColor: '#ffff',
        borderRadius: 12,
        margin : 25,
        marginRight : 15,
        alignItems: 'center',
        justifyContent : 'center',
    },
    MyPillLogoImage : {
        width: 36,
        height: 36
    },
    MyPillButtonText : {
        width: 165,
        height: 29,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.48,
        textAlign: 'left',
        color: '#404040'
    },
    MyPillNumText : {
        width: 26,
        height: 24,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 18,
        fontWeight: "100",
        fontStyle: "normal",
        textAlign: "left",
        color: "#404040"
    },
    highlight : {
        width: 287,
        height: 78,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 32,
        fontWeight: '800',
        fontStyle: 'normal',
        letterSpacing: -0.64,
        textAlign: 'left',
        color: '#a7484d'
    },
    SearchButtonView : { 
        alignItems: 'center',
        justifyContent : 'center',
    },
    SearchButton : {
        width: 158,
        height: 19,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 15,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 25,
        letterSpacing: -0.3,
        textAlign: "center",
        color: "#a2a2a2"
    },
    hr : {
        width: 158,
        height: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
});

export default MainScreen;
