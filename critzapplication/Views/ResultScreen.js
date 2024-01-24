import React from 'react';
import { View, Text, Button, StyleSheet,Alert } from 'react-native';
import { useUser } from './userContext';

const ResultScreen = ({ route, navigation }) => {
  const { score } = route.params;
  const { userData } = useUser();

  const handleFinishQuiz = async () => {

    navigation.navigate('Home');
    // try {
  
    //   const currentUser = userData?._id;
    //   const scoreData = {
    //     userID: currentUser,
    //     date: '2022-01-01',
    //     score: 120,
    //   };
  
    //   response = await axios.post(`${API_BASE_URL}/score/add`, scoreData);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error('Error saving task:', error);
    //   Alert.alert('Error', 'An unexpected error occurred.');
    // }
  };

  return (
    <View style={styles.container}>
      <Text>Your Score: {score}/10</Text>
      <Button title="Finish Quiz" onPress={handleFinishQuiz} />
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
