import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextComponent } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screen/LoginScreen';

const Stack = createStackNavigator();

class App extends Component {
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>
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
