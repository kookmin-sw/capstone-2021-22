import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextComponent, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

class LoginScreen extends Component {

    state = {
        id: '',
        password: ''
    };

    handleId = text => {
        this.setState({ id: text });
    }

    handlePw = text => {
        this.setState({ password: text });
    }

    login = (id, pw) => {
        console.log(JSON.stringify(this.state))      

    }


    render () {
        return (
            <View style={styles.MainView}>
                <View style={styles.TextView}>
                    <Text style={styles.Text}>내 약통은 회원 전용 서비스 입니다.</Text>
                    <Text style={styles.Text}>해당 기능을 사용하시려면 로그인 해주세요.</Text>
                </View>

                <View style={styles.InputTextView}>
                    <TextInput style={styles.InputText}
                    underlineColorAndroid = "transparent"
                    placeholder = "아이디"
                    placeholderTextColor = "#cccccc"
                    autoCapitalize="none"
                    onChangeText={this.handleId}
                    />
                    <View style= {styles.hr} />

                    <TextInput style={styles.InputText}
                    underlineColorAndroid = "transparent"
                    placeholder = "비밀번호"
                    placeholderTextColor = "#cccccc"
                    autoCapitalize="none"
                    onChangeText={this.handlePw}
                    secureTextEntry= {true} />
                    <View style= {styles.hr} />

                </View>

                <View style={styles.LoginButtonView}>
                    <TouchableOpacity
                        style={styles.LoginButton}
                        onPress={() => this.login(this.state.id, this.state.password)}>
                        <Text style={styles.LoginButtonText}>로그인</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.RegisterButtonView}>
                    <TouchableOpacity
                        style={styles.RegisterButton}>
                        <Text style={styles.RegisterButton}>회원가입</Text>
                    </TouchableOpacity>
                </View>

            </View>
            
            
        )
    }
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
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 18,
        fontWeight: "300",
        fontStyle: "normal",
        lineHeight: 25,
        letterSpacing: -0.36,
        textAlign: "center",
        color: "#525252",

    }, 
    InputText : {
        // width: 61,
        // height: 29,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 30,
        fontWeight: "200",
        fontStyle: "normal",
        letterSpacing: -0.48,
        textAlign: "left",
        color: "#5c5c5c",
        paddingTop: 34,
        paddingBottom: 34,
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
        backgroundColor: "#c86e65"
    },
    LoginButtonText : {
        width: 62,
        height: 29,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 24,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: -0.48,
        textAlign: "center",
        color: "#ffffff"
    },
    RegisterButtonView : {
        flex : 2,
        alignItems: 'center',
        // justifyContent : 'center',
    },
    RegisterButton : {
        // width: 62,
        // height: 21,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 22,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#c86e65"
    }
});

export default LoginScreen;
