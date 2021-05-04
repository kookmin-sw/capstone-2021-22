
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';


class ConfirmScreen extends Component {
    
    render () { 

        return (
            <View style={styles.MainView}>

                
        
                <View style={styles.TextView}>
                    <Text style={styles.text}>해당 사진으로 검색하시겠습니까?</Text>
                </View>
                    
                <View style={styles.ButtonView}>
                    <TouchableOpacity 
                        style={styles.Button}
                        onPress={()=>{
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{name: 'Photo'}]
                            })
                    }}>
                        <Text style={styles.ButtonText}>다시 촬영하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.Button}
                        onPress={()=>{
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{name: 'Photo'}]
                            })
                    }}>
                        <Text style={styles.ButtonText}>검색하기</Text>
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
        justifyContent : 'center',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'center',
        padding : 50
        
    },
    Button : {
        alignItems: 'center',
        justifyContent : 'center',
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
});

export default ConfirmScreen;
