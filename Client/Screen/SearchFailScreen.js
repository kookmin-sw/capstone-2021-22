import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class SearchFailScreen extends Component {
    render(){
        return (
            <View style={styles.MainView}>              
                <Text style={styles.mainText}>알약을 찾지 못했습니다.</Text>
                <Text style={styles.subText}>알약의 <Text style={styles.highlight}>모양</Text>과 <Text style={styles.highlight}>식별문구</Text>가 잘 나오게 찍어주세요.</Text>

                    <TouchableOpacity 
                        style={styles.mainButton}
                        onPress={()=>{
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{name: "PhotoGuide"}]
                            })
                    }}>
                        <Text style={styles.mainButtonText}>다시 촬영하기</Text>
                    </TouchableOpacity>
                    <View style={styles.ButtonView}>

                    <TouchableOpacity 
                        style={styles.subButton}
                        onPress={()=>{
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{name: "Search"}]
                            })
                    }}>
                        <Text style={styles.subButtonText}>직접 검색하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.subButton}
                        onPress={()=>{
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{name: "Main"}]
                            })
                    }}>
                        <Text style={styles.subButtonText}>홈으로 돌아가기</Text>
                    </TouchableOpacity>
                </View>

            </View>
                
            
        )
    }
    
}

const styles = StyleSheet.create({
    MainView : {
        flex : 1,
        backgroundColor : 'white',
        alignItems: 'center',
        justifyContent : 'center',
    },
    mainText : {
        width: 246,
        height: 31,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 26,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#333333",
    },
    subText : {
        width: 220,
        height: 54,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 22,
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#333333",
        margin: 20,
    },
    highlight: {
        width: 220,
        height: 54,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 22,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#333333"
    },
    ButtonView : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'center',
        margin : 10,
    },
    mainButton : {
        alignItems: "center",
        justifyContent : "center",
        width: 312,
        height: 43,
        borderRadius: 22,
        backgroundColor: "#c86e65"
    },
    mainButtonText : {
        width: 96,
        height: 21,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 18,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: -0.36,
        textAlign: "center",
        color: "#ffffff"

    },
    subButton : {
        margin : 5,
        alignItems: "center",
        justifyContent : "center",
        width: 153,
        height: 43,
        borderRadius: 22,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#c86e65"
    },
    subButtonText : {
        height: 21,
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 18,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: -0.36,
        textAlign: "center",
        color: "#c86e65"

    },

});

export default SearchFailScreen;
