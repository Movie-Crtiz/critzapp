const TriviaQuestion = require('../Models/triviaQuestionsModel');

// Get all trivia questions
const getAllTriviaQuestions = async (req, res) => {
    try {
        const triviaQuestions = await TriviaQuestion.find();
        res.status(200).json(triviaQuestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new trivia question
const createTriviaQuestion = async (req, res) => {
    const triviaQuestion = new TriviaQuestion({
        question_id: req.body.question_id,
        question_text: req.body.question_text,
        correct_answer: req.body.correct_answer,
        wrong_answers: req.body.wrong_answers
    });

    try {
        const newTriviaQuestion = await triviaQuestion.save();
        res.status(201).json(newTriviaQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllTriviaQuestions,
    createTriviaQuestion
};
