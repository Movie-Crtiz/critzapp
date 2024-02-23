import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "./Views/userContext";
import QuizScreen from "./Views/QuizScreen";
import ResultScreen from "./Views/ResultScreen";
//import HomeScreen from "./Views/homeScreen";
import LeaderboardScreen from "./Views/LeaderboardScreen";
import initialScreen from "./Views/initialScreen";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AuthScreen from "./Views/AuthScreen";
import firebaseApp from "./firebaseConfig";
import signUpScreen from "./Views/signUpScreen";
import mainScreen from "./Views/mainScreen";
import MovieHomeScreen from "./Views/MovieHomeScreen";
import MovieDetailScreen from "./Views/MovieDetailScreen";
import MovieReviewScreen from "./Views/MovieReviewScreen";
import MovieFavoriteScreen from "./Views/MovieFavoriteScreen";
import MovieSearchScreen from "./Views/MovieSearchScreen";

function SplashScreen({ navigation }) {
  React.useEffect(() => {
    const splashTimer = setTimeout(() => {
      navigation.replace("Initial");
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("./assets/splash.jpeg")}
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
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Initial" component={initialScreen} />
          <Stack.Screen name="SignUp" component={signUpScreen} />
          <Stack.Screen name="MainScreen" component={mainScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen
            name="MoviesHome"
            component={MovieHomeScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="MovieDetail"
            component={MovieDetailScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: "Movie Details",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                    name="arrow-left"
                    size={24}
                    color="#FFF"
                    style={{ marginLeft: 15 }}
                  />
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: "#333",
              },
              headerTintColor: "#FFF",
            })}
          />
          <Stack.Screen
            name="MovieReview"
            component={MovieReviewScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: "Write a Review",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                    name="arrow-left"
                    size={24}
                    color="#FFF"
                    style={{ marginLeft: 15 }}
                  />
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: "#333",
              },
              headerTintColor: "#FFF",
            })}
          />
          <Stack.Screen name="MovieFavorite" component={MovieFavoriteScreen} 
options={({ navigation }) => ({
              headerShown: true,
              headerTitle: "Favorites",
              headerStyle: {
                backgroundColor: "#333",
              },
              headerTintColor: "#FFF",
            } 
          )}
            
          />
          <Stack.Screen name="MovieSearch" component={MovieSearchScreen}  
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: "Search",
              headerStyle: {
                backgroundColor: "#333",
              },
              headerTintColor: "#FFF",
            } 
          )}
          />
          <Stack.Screen
            name="Leaderboard"
            component={LeaderboardScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: "Leaderboard",
              headerStyle: {
                backgroundColor: "#333",
              },
              headerTintColor: "#FFF",
            } 
          )}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
