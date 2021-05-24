import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { PillList } from '../component/PillList';

export function SearchScreen() {
    
    const [keyword, setKeyword] = useState('');
    const [pillList, setPillList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(false);

    // 이름으로 검색 스크린
    // 토큰 유무 확인 -> 입력된 검색어와 토큰을 담아 서버에 요청 -> 검색된 알약 리스트 응답
    async function search() {
        setFlag(false);
        setPillList([]);
        setLoading(true);
        AsyncStorage.getItem('token', (err, token) => {
            if (token !== null) {
                fetch("http://3.34.96.230/search/?pillName=" + keyword, {
                    method : "GET",
                    headers : {
                        'Content-Type' : 'application/json',
                        Authorization : `Bearer ${token}`
                    },
                }).then(res => res.json())
                .then(response => {
                    setFlag(true);
                    setPillList(response);
                    setLoading(false);
                })
                .catch(error => console.error('Error:', error));
            } else {
                fetch("http://3.34.96.230/search/unLogged/?pillName=" + keyword, {
                    method : "GET",
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                }).then(res => res.json())
                .then(response => {
                    console.log(response)
                    setFlag(true);
                    setPillList(response);
                    setLoading(false);
                })
                .catch(error => console.error('Error:', error));
            }
        })
    }
    
    // 검색 결과가 없으면 "검색 결과가 없습니다." 문구 렌더링, 있으면 검색 결과 리스트 렌더링
    function showResult() {
        if (pillList.length === 0 && flag) {
            return(
                <Text style={styles.text}>검색결과가 없습니다.</Text>
            )
        } else {
            return (
                pillList.map((pill,index) => ( 
                    <PillList key={index} data={pillList} imgUrl={pill.image} name={pill.name} className={pill.class} codeName={pill.shape} id={pill.id} favorite={pill.isFavorite}/>
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