import React, {Component} from 'react';
import { StyleSheet, Text, Button, View, TextInput, TouchableOpacity } from 'react-native';


export default class RegisterScreen extends Component {
    state = {
      name: "",
      id: "",
      password  : "",
    };

    changeName = (text) => {
      this.setState({ name : text });
    };
    
    changeId = (text) => {
      this.setState({ id : text });
    };

    changePassword = (text) => {
      this.setState({ password : text });
    };
     
    registerFunc (){
      console.log(JSON.stringify(this.state))
    };

    render(){
        return (
            <View style={styles.container}>
              <View style={styles.InputTextView}>
                <TextInput
                placeholder='이름'
                style={styles.textinput}
                onChangeText={this.changeName}
                value={this.state.name}
                />
                <View style={styles.hr} />

                <TextInput
                placeholder='아이디'
                style={styles.textinput}
                onChangeText={this.changeId}
                value={this.state.id}
                />
                <View style={styles.hr} />

                <TextInput
                secureTextEntry={true}
                placeholder='비밀번호'
                style={styles.textinput}
                onChangeText={this.changePassword}
                value={this.state.password}
                />
                <View style={styles.hr} />
              </View>

              <View style={styles.registerButtonView}>
                  <TouchableOpacity
                      style={styles.registerButton}
                      onPress={() => this.registerFunc()}>
                      <Text style={styles.registerButtonText}>가입하기</Text>
                  </TouchableOpacity>
              </View>
              {/* <Button title="가입하기" style={styles.registerButton} onPress={() => this.registerFunc()}/> */}
            </View>
          );
    }

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
      // fontFamily: "AppleSDGothicNeo",
      fontSize: 24,
      fontWeight: "800",
      textAlign: "center",
      color: "#c86e65"
  },

  registerButton: {
    alignItems: 'center',
    justifyContent : 'center',
    width: 180,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#c86e65",
    backgroundColor: "#ffffff"
  }
});