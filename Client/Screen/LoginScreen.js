import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

export function LoginScreen() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    
    logIn= async () => { 
        fetch("http://3.34.96.230/auth/login", {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "nick" : id,
                "password" : password,
            })
        }).then(res => res.json())
        .then(response => {
            // console.log(response)
            if(response.isLogin){
                console.log('로그인 성공')
                AsyncStorage.setItem('token',response.token);
                navigation.goBack(null)
            } else {
                Alert.alert(
                    "아이디와 비밀번호를 다시 확인해주세요"
                  );
                console.log('로그인 실패')
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
    

    return (
        <View style={styles.MainView}>
            <View style={styles.TextView}>
                <Text style={styles.Text}>내 약통은 회원 전용 서비스 입니다.</Text>
                <Text style={styles.Text}>해당 기능을 사용하시려면 로그인 해주세요.</Text>
            </View>

            <View style={styles.InputTextView}>
                <TextInput style={styles.InputText}
                placeholder='아이디'
                placeholderTextColor='#cccccc'
                value={id}
                autoCapitalize='none'
                onChangeText={(text) => {setId(text);}}
                />
                <View style= {styles.hr} />

                <TextInput style={styles.InputText}
                placeholder = '비밀번호'
                placeholderTextColor = '#cccccc'
                value={password}
                autoCapitalize='none'
                onChangeText={(text) => {setPassword(text);}}
                secureTextEntry= {true} />
                <View style= {styles.hr} />

            </View>

            <View style={styles.LoginButtonView}>
                <TouchableOpacity
                    style={styles.LoginButton}
                    onPress={() => logIn()}>
                    <Text style={styles.LoginButtonText}>로그인</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.RegisterButtonView}>
                <TouchableOpacity
                    style={styles.RegisterButton}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.RegisterButton}>회원가입</Text>
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
        // width: 292,
        // height: 46,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 18,
        fontWeight: '300',
        fontStyle: 'normal',
        lineHeight: 25,
        letterSpacing: -0.36,
        textAlign: 'center',
        color: '#525252',

    }, 
    InputText : {
        // width: 61,
        // height: 29,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 30,
        fontWeight: '200',
        fontStyle: 'normal',
        letterSpacing: -0.48,
        textAlign: 'left',
        color: '#5c5c5c',
        paddingTop: 34,
        paddingBottom: 30,
        marginRight : 10,
        marginLeft: 10,
        backgroundColor : 'white',

    },
    InputTextView : {
        flex : 3,
        // alignItems: 'center',
        justifyContent : 'center',
        marginRight : 47,
        marginLeft: 47,
        paddingRight : 10,
        paddingLeft : 10,
    },
    hr : {
        borderBottomWidth: 1, 
        borderBottomColor: '#cccccc',
        paddingLeft : 10
    },
    LoginButtonView : {
        flex : 2,
        alignItems: 'center',
        justifyContent : 'center',

    },
    LoginButton : {
        alignItems: 'center',
        justifyContent : 'center',
        width: 180,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#c86e65'
    },
    LoginButtonText : {
        width: 62,
        height: 29,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 24,
        fontWeight: '800',
        fontStyle: 'normal',
        letterSpacing: -0.48,
        textAlign: 'center',
        color: '#ffffff'
    },
    RegisterButtonView : {
        flex : 2,
        alignItems: 'center',
        // justifyContent : 'center',
    },
    RegisterButton : {
        // width: 62,
        // height: 21,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 22,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#c86e65'
    }
});

export default LoginScreen;
