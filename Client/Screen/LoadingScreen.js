import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export function LoadingScreen({route, navigation} = this.props){

    const {formData} = route.params;
    const fadeAnim1 = useRef(new Animated.Value(0)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;

    // 알약 검색 중 애니메이션 효과
    // formData 형식의 사진 서버에 업로드 후 검색 결과 응답 -> 검색 결과 PhotoSearchScreen으로 전송
    useEffect(() => {
        Animated.timing(fadeAnim1, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 50000,
            useNativeDriver: true,
        }).start();
        AsyncStorage.getItem('token', (err, token) => {
            if (token !== null) {
                fetch("http://3.34.96.230/imageSearch/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization : `Bearer ${token}`
                    },
                    body: formData,
                })
                .then((res) => res.json())
                .then((response) => {
                    console.log('response',response);
                    if (response.length === 0) {
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'SearchFail'}]
                        })
                    } else {
                        navigation.navigate('PhotoSearch', {pillList: response})
                    }
                })
                .catch((error) => {
                    console.log('error',error);
                });
            } else {
                fetch("http://3.34.96.230/imageSearch/unLogged", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    if (response.length === 0) {
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'SearchFail'}]
                        })
                    } else {
                        navigation.navigate('PhotoSearch', {pillList: response})
                    }
                })
                .catch((error) => {
                    console.log('error',error);
                });
            }
        });
    })

    return(
        <View style={styles.view}>
            <ActivityIndicator animating={true} style={styles.loadingStyle} size="large" color="#c86e65"/>
            <Animated.View
                style={[styles.fadingContainer, { opacity: fadeAnim1 }]}
            >
                <Text style={styles.text}>
                    배경 제거 중
                </Text>
            </Animated.View>
            <Animated.View
                style={[styles.fadingContainer, { opacity: fadeAnim2 }]}
            >
                <Text style={styles.text}>
                    알약 검색 중
                </Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        margin: 10
    }
})

export default LoadingScreen;