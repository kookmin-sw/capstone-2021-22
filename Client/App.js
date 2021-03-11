import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextComponent } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './Screen/RegisterScreen';

const Stack = createStackNavigator();

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
        </Stack.Navigator>
      </NavigationContainer>
        
    )
  }
}

const styles = StyleSheet.create({
});

export default App;