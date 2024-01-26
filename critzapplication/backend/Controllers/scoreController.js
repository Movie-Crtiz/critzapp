const Score = require('../models/scoreModel');

const addScore = async (playerId, score) => {
  try {
    const newScore = await Score.create({ playerId, score });
    return newScore;
  } catch (error) {
    console.error('Error adding score:', error);
    throw error;
  }
};

const getScoresByPlayer = async (playerId) => {
  try {
    const scores = await Score.find({ playerId }).exec();
    return scores;
  } catch (error) {
    console.error('Error getting scores by player:', error);
    throw error;
  }
};

const getAllScores = async () => {
  try {
    const allScores = await Score.find();
    return allScores;
  } catch (error) {
    throw new Error(`Error fetching all scores: ${error.message}`);
  }
};

module.exports = {
  addScore,
  getScoresByPlayer,
  getAllScores,
};