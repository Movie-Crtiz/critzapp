import React from 'react';
import { View, Text, Button, StyleSheet,Alert } from 'react-native';
import { useUser } from './userContext';
import {Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ResultScreen = ({ route, navigation }) => {
  const { score } = route.params;
  const { userData } = useUser();

  const primaryColor = '#423378'; // Minsk
  const secondaryColor = '#F2BDA1'; // Mandys Pink

  const user = {
    name: 'John Doe',
    profileImage: require('../assets/icon.png'),
    ranking: 42,
    score: 120, // Replace this with the actual score
  };

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
    congratulationText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
    Image: {
      width: 150,
      height: 200,
      borderRadius: 50,
      marginBottom: 20,
    },
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
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
  });


  const handleFinishQuiz = async () => {

    navigation.navigate('MainScreen');
    // try {
  //  const currentDate = new Date();
    //   const currentUser = userData?._id;
    //   const scoreData = {
    //     userID: currentUser,
    //     date: currentDate.toISOString(),
    //     score: score,
    //   };
  
    //   response = await axios.post(`${API_BASE_URL}/score/add`, scoreData);
    //   console.log(response.data);
    //   navigation.navigate('MainScreen');
    // } catch (error) {
    //   console.error('Error saving task:', error);
    //   Alert.alert('Error', 'An unexpected error occurred.');
    // }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[primaryColor, primaryColor]} style={styles.gradient}>
        <Text style={styles.congratulationText}>Congratulations!</Text>
        
        <Image source={require('../assets/trophy.png')} style={styles.Image} />

        <Text style={styles.scoreText}>Your Score: {score}/10</Text>
        <TouchableOpacity
          style={styles.buttonsContainer}
          onPress={() => handleFinishQuiz()}
        ><Text style={styles.buttonText}>Finish</Text></TouchableOpacity>
  
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResultScreen;


// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';

// const Score = () => {
//   const navigation = useNavigation();

//   const primaryColor = '#423378'; // Minsk
//   const secondaryColor = '#F2BDA1'; // Mandys Pink

//   const user = {
//     name: 'John Doe',
//     profileImage: require('./assets/icon.png'),
//     ranking: 42,
//     score: 120, // Replace this with the actual score
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     gradient: {
//       flex: 1,
//       width: '100%',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     congratulationText: {
//       fontSize: 30,
//       fontWeight: 'bold',
//       color: 'white',
//       marginBottom: 20,
//     },
//     Image: {
//       width: 150,
//       height: 200,
//       borderRadius: 50,
//       marginBottom: 20,
//     },
//     scoreText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: 'white',
//         marginBottom: 20,
//       },
//     buttonsContainer: {
//       backgroundColor: secondaryColor,
//       paddingVertical: 15,
//       paddingHorizontal: 30,
//       borderRadius: 10,
//       marginVertical: 20,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     buttonText: {
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: 18,
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <LinearGradient colors={[primaryColor, primaryColor]} style={styles.gradient}>
//         <Text style={styles.congratulationText}>Congratulations!</Text>
        
//         <Image source={require('./assets/trophy.png')} style={styles.Image} />

//         <Text style={styles.scoreText}>Your Score: {user.score}</Text>
//         <TouchableOpacity
//           style={styles.buttonsContainer}
//           onPress={() => navigation.navigate('Leaderboard')}
//         >
    
//           <Text style={styles.buttonText}>Go to Leaderboard</Text>
//         </TouchableOpacity>
//       </LinearGradient>
//     </View>
//   );
// };

// export default Score;
