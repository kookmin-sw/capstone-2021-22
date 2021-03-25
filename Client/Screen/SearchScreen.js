import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';

class SearchScreen extends Component {
    state = {
        searchData: '',
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
                        this.props.navigation.navigate('SearchResult')
                    }}>
                        <Image
                        source={require('../src/icon/search.png')}
                        />
                    </TouchableOpacity>
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
    }
});

export default SearchScreen;