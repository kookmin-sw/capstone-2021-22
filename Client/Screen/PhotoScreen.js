import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';


class PhotoScreen extends Component {
    
    render () { 

        return (
            <View style={styles.MainView}>
                <Text>카메라 화면</Text>
            </View>
             
            
        )
    }
}

const styles = StyleSheet.create({
    MainView : {
        flex : 1,
        backgroundColor : 'white'
    },
});

export default PhotoScreen;
