import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextComponent, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './Screen/RegisterScreen';
import RegisterFinishScreen from './Screen/RegisterFinishScreen';
import SearchScreen from './Screen/SearchScreen';
import SearchResultScreen from './Screen/SearchResultScreen';


const Stack = createStackNavigator();

function HomeBtn() {
  return (
    <Image
      source={require('./src/icon/home.png')}
      style={{marginLeft: 16, width: 24, height: 24}}
    />
  );
}

class App extends Component {
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>

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
            headerBackTitleVisible: false,
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
            headerBackImage: HomeBtn, 
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
          
        </Stack.Navigator>
      </NavigationContainer>
        
    )
  }
}

const styles = StyleSheet.create({
});

export default App;