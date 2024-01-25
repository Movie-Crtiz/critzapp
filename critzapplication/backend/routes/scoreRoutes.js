const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// Routes
router.post('/scores', async (req, res) => {
  try {
    const { playerId, score } = req.body;
    const newScore = await scoreController.addScore(playerId, score);
    res.json(newScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/scores/:playerId', async (req, res) => {
  try {
    const playerId = req.params.playerId;
    const scores = await scoreController.getScoresByPlayer(playerId);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;