import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './userContext';
const mainScreen = () => {
  const navigation = useNavigation();
  const { userData } = useUser();
  const user = { 
    name: userData?.username
      ? userData.username.charAt(0).toUpperCase() + userData.username.slice(1)
      : 'Guest', 
    profileImage: require('../assets/icon.png'),
    ranking: 42,
  };

  const primaryColor = '#423378'; // Minsk
  const secondaryColor = '#F2BDA1'; // Mandys Pink

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    gradient: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContainer: {
      width: '80%',
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 5,
      backgroundColor: 'white',
      alignItems: 'center',
      position: 'relative', 
    },
    backgroundImage: {
      width: '100%',
      height: '50%',
    },
    profileImage: {
      width: 60,  
      height: 50, 
      borderRadius: 40,
      marginVertical: 5, // Adjusted margin
    },
    profileIcon: {
      position: 'absolute',
      top: 20,
      right: 20,
      fontSize: 24,
      color: 'white',
    },
    titleText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: primaryColor,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 5, // Adjusted margin
      color: primaryColor,
    },
    rankingText: {
      fontSize: 16,
      color: primaryColor,
      marginBottom: 5, // Adjusted margin
    },
    buttonsContainer: {
      backgroundColor: secondaryColor,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    headerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
      position: 'absolute',
      top: 10,
      zIndex: 1,
    },
    headerIcon: {
      marginTop: 30,
      fontSize: 24,
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={[primaryColor, primaryColor]} style={styles.gradient}>
        <View style={styles.headerButtons}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" style={styles.headerIcon} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
            <FontAwesome name="trophy" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <FontAwesome name="user-circle-o" style={styles.profileIcon} />
          <Image source={user.profileImage} style={styles.profileImage} />
          <Text style={styles.titleText}>Welcome {user ? user.name : 'Guest'} !!</Text>
          <Text style={styles.subtitle}>Get ready for the Quiz!</Text>
          {/* <Text style={styles.rankingText}>Ranking: {user.ranking}</Text> */}
          <Image source={require('../assets/quizPic.png')} style={styles.backgroundImage} />
        </View>

        <TouchableOpacity
          style={styles.buttonsContainer}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default mainScreen;
