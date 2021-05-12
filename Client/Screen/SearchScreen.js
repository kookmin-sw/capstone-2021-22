import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import { PillList } from '../component/PillList';

export function SearchScreen() {
    
    const [keyword, setKeyword] = useState('');
    const [pillList, setPillList] = useState([]);
    const [flag, setFlag] = useState(false);

    async function search() {
        fetch("http://3.34.96.230/search/?pillName=" + keyword, {
            method : "GET",
        }).then(res => res.json())
        .then(response => {
            // console.log(response)
            setFlag(true)
            setPillList(response)
            
        })
        .catch(error => console.error('Error:', error));
    }
    
    function showResult() {
        // console.log(pillList)
        if (pillList.length === 0 && flag) {
            return(
                <Text style={styles.text}>검색결과가 없습니다.</Text>
            )
        } else {
            return (
                pillList.map((pill,index) => ( 
                    <PillList key={index} data={pillList} imgUrl={pill.image} name={pill.name} className={pill.class} codeName={pill.shape} />
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
                <TouchableOpacity 
                onPress={() => search()}>
                    <Image
                    source={require('../src/icon/search.png')}
                    />
                </TouchableOpacity>
            </View>
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
        width: '100%'
    },
    inputBox: {
        marginTop: 15,
        marginBottom: 2,
        width: '95%',
        height: 45,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#d8d8d8'
    },
    scrollView: {
        width: '95%'
    },
    textinput: {
        fontSize: 18,
        color: '#3c3c3c'
    },
    text: {
        fontSize: 18,
        marginTop: 20,
        marginLeft: 10,
        color: '#3c3c3c'
    }
});

export default SearchScreen;