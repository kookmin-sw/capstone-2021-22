import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';

import testData from '../src/testdata';

import { PillList } from '../component/PillList';

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
                autoCorrect='false'
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
            <View>
                {pillList.map((pill,index) => ( <PillList data={pillList} imgUrl= {pill.IMAGE_URL} name = {pill.ITEM_NAME} className = {pill.CLASS_NAME} codeName = {pill.FORM_CODE_NAME} />))}
            </View>
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
        color: '#707070'
    }
});

export default SearchScreen;