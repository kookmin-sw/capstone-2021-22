import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';

import icon from '../src/icon/star.png';

export function PillList(props) {
    const navigation = useNavigation();

        return(
            <View>
                <TouchableOpacity 
                    style={styles.PillContainer}
                    onPress={()=>{
                        navigation.navigate('MyPillDetail')
                    }}>
                    <Image source={{uri:props.imgUrl}} style={styles.imageStyle}
                    />
                    <View  style={{width: 170}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
        height: 125,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    hr : {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5',
    },
    imageStyle: {
        width: 200, 
        height: 110,
    },
    icon : {
        width: 22,
        height: 22,
    },
    MainText : {
        marginBottom : 5, 
        marginLeft : 15,
        width: 120,
        height: 52,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 23,
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
        height: 17,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 16,
        fontWeight: '300',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#585858'
    }
});