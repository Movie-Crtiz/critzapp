import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { useUser } from './userContext';

const loginScreen1 = ({ route, navigation }) => {
  const { userData, login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    if (userData) {
      navigation.navigate('Home');
    }
  }, [userData, navigation]);

  const handleNavigateQuiz = () => {
    // Save the score to MongoDB (implement MongoDB integration here)

    // Navigate back to the Quiz screen to start a new quiz
    navigation.navigate('Home');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }
    navigation.navigate('Home');
    // try {
    //   // Replace the following line with your actual login API call
    //   // const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });

    //   // console.log('Login successfully: ', response.data);
    //   // setEmail('');
    //   // setPassword('');
    //   // setError('');
    //   // const userData = response.data.currentUser;
    //   // login(userData);

    // } catch (error) {
    //   // if (error.response) {
    //   //   setError(error.response.data.message);
    //   //   console.log('Login Error: ', error.response.data.message);
    //   // } else {
    //   //   setError('An unexpected error occurred');
    //   //   console.log('An unexpected error occurred');
    //   // }
    // }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Login" onPress={handleNavigateQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default loginScreen1;
