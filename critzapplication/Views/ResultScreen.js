
import React from 'react';
import { View, Text, Button } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { score } = route.params;

  const handleFinishQuiz = () => {
    // Save the score to MongoDB (implement MongoDB integration here)

    // Navigate back to the Quiz screen to start a new quiz
    navigation.navigate('Quiz');
  };

  return (
    <View>
      <Text>Your Score: {score}/10</Text>
      <Button title="Finish Quiz" onPress={handleFinishQuiz} />
    </View>
  );
};

export default ResultScreen;
