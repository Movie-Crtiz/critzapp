import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import signUpScreen from './signUpScreen';
import AuthScreen from './AuthScreen';

export default function initialScreen({ navigation }) {
    const primaryColor = '#423378';
    const secondaryColor = '#F2BDA1';
    const gradientColors = [primaryColor, secondaryColor];
    const headingFont = 'Roboto';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        backgroundImage: {
            width: '80%',
            height: '80%',
            resizeMode: 'contain',
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
        },
        buttonContainer: {
            flexDirection: 'row',
            marginTop: 20,
        },
        loginButton: {
            backgroundColor: '#26A0AE',
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
        <LinearGradient
            colors={gradientColors}
            style={styles.container}
        >
            <Image
                source={require('../assets/homePic.png')}
                style={styles.backgroundImage}
            />
            <View style={styles.overlay}>
                <Text style={styles.heading}>Movie Critz</Text>
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
        </LinearGradient>
    );
}
