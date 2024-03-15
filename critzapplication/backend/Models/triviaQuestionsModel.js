const mongoose = require('mongoose');

const triviaQuestionSchema = new mongoose.Schema({
    question_id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    question_text: { 
        type: String, 
        required: true 
    },
    correct_answer: { 
        type: String, 
        required: true 
    },
    wrong_answers: { 
        type: [String], 
        required: true 
    }
});

const TriviaQuestion = mongoose.model('TriviaQuestion', triviaQuestionSchema);

module.exports = TriviaQuestion;