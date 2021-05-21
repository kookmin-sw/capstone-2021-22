import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Buffer } from 'buffer'

import { PillDetail } from '../component/PillDetail';

export function PillDetailScreen({route, navigation} = this.props) {

    const {id} = route.params;
    const [pillDetail, setPillDetail] = useState([]);

    arrayBufferToBase64 = buffer => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return Buffer.from(binary, 'binary').toString('base64');
    };

    useEffect(() => {
        console.log(id)
        fetch("http://3.34.96.230/pillDetail", {
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                "pillId" : id
            })
        }).then(res => res.json())
        .then(response => {
            response.image = 'data:image/png;base64,' + arrayBufferToBase64(response.image.data)
            setPillDetail(response)
        })
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <ScrollView style={styles.scrollView}>
            <PillDetail imgUrl={pillDetail.image} name={pillDetail.name} company={pillDetail.company} className={pillDetail.class} codeName={pillDetail.shape} />
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

export default PillDetailScreen;
