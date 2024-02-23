import React, { useEffect } from 'react';
import * as Speech from 'expo-speech';
import { useUser } from '../Views/userContext';

const VoiceRecognition = ({ navigation }) => {
  const { logout } = useUser();

  useEffect(() => {
    // Start voice recognition when the component mounts
    startRecognition();

    // Clean up voice recognition when the component unmounts
    return () => {
      stopRecognition();
    };
  }, []);

  const startRecognition = async () => {
    try {
      // Start listening for speech
      Speech.start();
      // Handle speech recognition results
      Speech.addEventListener('SpeechResults', onSpeechResults);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecognition = async () => {
    try {
      // Stop listening for speech
      Speech.stop();
      // Remove the event listener
      Speech.removeEventListener('SpeechResults', onSpeechResults);
    } catch (error) {
      console.error(error);
    }
  };

  const onSpeechResults = event => {
    // Get the recognized speech command
    const command = event.results[0];
    // Process the command
    processVoiceCommand(command);
  };

  const processVoiceCommand = command => {
    const lowercaseCommand = command.toLowerCase();
  
    if (lowercaseCommand.includes('search')) {
      navigation.navigate('MovieSearchScreen');
    } else if (lowercaseCommand.includes('favorite')) {
      navigation.navigate('FavoriteMovieScreen');
    } else if (lowercaseCommand.includes('trivia')) {
      navigation.navigate('TriviaGameScreen');
    } else if (lowercaseCommand.includes('leaderboard')) {
      navigation.navigate('LeaderboardScreen');
    } else if (lowercaseCommand.includes('logout')) {
      logout(); // Assuming this function exists to handle logout
      navigation.navigate('Initial');
    } else if (lowercaseCommand.includes('detail')) {
      navigation.navigate('MovieDetailScreen');
    } else {
      // Handle unrecognized command
    }
  };

  return null; // Voice recognition component doesn't render anything visible
};

export default VoiceRecognition;
