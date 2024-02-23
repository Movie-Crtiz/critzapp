import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import signUpScreen from './signUpScreen';
import AuthScreen from './AuthScreen';

export default function initialScreen({ navigation }) {
    const primaryColor = '#A5232C'; 
    const secondaryColor = '#000000'; 
    const headingFont = 'Roboto';

    const [fadeIn] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
            fadeIn,
            {
                toValue: 1,
                duration: 1500, 
                useNativeDriver: true
            }
        ).start();
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        gradient: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        backgroundImage: {
            width: '80%',
            height: '80%',
            resizeMode: 'contain',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 10,
        },
        overlay: {
            position: 'absolute',
            top: 70,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
        heading: {
            fontFamily: headingFont,
            fontSize: 36,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
            opacity: fadeIn,
        },
        buttonContainer: {
            flexDirection: 'row',
            marginTop: 20,
        },
        loginButton: {
            backgroundColor: secondaryColor,
            width: 150,
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        loginButtonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
        },

        signUpButtonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
        },
    });

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[primaryColor, 'transparent']} // Add transparent color for the gradient
                style={[styles.gradient, { backgroundColor: primaryColor }]}
            />
            <Image
                source={require('../assets/homePic.png')}
                style={styles.backgroundImage}
            />
            <View style={styles.overlay}>
                <Animated.Text style={styles.heading}>Movie Critz</Animated.Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Auth')}
                >
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.signUpButtonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
