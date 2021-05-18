import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import { PillDetail } from '../component/PillDetail';
import { withTheme } from 'react-native-elements';

export function MyPillDetailScreen() {

    return (
        <ScrollView style={styles.scrollView}>
            <PillDetail imgUrl={'../screen/images/test.jpg'}/>
            <Text style={styles.text}>제공되는 알약의 모든 정보는 의약품 안전나라에 있습니다.</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView : {
        backgroundColor: '#f0f2f0',
    },
    text : {
        margin: 10,
        textAlign: 'center'
    }
});

export default MyPillDetailScreen;
