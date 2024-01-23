import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const QuizScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(20);
  const [timerColor, setTimerColor] = useState('black');
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);

  const countdownRef = useRef(null);

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
      // Lock the answer selection for 3 seconds
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
      setQuestions(response.data.results);
      startCountdown();
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
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

  return (
    <View>
      <Text>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>
      <Text>{questions[currentQuestionIndex]?.question}</Text>

      {questions[currentQuestionIndex]?.incorrect_answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 8,
            backgroundColor: selectedAnswer === answer ? 'blue' : 'white',
            padding: 8,
            borderRadius: 5,
          }}
          onPress={() => handleAnswerSelection(answer)}
          disabled={isAnswerLocked}
        >
          <Text style={{ color: selectedAnswer === answer ? 'white' : 'black' }}>{answer}</Text>
        </TouchableOpacity>
      ))}

      <Text style={{ color: timerColor }}>Time Left: {countdown}s</Text>
    </View>
  );
};

export default QuizScreen;
