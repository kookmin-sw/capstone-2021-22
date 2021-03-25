import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextComponent, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './Screen/MainScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import RegisterFinishScreen from './Screen/RegisterFinishScreen';
import SearchScreen from './Screen/SearchScreen';
import SearchResultScreen from './Screen/SearchResultScreen';
import MyPillScreen from './Screen/MyPillScreen';
import MyPillDetailScreen from './Screen/MyPillDetailScreen';

const Stack = createStackNavigator();

function HomeBtn() {
    return (
        <Image
        source={require('./src/icon/home.png')}
        style={{marginLeft: 16, width: 24, height: 24}}
        />
    );  
}

function BackBtn() {
    return (
        <Image
        source={require('./src/icon/back.png')}
        style={{marginLeft: 16, width: 24, height: 24}}
        />
    );
}

class App extends Component {
    render () {
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
                    options={{ 
                        title: '알약 검색' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerBackTitleVisible: false,
                        headerBackImage: HomeBtn
                    }}
                    />

                    <Stack.Screen
                    name="SearchResult"
                    component={SearchResultScreen}
                    options={{ 
                        title: '알약 검색' ,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: "#707070"
                        },
                        headerBackTitleVisible: false,
                        headerBackImage: HomeBtn,
                    }}
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
                </Stack.Navigator>
            </NavigationContainer>
            
        )
    }
}

const styles = StyleSheet.create({
});

export default App;