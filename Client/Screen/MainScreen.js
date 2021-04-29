import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import  logo  from './images/pill.png';
import  MyPillLogo  from './images/pills-bottle.png';
import { Button } from 'react-native-elements/dist/buttons/Button';


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
                                this.props.navigation.navigate('PhotoGuide')
                            }}>
                            <Text style={styles.MainButtonText}>알약 사진 찍기</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.SearchButtonView}>
                    <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.reset({
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
                            /*this.props.navigation.navigate('MyPill')*/
                            this.props.navigation.navigate('Login')
                        }}>
                        <View style={styles.MyPillLogoView}>
                            <Image style={styles.MyPillLogoImage}
                                source={MyPillLogo}/>
                        </View>
                        <Text style={styles.MyPillButtonText}>내 약통</Text>
                        <Text style={styles.MyPillNumText}>></Text>
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
    searchText: {
        marginTop: 15,
        fontSize: 16,
        color: '#525252'
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
        fontSize: 24,
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
        fontSize: 20,
        fontWeight: "100",
        fontStyle: "normal",
        letterSpacing: -0.4,
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
