import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export function RegisterScreen() {

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    sendCred=() => {
        console.log(name, id, password);
        navigation.navigate('RegisterFinish');
    }

    return (
        <View style={styles.container}>
            <View style={styles.InputTextView}>
                <TextInput style={styles.textinput}
                placeholder='이름'
                value={name}
                autoCapitalize='none'
                onChangeText={(text) => {setName(text);}}
                />
                <View style={styles.hr} />

                <TextInput style={styles.textinput}
                placeholder='아이디'
                value={id}
                autoCapitalize='none'
                onChangeText={(text) => {setId(text);}}
                />
                <View style={styles.hr} />

                <TextInput style={styles.textinput}
                placeholder='비밀번호'
                value={password}
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={(text) => {setPassword(text);}}
                />
                <View style={styles.hr} />
            </View>

            <View style={styles.registerButtonView}>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => sendCred()}>
                    <Text style={styles.registerButtonText}>가입하기</Text>
                </TouchableOpacity>
            </View>
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
        color: '#707070'
    },

    registerButtonView : {
        flex : 2,
        alignItems: 'center',
        justifyContent : 'center',
    },

    registerButtonText : {
        width: 100,
        height: 30,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
        color: '#c86e65'
    },

    registerButton: {
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