import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity,ActivityIndicator ,Alert } from 'react-native';
import axios from 'axios';
import he from 'he';

const QuizScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(20);
  const [timerColor, setTimerColor] = useState('black');
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const countdownRef = useRef(null);

  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      const allAnswers = [
        ...questions[currentQuestionIndex]?.incorrect_answers,
        questions[currentQuestionIndex]?.correct_answer,
      ];
      setShuffledAnswers(shuffleArray(allAnswers));
    }
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (countdown === 5) {
      setTimerColor('red');
    }

    if (countdown === 0) {
      handleNextQuestion();
    }
  }, [countdown]);

  useEffect(() => {
    if (isAnswerLocked) {
      // Lock the answer selection for 1 seconds
      const timeoutId = setTimeout(() => {
        setIsAnswerLocked(false);
        setTimerColor('black');
        handleNextQuestion();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isAnswerLocked]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple'
      );
      setLoading(false)

            // Decode HTML entities in questions and answers
            const decodedQuestions = response.data.results.map((question) => ({
              ...question,
              question: he.decode(question.question),
              incorrect_answers: question.incorrect_answers.map((answer) => he.decode(answer)),
              correct_answer: he.decode(question.correct_answer),
            }));

      setQuestions(decodedQuestions);
      startCountdown();
    } catch (error) {
      console.error('Error fetching questions111:', error);
      // showAlert('Error','Error fetching questions');
      fetchQuestions();
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'Retry', onPress: () => fetchQuestions() }], { cancelable: false });
  };

  const startCountdown = () => {
    countdownRef.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
  };

  const resetCountdown = () => {
    clearInterval(countdownRef.current);
    setCountdown(20);
    setTimerColor('black');
    startCountdown();
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      resetCountdown();
    } else {
      clearInterval(countdownRef.current);
      navigation.navigate('Result', { score });
    }
  };

  const handleAnswerSelection = (value) => {
    if (!isAnswerLocked) {
      setSelectedAnswer(value);
      setIsAnswerLocked(true);
      clearInterval(countdownRef.current);
    }
  };

  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View>
      <Text>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>
      <Text>{he.decode(questions[currentQuestionIndex]?.question || '')}</Text>


      {shuffledAnswers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 8,
            backgroundColor: selectedAnswer === answer
              ? (answer === questions[currentQuestionIndex]?.correct_answer
                ? 'green'
                : 'red')
              : 'white',
            padding: 8,
            borderRadius: 5,
          }}
          onPress={() => handleAnswerSelection(answer)}
          disabled={isAnswerLocked}
        >
          <Text style={{ color: selectedAnswer === answer ? 'white' : 'black' }}> {he.decode(answer || '')}</Text>
        </TouchableOpacity>
      ))}

      <Text style={{ color: timerColor }}>Time Left: {countdown}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizScreen;
