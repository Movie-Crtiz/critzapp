const express = require('express');
const router = express.Router();
const userFavoriteController = require('../Controllers/userFavoriteController');

// Routes
router.post('/userFavorites', async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    const newUserFavorite = await userFavoriteController.addUserFavorite(userId, movieId);
    res.json(newUserFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/userFavorites/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userFavorites = await userFavoriteController.getUserFavoriteByUser(userId);
    res.json(userFavorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/userFavorites', async (req, res) => {
  try {
    const allUserFavorites = await userFavoriteController.getAllUserFavorites();
    res.json(allUserFavorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;