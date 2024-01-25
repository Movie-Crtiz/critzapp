import React, { useState, useEffect, useRef, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import he from "he";

import * as Progress from "react-native-progress";

const QuizScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(20);
  const [timerColor, setTimerColor] = useState("red");
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const [totalQuestions, setTotalQuestions] = useState(0);

  const countdownRef = useRef(null);

  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      const allAnswers = [
        ...questions[currentQuestionIndex]?.incorrectAnswers,
        questions[currentQuestionIndex]?.correctAnswer,
      ];
      setShuffledAnswers(shuffleArray(allAnswers));
    }
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    setTimerColor("white"); // Initialize the timer color
    startCountdown();
  }, [questions]);

  useEffect(() => {
    if (countdown === 5) {
      setTimerColor("red");
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
        setTimerColor("black");
        handleNextQuestion();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isAnswerLocked]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        // "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple"
        "https://the-trivia-api.com/v2/questions"
      );
      setLoading(false);
      // Decode HTML entities in questions and answers
      // const decodedQuestions = response.data.map((question) => ({
      //   ...question,
      //   question: he.decode(question.question),
      //   incorrectAnswers: question.incorrectAnswers.map((answer) =>
      //     he.decode(answer)
      //   ),
      //   correctAnswer: he.decode(question.correctAnswer),
      // }));

      const decodedQuestions = response.data.map((question) => ({
        ...question,
        question: he.decode(question.question.text),
        incorrectAnswers: question.incorrectAnswers.map((answer) => he.decode(answer)),
        correctAnswer: he.decode(question.correctAnswer),
      }));

      setQuestions(decodedQuestions);
      setTotalQuestions(decodedQuestions.length);
      startCountdown();
    } catch (error) {
      console.error("Error fetching questions111:", error);
      // showAlert('Error','Error fetching questions');
      fetchQuestions();
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: "Retry", onPress: () => fetchQuestions() }],
      { cancelable: false }
    );
  };

  const startCountdown = () => {
    countdownRef.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
  };

  const resetCountdown = () => {
    clearInterval(countdownRef.current);
    setCountdown(20);
    setTimerColor("white");
    startCountdown();
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      resetCountdown();
    } else {
      clearInterval(countdownRef.current);
      navigation.navigate("Result", { score });
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
    <View style={styles.contentContainer}>
      <Text
        style={{
          color: timerColor,
          textAlign: "left",
          alignSelf: "flex-start",
          paddingLeft: 20,
          paddingBottom: 30,
        }}
      >
        Time Left: {countdown}s
      </Text>
      <View style={styles.headerContainer}>
        {totalQuestions > 0 && (
          <Progress.Bar
            progress={currentQuestionIndex / totalQuestions}
            width={300}
            height={10}
            color="#31CD63"
            unfilledColor="white"
          />
        )}
        <Text style={{ color: "#757575", marginLeft: 10 }}>
          {currentQuestionIndex + 1}/{totalQuestions}
        </Text>
      </View>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 20,
          paddingTop: 40,
          paddingBottom: 80,
        }}
      >
          {/* {he.decode(questions[currentQuestionIndex]?.question || "")} */}
        {questions[currentQuestionIndex]?.question}
      </Text>
      {shuffledAnswers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: "row",
            marginVertical: 8,
            backgroundColor:
              selectedAnswer === answer
                ? answer === questions[currentQuestionIndex]?.correctAnswer
                  ? "green"
                  : "red"
                : "#F2BDA1",
            padding: 8,
            borderRadius: 5,
            width: 300,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleAnswerSelection(answer)}
          disabled={isAnswerLocked}
        >
          <Text
            style={{
              color: selectedAnswer === answer ? "white" : "black",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {" "}
            {/* {he.decode(answer || "")} */}
            {answer}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#423378",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#423378",
    alignItems: "center",
    paddingTop: 80,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default QuizScreen;
