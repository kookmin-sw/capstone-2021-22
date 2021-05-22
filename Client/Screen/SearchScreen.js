import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { PillList } from '../component/PillList';

export function SearchScreen() {
    
    const [keyword, setKeyword] = useState('');
    const [pillList, setPillList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(false);

    
    async function search() {
        setFlag(false);
        setPillList([]);
        setLoading(true);
        AsyncStorage.getItem('token', (err, token) => {
                fetch("http://3.34.96.230/search/?pillName=" + keyword, {
                    method : "GET",
                    headers : {
                        Authorization : `Bearer ${token}`
                    },
                }).then(res => res.json())
                .then(response => {
                    // console.log(response)
                    setFlag(true);
                    setPillList(response);
                    setLoading(false);
                })
                .catch(error => console.error('Error:', error));
            
        })
    }
    
    function showResult() {
        // console.log(pillList)
        if (pillList.length === 0 && flag) {
            return(
                <Text style={styles.text}>검색결과가 없습니다.</Text>
            )
        } else {
            // console.log(pillList)
            return (
                pillList.map((pill,index) => ( 
                    <PillList key={index} data={pillList} imgUrl={pill.image} name={pill.name} className={pill.class} codeName={pill.shape} id={pill.id}/>
                ))
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <TextInput
                placeholder='알약 이름을 입력하세요'
                placeholderTextColor = '#cccccc'
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.textinput}
                onChangeText={(text) => {setKeyword(text);}}
                />
                <TouchableOpacity style={{width: 30, height: 45, justifyContent: 'center'}}
                onPress={() => search()}>
                    <Image 
                    source={require('../src/icon/search.png')}
                    />
                </TouchableOpacity>
            </View>
            <ActivityIndicator animating={loading} style={styles.loadingStyle} size="large" color="#c86e65"/>
            <ScrollView style={styles.scrollView}>
                {showResult()}
            </ScrollView>
        </View>
            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
    },
    inputBox: {
        marginTop: 15,
        marginBottom: 2,
        width: '95%',
        height: 45,
        // padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#d8d8d8'
    },
    scrollView: {
        width: '95%',
        height: '100%'
    },
    textinput: {
        fontSize: 18,
        color: '#3c3c3c',
        margin: 10,
        width: 300
    },
    text: {
        fontSize: 18,
        marginTop: 20,
        marginLeft: 10,
        color: '#3c3c3c'
    },
    loadingStyle: {
        position: 'absolute',
        margin: 200,
    }
});

export default SearchScreen;