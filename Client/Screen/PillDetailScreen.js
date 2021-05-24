import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { PillDetail } from '../component/PillDetail';
import * as config from '../src/config';

export function PillDetailScreen({route, navigation} = this.props) {

    const {id} = route.params;
    const [pillInfo, setPillInfo] = useState([]);
    const [pillDetail, setPillDtail] = useState([]);
    const [flag, setFlag] = useState(true)

    // 알약 기본 정보 요청, 응답 : 토큰 유무 확인 -> 토큰 있으면 즐겨찾기 상태 포함한 응답, 없으면 즐겨찾기 상태 false인 응답
    useEffect(() => {
        AsyncStorage.getItem('token', (err, token) => {
            if (token !== null) {
                fetch("http://3.34.96.230/pillDetail", {
                    method : "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization : `Bearer ${token}`
                    },
                    body : JSON.stringify({
                        "pillId" : id
                    })
                }).then(res => res.json())
                .then(response => {
                    response.image = 'data:image/png;base64,' + config.arrayBufferToBase64(response.image.data)
                    setPillInfo(response)
                })
                .catch(error => console.error('Error:', error));
            } else {
                fetch("http://3.34.96.230/pillDetail/unLogged", {
                    method : "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify({
                        "pillId" : id
                    })
                }).then(res => res.json())
                .then(response => {
                    response.image = 'data:image/png;base64,' + config.arrayBufferToBase64(response.image.data)
                    setPillInfo(response)
                })
                .catch(error => console.error('Error:', error));
            }
        })

        // 알약 상세정보 요청, 응답
        fetch("http://3.34.96.230/pillDetail/code", {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    "pillId" : id
                })
            }).then(res => res.json())
            .then(response => {
                if (Object.keys(response.response.body.items).length === 0){
                    console.log("yes")
                    setFlag(false)
                } else {
                    arr = {}
                    arr.efcy = response.response.body.items.item.efcyQesitm._text;
                    arr.useMethod = response.response.body.items.item.useMethodQesitm._text;
                    arr.atpnWarn = response.response.body.items.item.atpnWarnQesitm._text;
                    arr.atpn = response.response.body.items.item.atpnQesitm._text;
                    arr.intrc = response.response.body.items.item.intrcQesitm._text;
                    arr.se = response.response.body.items.item.seQesitm._text;
                    arr.depositMethod = response.response.body.items.item.depositMethodQesitm._text;
                    setPillDtail(arr)
                }
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <ScrollView style={styles.scrollView}>
            <PillDetail imgUrl={pillInfo.image} name={pillInfo.name} company={pillInfo.company} className={pillInfo.class} codeName={pillInfo.shape} id={pillInfo.id} favorite={pillInfo.isFavorite}
            flag={flag} efcy={pillDetail.efcy} useMethod={pillDetail.useMethod} atpnWarn={pillDetail.atpnWarn} atpn={pillDetail.atpn} intrc={pillDetail.intrc} se={pillDetail.se} depositMethod={pillDetail.depositMethod}
            />
            <Text style={styles.text}>제공되는 알약의 모든 정보는 의약품 안전나라에 있습니다.</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView : {
        backgroundColor: '#f0f2f0',
    },
    text : {
        textAlign: 'center',
        backgroundColor: '#fff',
        height: 30
    }
});

export default PillDetailScreen;
