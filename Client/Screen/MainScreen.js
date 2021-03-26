import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import logo from './images/pill.png';

class MainScreen extends Component {

    render () {
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
                                this.props.navigation.navigate('Search')
                            }}>
                            <Text style={styles.MainButtonText}>알약 사진 찍기</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.MyPillButtonView}>
                    <TouchableOpacity
                        style={styles.MyPillButton}
                        onPress={()=>{
                            /*this.props.navigation.navigate('MyPill')*/
                            this.props.navigation.navigate('Login')
                        }}>
                        
                        <Text style={styles.MyPillButtonText}>내약통</Text>
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
        width: 287,
        // height: 78,
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
        // width: 314,
        // height: 294,
        // // opacity: 0.14,
        // borderRadius: 27,
        // backgroundColor: 'black',  //ffffff
        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: '#cccccc'
        
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
       
    MyPillButtonView : {
        flex : 2,
        alignItems: 'center',
        justifyContent : 'center',
        
    },
    MyPillButton : {
        width: 322,
        height: 97.9,
        backgroundColor: '#f0f2f0',
        alignItems: 'center',
        justifyContent : 'center',
        borderRadius: 20,
    },
    MyPillButtonText : {
        width: 67,
        height: 29,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.48,
        textAlign: 'left',
        color: '#404040'
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
    }
});

export default MainScreen;
