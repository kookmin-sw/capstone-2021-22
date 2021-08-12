import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { PillList } from '../component/PillList';

export function PhotoSearchScreen({route, navigation} = this.props){

    const {pillList} = route.params;

    // 사진으로 촬영한 검색 결과 보여주는 스크린
    return(
        <View style={styles.view}>
            <TouchableOpacity style={styles.button} onPress={()=>{
                navigation.reset({
                    index: 0,
                    routes: [{name: 'PhotoGuide'}]
                })
            }}>
                <Text style={styles.text}>찾으시는 알약이 없다면, <Text style={styles.highlight}>다시 촬영하기{' >'}</Text></Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollView}>
                {pillList.map((pill,index) => ( 
                    <PillList key={index} data={pillList} imgUrl={pill.image} name={pill.name} className={pill.class} codeName={pill.shape} id={pill.id} favorite={pill.isFavorite}/>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    text: {
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 14,
        fontWeight: "200",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#707070"
    },
    highlight: {
        // fontFamily: "AppleSDGothicNeo",
        fontSize: 14,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#707070"
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: "center",
        justifyContent : "center",
        height: 30,
        borderRadius: 32,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#d8d8d8",
        marginTop: 20,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    scrollView: {
        width: '95%',
        height: '100%'
    },
})

export default PhotoSearchScreen;