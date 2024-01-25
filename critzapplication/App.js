import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "./Views/userContext";
import QuizScreen from "./Views/QuizScreen";
import ResultScreen from "./Views/ResultScreen";
//import HomeScreen from "./Views/homeScreen";
import LeaderboardScreen from "./Views/LeaderboardScreen";
import initialScreen from './Views/initialScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import AuthScreen from './Views/AuthScreen';
import firebaseApp from './firebaseConfig';
import signUpScreen from './Views/signUpScreen';
import mainScreen from './Views/mainScreen';

function SplashScreen({ navigation }) {
  React.useEffect(() => {
    const splashTimer = setTimeout(() => {
      navigation.replace('Initial'); 
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('./assets/splash.jpeg')}
        style={{ width: 120, height: 120, borderRadius: 10 }} 
      />
    </View>
  );
}


const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="Result" component={ResultScreen} /> */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Initial" component={initialScreen} />
          <Stack.Screen name="SignUp" component={signUpScreen} />
          <Stack.Screen name="MainScreen" component={mainScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen
  name="Leaderboard"component={LeaderboardScreen}
  options={{ headerStyle: {
      backgroundColor: '#423378', // Change to your desired header color
    },
    headerTitleStyle: {
      color: 'white', // Change to your desired title color
    },
    headerTitleAlign: 'center', headerShown: true, headerTintColor: 'white'
  }}
/>

          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          {/* <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ headerShown: true}} /> */}
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
