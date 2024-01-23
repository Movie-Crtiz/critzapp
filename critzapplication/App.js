import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {UserProvider} from './Views/userContext'
import QuizScreen from './Views/QuizScreen';
import ResultScreen from './Views/ResultScreen';
import HomeScreen from './Views/HomeScreen';
import LoginScreen from './Views/LoginScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;
