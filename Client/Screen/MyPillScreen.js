import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import logo from './images/pills-bottle.png';

import testImage from './images/test.jpg';


class MyPillScreen extends Component {

    state = {
        userData :
            {
                name : "지원",
            }
        ,
        pillData :
            {
              ITEM_NAME : '진셀몬정',
              CLASS_NAME :"혼합비타민제",
              FORM_CODE_NAME :"필름코팅정",
              ITEM_IMAGE :"image"
            }
          
    };
    

    render () {

        return (
            <ScrollView style={styles.MainView}>
                <View style={styles.TitleContainer}>
                    <Image
                        style={styles.LogoImage}
                        source={logo}
                    />
                    <Text style={styles.TitleText}>{JSON.stringify(this.state.userData.name)}님의 약통</Text>
                </View>

                <View style={styles.PillList}>
                    <TouchableOpacity 
                        style={styles.PillContainer}
                        onPress={()=>{
                            this.props.navigation.navigate('MyPillDetail')
                        }}>
                        <Image style={styles.PillImage} source={testImage}/>
                        <View style={styles.TextContainer}>
                                <Text style={styles.MainText}>{JSON.stringify(this.state.pillData.ITEM_NAME)}</Text> 
                                <Text style={styles.SubText}>{JSON.stringify(this.state.pillData.CLASS_NAME)}</Text>
                                <Text style={styles.SubText}>{JSON.stringify(this.state.pillData.FORM_CODE_NAME)}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style= {styles.hr} />            
                </View>
            
            </ScrollView>
             
            
        )
    }
}

const styles = StyleSheet.create({
    MainView : {
        flex: 1,
        backgroundColor: '#fff',
    },
    TitleContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        padding : 20
    },
    LogoImage : {
        width: 30,
        height: 30,
        marginRight : 10
    },
    TitleText : {
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: -0.4,
        textAlign: "left",
        color: "#404040"
    },
    PillList : {

    },
    PillContainer : {
        height: 125,
        flexDirection: 'row',


    },
    hr : {
        borderBottomWidth: 1, 
        borderBottomColor: '#D5D5D5',
    },

    PillImage : { 
        flex: 1,
        width: 157,
        height: 125,
    },
    TextContainer : {
        flex: 1,

    },
    MainText : {
        marginTop : 10, 
        marginBottom : 5, 
        marginLeft : 15,

        width: 145,
        height: 50,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 23,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000",
        
    },
    SubText : {
        marginLeft : 15,
        marginTop: 5,
        width: 192,
        height: 17,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 16,
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#585858"
    }

});

export default MyPillScreen;
