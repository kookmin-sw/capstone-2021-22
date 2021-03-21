import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class RegisterFinishScreen extends Component {

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.Text}>회원가입을 축하합니다.</Text>
                <View style={styles.ButtonView}>
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={()=>{
                            this.props.navigation.navigate('Search')
                        }}>
                        <Text style={styles.ButtonText}>홈으로</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Button}
                        /*onPress={()=>{
                            this.props.navigation.navigate('Main')
                        }}*/>
                        <Text style={styles.ButtonText}>로그인</Text>
                    </TouchableOpacity>
                </View>
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

  Text: {
    marginTop: 250,
    fontSize: 24,
    color: '#707070'
  },

  ButtonView : {
    marginTop: 120,
    alignItems: 'center',
    justifyContent : 'center',
  },

  ButtonText : {
    width: 100,
    height: 30,
    // fontFamily: "AppleSDGothicNeo",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    color: "#c86e65"
  },

  Button: {
    margin: 10,
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