import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import testData from '../src/testdata';

class SearchResultScreen extends Component {
    state = {
        searchData: "",
        pillData :
            {
              ITEM_NAME : '진셀몬정',
              CLASS_NAME :"혼합비타민제",
              FORM_CODE_NAME :"필름코팅정",
              ITEM_IMAGE :"https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147427430091800120"
            }
    };

    changeSearchData = (text) => {
        this.setState({ searchData : text });
      };

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <TextInput
                    placeholder='알약 이름을 입력하세요'
                    style={styles.textinput}
                    onChangeText={this.changeSearchData}
                    value={this.state.searchData}
                    />
                    <TouchableOpacity 
                    onPress={()=>{
                        this.props.navigation.navigate('MyPillDetail')
                    }}>
                        <Image
                        source={require('../src/icon/search.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.PillList}>
                    <TouchableOpacity 
                        style={styles.PillContainer}
                        onPress={()=>{
                            this.props.navigation.navigate('MyPillDetail')
                        }}>
                        <Image style={styles.PillImage} source={{uri : "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147427430091800120"}} style={{width: 200, height: 125}}/>
                        <View style={styles.TextContainer}>
                                <Text style={styles.MainText}>{JSON.stringify(testData[0].ITEM_NAME)}</Text> 
                                <Text style={styles.SubText}>{JSON.stringify(testData[0].CLASS_NAME)}</Text>
                                <Text style={styles.SubText}>{JSON.stringify(testData[0].FORM_CODE_NAME)}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style= {styles.hr} />
                </View>
            </View>
             
            
        )
    }
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
    },
    PillContainer : {
        height: 125,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10
    },
    hr : {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5',
    },
    PillList : {
        width: '100%'
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

export default SearchResultScreen;