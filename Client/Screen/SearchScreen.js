import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import testData from '../src/testdata';

import { PillList } from '../component/PillList';
import { CommonActions } from '@react-navigation/native';


export function SearchScreen() {
    
    const [value, onChangeText] = useState('');
    const [pillList, setPillList] = useState([]);

    changeSearchData = (text) => {
        this.setState({ searchData : text });
    };

    search = (data, value) => {
        setPillList(data.filter((element) => element.ITEM_NAME.includes(value)));
        // console.log(pillList)
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <TextInput
                placeholder='알약 이름을 입력하세요'
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.textinput}
                onChangeText={(text) => onChangeText(text)}
                />
                <TouchableOpacity 
                onPress={async()=>{
                    if (value == "") {
                        setPillList([])
                    } else {
                        search(testData, value)
                        console.log(pillList)
                    }
                }}>
                    <Image
                    source={require('../src/icon/search.png')}

                    />
                </TouchableOpacity>
            </View>
            {pillList.length == 0 &&
                <Text style={styles.text}>검색결과가 없습니다.</Text>
            }
            {pillList.map((pill,index) => ( 
                <PillList key={index} data={pillList} imgUrl= {pill.IMAGE_URL} name = {pill.ITEM_NAME} className = {pill.CLASS_NAME} codeName = {pill.FORM_CODE_NAME} />
            ))}
        </View>
            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    inputBox: {
        marginTop: 15,
        width: '90%',
        height: 45,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#d8d8d8'
    },
    textinput: {
        fontSize: 18,
        color: '#3c3c3c'
    },
    text: {
        fontSize: 22,
        width: '90%',
        marginTop: 20,
        marginLeft: 20,
        color: '#3c3c3c'
    }
});

export default SearchScreen;