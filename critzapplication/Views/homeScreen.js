import React from 'react';
import { View, Text, Button } from 'react-native';

const homeScreen = ({ route, navigation }) => {

  const handleNavigateQuiz = () => {
    // Save the score to MongoDB (implement MongoDB integration here)

    // Navigate back to the Quiz screen to start a new quiz
    navigation.navigate('Quiz');
  };

  const handleNavigateLeaderboard = () => {
    // Save the score to MongoDB (implement MongoDB integration here)

    // Navigate back to the Quiz screen to start a new quiz
    navigation.navigate('Leaderboard');
  };

  return (
    <View>
      <Button title="Quiz" onPress={handleNavigateQuiz} />
      <Button title="Leader board" onPress={handleNavigateLeaderboard} />
    </View>
  );
};

export default homeScreen;
