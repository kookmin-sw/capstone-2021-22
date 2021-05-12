import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export function RegisterScreen() {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [validateId, setValidateId] = useState(false);

    async function idCheck()  { // 아이디 중복 확인
        fetch("http://3.34.96.230/auth/isExistId", {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                "nick" : id,
            })
        }).then(res => res.json())
        .then(response => {
            if(response.isExistId){
                setValidateId(false)
                Alert.alert('이미 존재하는 아이디 입니다.')
            } else {
                setValidateId(true)
                Alert.alert('사용할 수 있는 아이디 입니다.')
            }
        })
        .catch(error => console.error('Error:', error));
    }

    async function register()  { // 회원 등록
        if (!name || !id || !password) {
            Alert.alert('정보를 모두 입력해주세요.')
        } else if (validateId === false) { // 중복 아이디 판별
            Alert.alert('아이디 중복확인을 해주세요.')
        } else {
            fetch("http://3.34.96.230/auth/join", {
                method : "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({
                    "name" : name,
                    "nick" : id,
                    "password" : password,
                    "isExistId" : false
                })
            }).then(res => res.json())
            .then(response => { 
                console.log(response)
                navigation.reset({
                    index: 0,
                    routes: [{name: 'RegisterFinish'}]
                })
            })
            .catch(error => console.error('Error:', error));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.InputTextView}>
                <TextInput style={styles.textinput}
                placeholder='이름'
                placeholderTextColor = '#cccccc'
                value={name}
                autoCapitalize='none'
                onChangeText={(text) => {setName(text);}}
                />
                <View style={styles.hr}/>

                <View style={styles.idView}>
                    <TextInput style={styles.idTextInput}
                    placeholder='아이디'
                    placeholderTextColor = '#cccccc'
                    value={id}
                    autoCapitalize='none'
                    onChangeText={(text) => {setId(text);}}
                    />
                    <TouchableOpacity
                        style={styles.idCheckButton}
                        onPress={() => idCheck()}>
                        <Text style={styles.idCheckButtonText}>중복확인</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.idhr} />

                <TextInput style={styles.textinput}
                placeholder='비밀번호'
                placeholderTextColor = '#cccccc'
                value={password}
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={(text) => {setPassword(text);}}
                />
                <View style={styles.hr} />
            </View>

            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => register()}>
                <Text style={styles.registerButtonText}>가입하기</Text>
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    InputTextView: {
        margin: 60
    },

    hr : {
        width: 270,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },

    textinput: {
        marginTop: 60,
        width: 250,
        marginBottom: 10,
        height: 40,
        fontSize: 24,
        color: '#5c5c5c'
    },

    idView: {
        flexDirection: 'row',
    },

    idTextInput: {
        marginTop: 60,
        marginRight: 15,
        width: 175,
        marginBottom: 10,
        height: 40,
        fontSize: 24,
        color: '#5c5c5c',
    },

    idCheckButtonText : {
        width: 70,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 17,
        fontWeight: '800',
        textAlign: 'center',
        color: '#c86e65'
    },

    idCheckButton: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent : 'center',
        width: 80,
        height: 40,
        borderWidth: 2,
        borderColor: '#c86e65',
        backgroundColor: '#ffffff'
    },

    idhr : {
        width: 175,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },

    registerButtonText : {
        width: 100,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
        color: '#c86e65'
    },

    registerButton: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent : 'center',
        width: 180,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: '#c86e65',
        backgroundColor: '#ffffff'
    }
});

export default RegisterScreen;