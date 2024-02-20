import React, { useEffect } from 'react';
import Voice from '@react-native-community/voice';
import { useUser } from '../Views/userContext';

const VoiceRecognition = ({ navigation }) => {
  const { logout } = useUser();

  useEffect(() => {
    initVoiceRecognition();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const initVoiceRecognition = () => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
  };

  const onSpeechEnd = () => {
    stopRecognition();
};

  const startRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecognition = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  const onSpeechResults = results => {
    const command = results[0].toLowerCase(); // Get the first recognized command
    console.log('Speech results: ', command);
    processVoiceCommand(command);
  };

//   processVoiceCommand = command => {
//     switch (command) {
//       case 'search for a movie':
//         this.navigation.navigate('MovieSearchScreen');
//         break;
//       case 'favorite movie':
//         this.navigation.navigate('FavoriteMoviesScreen');
//         break;
//       case 'start trivia game':
//         this.navigation.navigate('TriviaGameScreen');
//         break;
//       case 'go to leaderboard':
//         this.navigation.navigate('LeaderboardScreen');
//         break;
//       case 'logout':
//         // Perform logout action
//         break;
//       default:
//         // Handle unrecognized command
//         break;
//     }
//   };

  processVoiceCommand = command => {
    const lowercaseCommand = command.toLowerCase();
  
    if (lowercaseCommand.includes('search')) {
      this.navigation.navigate('MovieSearchScreen');
    } else if (lowercaseCommand.includes('favorite')) {
      this.navigation.navigate('FavoriteMoviesScreen');
    } else if (lowercaseCommand.includes('trivia')) {
      this.navigation.navigate('TriviaGameScreen');
    } else if (lowercaseCommand.includes('leaderboard')) {
      this.navigation.navigate('LeaderboardScreen');
    } else if (lowercaseCommand.includes('logout')) {
      logout(); // Assuming this function exists to handle logout
      this.navigation.navigate('Initial');
    } else if (lowercaseCommand.includes('detail')) {
      this.navigation.navigate('MovieDetailScreen');
    } else {
        // Handle unrecognized command
      }
    };
  
    return null; // Voice recognition component doesn't render anything visible
  };
  
  export default VoiceRecognition;