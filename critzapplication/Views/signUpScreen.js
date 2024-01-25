import React, { useState, useEffect } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHSlMBBDWXWS2LzWcgSbvelq4wFPX-p6s",
  authDomain: "critzapplication.firebaseapp.com",
  projectId: "critzapplication",
  storageBucket: "critzapplication.appspot.com",
  messagingSenderId: "733448868006",
  appId: "1:733448868006:web:dbde4241ddce83b30de467",
  measurementId: "G-5D2SSB968E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



export default function signUpScreen() {
    const navigation = useNavigation();
    const [click, setClick] = useState(false);

    const [signUpFirstName, setSignUpFirstName] = useState('');
  const [signUpLastName, setSignUpLastName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setAuthMessage('Sign-in successful!');
      } else {
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignUpWithEmailAndPassword = async () => {
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      console.log("Firebase: Sign-up successful!");

      console.log("First Name:", signUpFirstName);
      console.log("Last Name:", signUpLastName);
      console.log("email:", signUpEmail);
      console.log("password:", signUpPassword);
    
      // Send member data to the server
      await fetch('http://localhost:3000/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:{
          firstName: signUpFirstName,
          lastName: signUpLastName,
          email: signUpEmail,
          password: signUpPassword,
        },
      });
  
      console.log("Server: Sign-up request sent successfully.");
  
      setAuthMessage('Sign-up successful!');
    } catch (error) {
      console.error('Error signing up with email and password:', error);
      setAuthMessage('Failed to sign up. Please check your credentials.');
    }
  };

    const primaryColor = '#423378'; // Minsk
    const secondaryColor = '#F2BDA1'; // Mandys Pink

    const styles = StyleSheet.create({
        gradientBackground: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        decorativeCircle1: {
            position: 'absolute',
            top: -150,
            right: -150,
            backgroundColor: 'rgba(255,255,255,0.2)', 
            borderRadius: 300,
            width: 300,
            height: 300,
        },
        decorativeCircle2: {
            position: 'absolute',
            bottom: -100,
            left: -100,
            backgroundColor: 'rgba(255,255,255,0.2)', 
            borderRadius: 200,
            width: 200,
            height: 200,
        },
        decorativeCircle3: {
            position: 'absolute',
            top: 100,
            left: 50,
            backgroundColor: 'rgba(255,255,255,0.2)', 
            borderRadius: 150,
            width: 150,
            height: 150,
        },
        decorativeCircle4: {
            position: 'absolute',
            bottom: 50,
            right: 20,
            backgroundColor: 'rgba(255,255,255,0.1)', 
            borderRadius: 100,
            width: 100,
            height: 100,
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 20,
            color: 'white',
        },
        inputView: {
            width: '100%',
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
            color: 'white',
        },
        icon: {
            position: 'absolute',
            top: 15,
            left: 15,
            color: secondaryColor,
        },
        rememberView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: 20,
        },
        switch: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rememberText: {
            marginLeft: 15,
            fontSize: 16,
            color: 'white',
        },
        forgetText: {
            color: secondaryColor,
            fontWeight: 'bold',
            fontSize: 16,
        },
        buttonView: {
            width: '100%',
        },
        button: {
            backgroundColor: '#26A0AE',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            marginLeft: 10,
        },
        optionsText: {
            textAlign: 'center',
            marginTop: 15,
            fontSize: 18,
            color: 'white',
        },
        footerText: {
            marginTop: 20,
            fontSize: 16,
            color: 'white',
        },
        signup: {
            color: secondaryColor,
            fontWeight: 'bold',
            fontSize: 16,
        },
        backButton: {
            position: 'absolute',
            top: 60,
            left: 20,
            zIndex: 1,
        },
        backIcon: {
            color: 'white',
            fontSize: 24,
        },
    });

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

                <Text style={styles.title}>Welcome New User!</Text>
                <View style={styles.inputView}>
                    <Feather name="user" size={24} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='white'
                        placeholder='FirstName'
                        value={signUpFirstName}
                        onChangeText={(text) => setSignUpFirstName(text)}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.inputView}>
                    <Feather name="user" size={24} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='white'
                        placeholder='LastName'
                        value={signUpLastName}
                        onChangeText={(text) => setSignUpLastName(text)}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.inputView}>
                    <Feather name="user" size={24} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='white'
                        placeholder='Email'
                        value={signUpEmail}
                        onChangeText={(text) => setSignUpEmail(text)}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.inputView}>
                    <Feather name="lock" size={24} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='white'
                        placeholder='Password'
                        secureTextEntry
                        value={signUpPassword}
                        onChangeText={(text) => setSignUpPassword(text)}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                </View>
                
                <Pressable
                    style={styles.button}
                    onPress={async () => {
                        const signUpSuccess = await handleSignUpWithEmailAndPassword();
                        if (signUpSuccess) {
                        navigation.navigate('Quiz');
                        }
                    }}
                    >
                    <Feather name="log-in" size={24} color="white" />
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </SafeAreaView>
        </LinearGradient>
    );
}
