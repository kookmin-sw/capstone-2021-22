import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import * as config from '../src/config';

import logo from '../src/icon/pills-bottle.png';

import { PillList } from '../component/PillList';


export function MyPillScreen() {

    const navigation = useNavigation();

    const temp = [];
    const [pillList, setPillList] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        AsyncStorage.getItem('token', (err, token) => {
            config.IS_LOGIN = true;
            fetch("http://3.34.96.230/favorite/my", {
                method : "GET",
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}`
                },
            }).then(res => res.json())
            .then(response => {
                setUserName(response[response.length-1]);
                for(let i=0; i<response.length-1; i++) {
                    temp.push(response[i]);
                }
                setPillList(temp);
            })
            .catch(error => console.error('Error:', error));
            
        });
    }, []);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.titleView}>
                <View style={styles.titleContainer}>
                    <Image
                        style={styles.logoImage}
                        source={logo}
                    />
                    <Text style={styles.titleText}>{userName}님의 약통</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>{
                        Alert.alert(
                            "로그아웃 하시겠습니까?",  
                            "" ,
                            [
                                {
                                text: "네", 
                                onPress: () => {
                                    console.log("로그아웃 한대!");
                                    AsyncStorage.clear();
                                    navigation.reset({
                                        index: 0,
                                        routes: [{name: 'Main'}]
                                    })
                                },
                                },
                                { 
                                text: "아니요", 
                                onPress: () => 
                                    console.log("로그아웃 안한대!") 
                                },
                            ]
                            )
                    }}>
                    <Text style={{fontSize: 15}}>로그아웃</Text>
                </TouchableOpacity>
            </View>

            <View>
                {pillList.map((pill,index) => ( 
                    <PillList key={index} data={pillList} imgUrl={pill.image} name={pill.name} className={pill.class} codeName={pill.shape} id={pill.id}/>
                ))}
                {/* <TouchableOpacity 
                    style={styles.pillContainer}
                    onPress={()=>{
                        this.props.navigation.navigate('MyPillDetail')
                    }}>
                    <Image style={styles.pillImage} source={testImage}/>
                    <View style={styles.textContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.mainText}>진셀몬정</Text> 
                            <TouchableOpacity>
                                <Image
                                style={styles.icon}
                                source={star}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.subText}>혼합비타민제</Text>
                        <Text style={styles.subText}>필름코팅정</Text>
                    </View>
                </TouchableOpacity> */}
                <View style= {styles.hr} />            
            </View>
        
        </ScrollView>
             
            
    )
    
}

const styles = StyleSheet.create({
    scrollView : {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleView : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding : 20,
    },
    titleContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        // padding : 20,
    },
    logoImage : {
        width: 30,
        height: 30,
        marginRight : 10
    },
    icon : {
        width: 23,
        height: 23,
        marginTop : 10, 
    },
    titleText : {
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.4,
        textAlign: 'left',
        color: '#404040'
    },
    pillContainer : {
        height: 125,
        flexDirection: 'row',
    },
    hr : {
        borderBottomWidth: 1, 
        borderBottomColor: '#D5D5D5',
    },
    pillImage : { 
        flex: 1,
        width: 157,
        height: 125,
    },
    textContainer : {
        flex: 1,

    },
    mainText : {
        marginTop : 10, 
        marginBottom : 5, 
        marginLeft : 15,

        width: 145,
        height: 50,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 23,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#000000',
        
    },
    subText : {
        marginLeft : 15,
        marginTop: 5,
        width: 192,
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

export default MyPillScreen;
