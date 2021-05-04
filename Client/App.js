import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextComponent, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from 'react-native-splash-screen';

import MainScreen from './screen/MainScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import RegisterFinishScreen from './screen/RegisterFinishScreen';
import SearchScreen from './screen/SearchScreen';
import MyPillScreen from './screen/MyPillScreen';
import MyPillDetailScreen from './screen/MyPillDetailScreen';
import PhotoGuideScreen from './screen/PhotoGuideScreen';
import PhotoScreen from './screen/PhotoScreen';
import ConfirmScreen from './screen/ConfirmScreen';

const Stack = createStackNavigator();


function BackBtn() {
    return (
        <Image
        source={require('./src/icon/back.png')}
        style={{marginLeft: 16, width: 24, height: 24}}
        />
    );
}

class App extends Component 
{
    render () {

        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
        
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={{
                        title: '이게뭐약?' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                    }}
                    />

                    <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ 
                        title: '회원가입' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerBackTitleVisible: false,
                        headerBackImage: BackBtn,
                    }}
                    />

                    <Stack.Screen
                    name="RegisterFinish"
                    component={RegisterFinishScreen}
                    options={{ 
                        title: '회원가입' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerShown : false
                    }}
                    /> 

                    <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={({ navigation }) => ({
                        title: '알약 검색' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerBackTitleVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity
                            onPress={()=>{
                                navigation.reset({routes: [{name: 'Main'}]})
                            }}>
                                <Image
                                    source={require('./src/icon/home.png')}
                                    style={{marginLeft: 16, width: 24, height: 24}}
                                />
                            </TouchableOpacity>
                             
                        ),
                    })}

                    />

                    <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ 
                        title: '로그인' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerBackTitleVisible: false,
                        headerBackImage: BackBtn,
                    }}
                    />

                    <Stack.Screen
                    name="MyPill"
                    component={MyPillScreen}
                    options={{ 
                        title: '내약통' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerBackTitleVisible: false,
                        headerBackImage: BackBtn,
                    }}
                    />

                    <Stack.Screen
                    name="MyPillDetail"
                    component={MyPillDetailScreen}
                    options={{ 
                        title: '내약통' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerBackTitleVisible: false,
                        headerBackImage: BackBtn,
                    }}
                    />

                    <Stack.Screen
                    name="PhotoGuide"
                    component={PhotoGuideScreen}
                    options={{ 
                        title: '알약 촬영 안내' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerBackTitleVisible: false,
                        headerBackImage: BackBtn,
                    }}
                    />

                    <Stack.Screen
                    name="Photo"
                    component={PhotoScreen}
                    options={{ 
                        title: '알약 촬영' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerBackTitleVisible: false,
                        headerBackImage: BackBtn,
                    }}
                    />

                    <Stack.Screen
                    name="Confirm"
                    component={ConfirmScreen}
                    options={{ 
                        title: '알약 촬영' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerBackTitleVisible: false,
                        headerBackImage: BackBtn,
                    }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            
        )
    }
}

const styles = StyleSheet.create({
});

export default App;