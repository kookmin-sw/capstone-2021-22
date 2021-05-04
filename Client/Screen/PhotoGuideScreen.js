import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import guide from './images/guide.png';

class PhotoGuideScreen extends Component {
    
    render () { 

        return (
            <View style={styles.MainView}>
                <Image
                    style={styles.image}
                    source={guide}
                />                
                <View style={styles.ButtonView}>
                    <TouchableOpacity 
                        style={styles.Button}
                        onPress={()=>{
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{name: "Photo"}]
                            })
                    }}>
                        <Text style={styles.ButtonText}>촬영하기</Text>
                    </TouchableOpacity>
                </View>

            </View>
             
            
        )
    }
}

const styles = StyleSheet.create({
    MainView : {
        flex : 1,
        backgroundColor : 'white'
    },
    image : {
        flex : 1,
        width: "100%",
        alignItems: 'center',
        justifyContent : 'center',
        padding : 50
    },
    ButtonView : {
        alignItems: 'center',
        justifyContent : 'center',
        padding : 50
        
    },
    Button : {
        alignItems: 'center',
        justifyContent : 'center',
        width: 193,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#c86e65"
    },
    ButtonText : {
        width: 82,
        height: 29,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 24,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: -0.48,
        textAlign: "center",
        color: "#c86e65"

    },

});

export default PhotoGuideScreen;
