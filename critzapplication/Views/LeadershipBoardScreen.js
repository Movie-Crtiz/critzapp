import React from 'react';
import { View, Text, Button } from 'react-native';

const LeadershipBoardScreen = ({ route, navigation }) => {
  const { score } = route.params;

  const handleNavigateQuiz = () => {
    // Save the score to MongoDB (implement MongoDB integration here)

    // Navigate back to the Quiz screen to start a new quiz
    navigation.navigate('Quiz');
  };

  return (
    <View>
      <Button title="Quiz" onPress={handleNavigateQuiz} />
    </View>
  );
};

export default LeadershipBoardScreen;