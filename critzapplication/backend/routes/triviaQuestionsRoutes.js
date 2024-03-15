const express = require('express');
const router = express.Router();
const triviaQuestionController = require('../Controllers/triviaQuestionsController');

// Route for getting all trivia questions
router.get('/triviaQuestions', triviaQuestionController.getAllTriviaQuestions);

// Route for creating a new trivia question
router.post('/triviaQuestions', triviaQuestionController.createTriviaQuestion);

module.exports = router;
