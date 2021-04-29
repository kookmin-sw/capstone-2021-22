import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';

import icon from '../src/icon/star.png';

export function PillDetail(props) {

        return(
            <View>
                <Image source={{uri:props.imgUrl}} style={styles.image}/>
                <View style={styles.mainContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>알약 이름</Text>
                        <TouchableOpacity>
                            <Image
                            style={styles.icon}
                            source={icon}
                            />
                        </TouchableOpacity>
                    </View>      

                    <View style= {styles.hr} />            
                    <View style={styles.textContainer}>
                        <View style={styles.key}>
                            <Text style={styles.keyText}>제조수입사</Text>
                            <Text style={styles.keyText}>분류명</Text>
                            <Text style={styles.keyText}>제형코드명</Text>
                        </View>
                        <View style={styles.value}>
                            <Text style={styles.valueText}>제조수입사</Text>
                            <Text style={styles.valueText}>분류명</Text>
                            <Text style={styles.valueText}>제형코드명</Text>
                        </View>
                    </View>
                    <View style= {styles.hr} />            
                </View>

                <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  효능 효과</Text>
                        <Text style={styles.sectionDescription}>이 약은 이런 효과가 있습니다</Text>       
                        <View style= {styles.hr} />                
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  용법 용량</Text>
                        <Text style={styles.sectionDescription}>이 약은 이런 효과가 있습니다</Text>       
                        <View style= {styles.hr} />                
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  주의사항</Text>
                        <Text style={styles.sectionDescription}>이 약은 이런 효과가 있습니다</Text>       
                        <View style= {styles.hr} />                
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  복약정보</Text>
                        <Text style={styles.sectionDescription}>이 약은 이런 효과가 있습니다</Text>       
                        <View style= {styles.hr} />                
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>■  제조수입사</Text>
                        <Text style={styles.sectionDescription}>이 약은 이런 효과가 있습니다</Text>       
                        <View style= {styles.hr} />                
                    </View>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    scrollView : {
        backgroundColor: '#f0f2f0',  //f0f2f0
        
    },
    mainContainer : {
        backgroundColor: '#ffff',
        padding: 35, 

    },
    titleContainer : {
        flexDirection: 'row',

    },
    textContainer : {
        flexDirection: 'row',
    },
    image : {
        alignItems: 'center',
        justifyContent : 'center',
        width: '100%',
        height: 250,
    },
    icon : {
        width: 30,
        height: 30,

    },
    titleText : {
        flex: 1,
        width: 92,
        height: 31,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 25,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: -0.25,
        textAlign: 'left',
        color: '#000000',
        marginLeft : 20
    },
    keyText : {
        height: 21,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 18,
        fontWeight: '100',
        fontStyle: 'normal',
        letterSpacing: -0.18,
        textAlign: 'left',
        color: '#3b3b3b',
        margin : 6,
        marginLeft : 20
    },
    valueText : {
        height: 21,
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 18,
        fontWeight: '300',
        fontStyle: 'normal',
        letterSpacing: -0.18,
        textAlign: 'left',
        color: '#000000',
        margin : 6,
        marginLeft : 20
    },
    hr : {
        borderBottomWidth: 1, 
        borderBottomColor: '#D5D5D5',
        marginTop: 14.5,
        marginBottom: 14.5,
    },
    body: {
        marginTop : 20,
        paddingTop : 22,
        backgroundColor: 'white',
    },
    sectionContainer: {
        paddingHorizontal: 35,
    },
    sectionTitle : {
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.33,
        textAlign: 'left',
        color: '#000000',
        marginTop : 10,
    },
    sectionDescription : {
        // fontFamily: 'AppleSDGothicNeo',
        fontSize: 18,
        fontWeight: '200',
        fontStyle: 'normal',
        letterSpacing: -0.27,
        textAlign: 'left',
        color: '#000000',
        marginTop : 20,
        marginBottom : 20
    }
});