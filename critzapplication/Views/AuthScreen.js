import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import mainScreen from "./mainScreen";

import {
  Alert,
  Pressable,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useUser } from './userContext';
import { API_BASE_URL } from '../config';
import axios from 'axios';
//import Quiz from './Quiz';

const firebaseConfig = {
  apiKey: "AIzaSyBHSlMBBDWXWS2LzWcgSbvelq4wFPX-p6s",
  authDomain: "critzapplication.firebaseapp.com",
  projectId: "critzapplication",
  storageBucket: "critzapplication.appspot.com",
  messagingSenderId: "733448868006",
  appId: "1:733448868006:web:dbde4241ddce83b30de467",
  measurementId: "G-5D2SSB968E",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthScreen = () => {
  const navigation = useNavigation();
  const [click, setClick] = useState(false);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  // const [signUpFirstName, setSignUpFirstName] = useState('');
  // const [signUpLastName, setSignUpLastName] = useState('');
  // const [signUpEmail, setSignUpEmail] = useState('');
  // const [signUpPassword, setSignUpPassword] = useState('');
  const [authMessage, setAuthMessage] = useState("");
  const { userData, login } = useUser();

  const primaryColor = "#423378"; // Minsk
  const secondaryColor = "#F2BDA1"; // Mandys Pink

  const styles = StyleSheet.create({
    gradientBackground: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    decorativeCircle1: {
      position: "absolute",
      top: -150,
      right: -150,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: 300,
      width: 300,
      height: 300,
    },
    decorativeCircle2: {
      position: "absolute",
      bottom: -100,
      left: -100,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: 200,
      width: 200,
      height: 200,
    },
    decorativeCircle3: {
      position: "absolute",
      top: 100,
      left: 50,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: 150,
      width: 150,
      height: 150,
    },
    decorativeCircle4: {
      position: "absolute",
      bottom: 50,
      right: 20,
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 100,
      width: 100,
      height: 100,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 20,
      color: "white",
    },
    inputView: {
      width: "100%",
      marginBottom: 20,
    },
    input: {
      height: 50,
      width: 300,
      borderColor: secondaryColor,
      borderWidth: 3,
      marginBottom: 10,
      paddingLeft: 50,
      borderRadius: 10,
      color: "white",
    },
    icon: {
      position: "absolute",
      top: 15,
      left: 15,
      color: secondaryColor,
    },
    rememberView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: 20,
    },
    switch: {
      flexDirection: "row",
      alignItems: "center",
    },
    rememberText: {
      marginLeft: 15,
      fontSize: 16,
      color: "white",
    },
    forgetText: {
      color: secondaryColor,
      fontWeight: "bold",
      fontSize: 16,
    },
    buttonView: {
      width: "100%",
    },
    button: {
      backgroundColor: "#26A0AE",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
      marginLeft: 10,
    },
    optionsText: {
      textAlign: "center",
      marginTop: 15,
      fontSize: 18,
      color: "white",
    },
    footerText: {
      marginTop: 20,
      fontSize: 16,
      color: "white",
    },
    signup: {
      color: secondaryColor,
      fontWeight: "bold",
      fontSize: 16,
    },
    backButton: {
      position: "absolute",
      top: 60,
      left: 20,
      zIndex: 1,
    },
    backIcon: {
      color: "white",
      fontSize: 24,
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Sign-in successful! : ", user);
        getUserData(user.email);
        setAuthMessage("Sign-in successful!");
        console.log("Sign-in successful!");
      } else {
      }
    });
    return () => unsubscribe();
  }, [auth,navigation]);

  const handleSignInWithEmailAndPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      await getUserData(signInEmail);
      console.log("Sign-in successful!");
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      setAuthMessage("Failed to sign in. Please check your credentials.");
    }
  };

  const getUserData = async (email) => {
    try {
      console.log(email);
      const response = await axios.get(`${API_BASE_URL}/members/${email}`);
      console.log('response :' ,response);
      console.log('Login successfully: ', response.data);
      const userData = response.data;
      console.log('userData: ', userData);
      login(userData);
      console.log('userData :' ,userData);
      // navigation.navigate('MainScreen');
      navigation.navigate('movieHomeScreen');

    } catch (error) {
      if (error.response) {
        setAuthMessage(error.response.data.message);
        console.log('Login Error: ', error.response.data.message);
      } else {
        setAuthMessage('An unexpected error occurred');
        console.log('An unexpected error occurred');
      }
    }
  };


  return (
    <LinearGradient
      colors={[primaryColor, secondaryColor]}
      style={styles.gradientBackground}
    >
      <View style={styles.decorativeCircle1}></View>
      <View style={styles.decorativeCircle2}></View>
      <View style={styles.decorativeCircle3}></View>
      <View style={styles.decorativeCircle4}></View>

      <SafeAreaView style={styles.container}>
      <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" size={24} style={styles.backIcon} />
                </TouchableOpacity>

        <Text style={styles.title}>Welcome Back!</Text>
        <View style={styles.inputView}>
          <Feather name="user" size={24} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholderTextColor="white"
            placeholder="Email"
            value={signInEmail}
            onChangeText={(text) => setSignInEmail(text)}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputView}>
          <Feather name="lock" size={24} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholderTextColor="white"
            placeholder="Password"
            secureTextEntry
            value={signInPassword}
            onChangeText={(text) => setSignInPassword(text)}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        {/* <View style={styles.rememberView}>
            <View style={styles.switch}>
                <Switch
                    value={click}
                    onValueChange={setClick}
                    trackColor={{ true: secondaryColor, false: 'gray' }}
                />
                <Text style={styles.rememberText}>Remember Me</Text>
            </View>
            <Pressable onPress={() => Alert.alert("Forget Password!")}>
                <Text style={styles.forgetText}>Forgot Password?</Text>
            </Pressable>
        </View> */}
        <Pressable
          style={styles.button}
          onPress={async () => {
            const signInSuccess = await handleSignInWithEmailAndPassword();
            if (signInSuccess) {
              console.log("Sign-in successful!");
            }
          }}
        >
          <Feather name="log-in" size={24} color="white" />
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>

    // {/* <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={styles.container}
    // >
    //   <View style={styles.formContainer}>
    //     <Text>Welcome to Your App</Text>

    //     {/* Email and Password Sign-In */}
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Email"
    //       value={signInEmail}
    //       onChangeText={(text) => setSignInEmail(text)}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Password"
    //       secureTextEntry
    //       value={signInPassword}
    //       onChangeText={(text) => setSignInPassword(text)}
    //     />
    //     <Button title="Sign In with Email and Password" onPress={handleSignInWithEmailAndPassword} />

    //     {authMessage ? <Text style={styles.authMessage}>{authMessage}</Text> : null}

    //     {/* Email and Password Sign-UP
    //     <TextInput
    //       style={styles.input}
    //       placeholder="First Name"
    //       value={signUpFirstName}
    //       onChangeText={(text) => setSignUpFirstName(text)}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Last Name"
    //       value={signUpLastName}
    //       onChangeText={(text) => setSignUpLastName(text)}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Email"
    //       value={signUpEmail}
    //       onChangeText={(text) => setSignUpEmail(text)}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Password"
    //       secureTextEntry
    //       value={signUpPassword}
    //       onChangeText={(text) => setSignUpPassword(text)}
    //     />
    //     <Button title="Sign Up" onPress={handleSignUpWithEmailAndPassword} /> */}
    //   </View>
    // </KeyboardAvoidingView> */}
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: "80%", // Fixed width
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "100%", // Take full width
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  authMessage: {
    marginTop: 10,
    color: "green", // You can customize the styling
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: -25,   
},
backIcon: {
  color: 'white',
  fontSize: 24,
},
});

export default AuthScreen;
