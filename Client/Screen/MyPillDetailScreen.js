import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import testData from '../src/testdata';

import icon from './images/star.png';
import { PillDetail } from '../component/PillDetail';

export function MyPillDetailScreen() {

    return (
        <ScrollView style={styles.scrollView}>
            <PillDetail imgUrl={'../screen/images/test.jpg'}/>
        </ScrollView>  
    )
}

const styles = StyleSheet.create({
    scrollView : {
        backgroundColor: '#f0f2f0',  //f0f2f0
        
    },
    mainContainer : {
        backgroundColor: '#ffff',
        padding: 35, 

    },
    titleContainer : {
        flexDirection: 'row',

    },
    textContainer : {
        flexDirection: 'row',
    },
    image : {
        alignItems: 'center',
        justifyContent : 'center',
        width: '100%',
        height: 250,
    },
    icon : {
        width: 30,
        height: 30,

    },
    titleText : {
        flex: 1,
        width: 92,
        height: 31,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 25,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: -0.25,
        textAlign: 'left',
        color: '#000000',
        marginLeft : 20
    },
    keyText : {
        height: 21,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 18,
        fontWeight: '100',
        fontStyle: 'normal',
        letterSpacing: -0.18,
        textAlign: 'left',
        color: '#3b3b3b',
        margin : 6,
        marginLeft : 20
    },
    valueText : {
        height: 21,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 18,
        fontWeight: '300',
        fontStyle: 'normal',
        letterSpacing: -0.18,
        textAlign: 'left',
        color: '#000000',
        margin : 6,
        marginLeft : 20
    },
    hr : {
        borderBottomWidth: 1, 
        borderBottomColor: '#D5D5D5',
        marginTop: 14.5,
        marginBottom: 14.5,
    },
    body: {
        marginTop : 20,
        paddingTop : 22,
        backgroundColor: 'white',
    },
    sectionContainer: {
        paddingHorizontal: 35,
    },
    sectionTitle : {
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.33,
        textAlign: 'left',
        color: '#000000',
        marginTop : 10,
    },
    sectionDescription : {
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 18,
        fontWeight: '200',
        fontStyle: 'normal',
        letterSpacing: -0.27,
        textAlign: 'left',
        color: '#000000',
        marginTop : 20,
        marginBottom : 20
    }
});

export default MyPillDetailScreen;
