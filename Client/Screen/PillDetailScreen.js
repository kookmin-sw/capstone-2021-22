import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { PillDetail } from '../component/PillDetail';
import * as config from '../src/config';

export function PillDetailScreen({route, navigation} = this.props) {

    const {id} = route.params;
    const [pillInfo, setPillInfo] = useState([]);

    const [flag, setFlag] = useState(true)
    const [efcyQesitm, setefcy] = useState("");
    const [useMethodQesitm, setuseMethodQesitm] = useState("");
    const [atpnWarn, setatpnWarn] = useState("");
    const [atpn, setatpn] = useState("");
    const [depositMethod, setdepositMethod] = useState("");
    const [intrc, setintrc] = useState("");
    const [se, setse] = useState("");

    useEffect(() => {
        AsyncStorage.getItem('token', (err, token) => {
            if (token !== null) {
                // console.log(id)
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
                    console.log(response)
                    console.log("length", Object.keys(response.response.body.items).length)
                    if (Object.keys(response.response.body.items).length === 0){
                        console.log("yes")
                        setFlag(false)
                    } else {
                        const efcy = response.response.body.items.item.efcyQesitm._text;
                        const useMethod = response.response.body.items.item.useMethodQesitm._text;
                        const atpnWarn = response.response.body.items.item.atpnWarnQesitm._text;
                        const atpn = response.response.body.items.item.atpnQesitm._text;
                        const intrc = response.response.body.items.item.intrcQesitm._text;
                        const se = response.response.body.items.item.seQesitm._text;
                        const depositMethod = response.response.body.items.item.depositMethodQesitm._text;
                        setefcy(efcy);
                        setuseMethodQesitm(useMethod);
                        setatpnWarn(atpnWarn);
                        setatpn(atpn);
                        setdepositMethod(depositMethod);
                        setintrc(intrc);
                        setse(se);
                    }
                })
                .catch(error => console.error('Error:', error));
    }, []);

    return (
        <ScrollView style={styles.scrollView}>
            <PillDetail imgUrl={pillInfo.image} name={pillInfo.name} company={pillInfo.company} className={pillInfo.class} codeName={pillInfo.shape} id={pillInfo.id} star={pillInfo.isFavorite}
            flag={flag} efcy={efcyQesitm} useMethod={useMethodQesitm} atpnWarn={atpnWarn} atpn={atpn} intrc={intrc} depositMethod={depositMethod} se={se}
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
