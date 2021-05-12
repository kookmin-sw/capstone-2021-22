import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Buffer } from 'buffer'


import icon from '../src/icon/star.png';

export function PillList(props) {
    const navigation = useNavigation();

    arrayBufferToBase64 = buffer => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return Buffer.from(binary, 'binary').toString('base64');
    };

    function showImage() {
        return(
            <Image source={{
                uri:
                  'data:image/jpeg;base64,' +
                  arrayBufferToBase64(props.imgUrl.data),
              }} style={styles.imageStyle} resizeMode="contain"
            />
        )
    }

    return(
        <View>
            <TouchableOpacity 
                style={styles.PillContainer}
                onPress={()=>{
                    navigation.navigate('MyPillDetail')
                }}>
                {showImage()}
                <View style={{width: '50%'}}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.MainText} numberOfLines={2} ellipsizeMode="tail">{props.name}</Text>
                        <TouchableOpacity>
                            <Image
                            style={styles.icon}
                            source={icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.SubText}>{props.className}</Text>
                    <Text style={styles.SubText}>{props.codeName}</Text>
                </View>
            </TouchableOpacity>
            <View style= {styles.hr}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    PillContainer : {
        width: '95%',
        height: 125,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        marginBottom: 2
    },
    hr : {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5',
    },
    nameContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageStyle: {
        width: '55%', 
        height: '90%',
    },
    icon : {
        width: 20,
        height: 20,
    },
    MainText : {
        marginBottom : 5, 
        marginLeft : 15,
        width: '70%',
        height: 52,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 21,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#000000',
    },
    SubText : {
        marginLeft : 15,
        marginTop: 5,
        width: 150,
        height: 16,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 15,
        fontWeight: '300',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#585858'
    }
});