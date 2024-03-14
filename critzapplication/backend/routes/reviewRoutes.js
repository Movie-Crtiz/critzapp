const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/reviewController');

// Routes
router.post('/reviews', async (req, res) => {
  try {
    const { userId, movieId, rating, reviewText  } = req.body;
    const newReview = await reviewController.addReview(userId, movieId, rating, reviewText );
    res.json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/reviews/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userReviews = await reviewController.getReviewByUser(userId);
    res.json(userReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/reviews/:movieId', async (req, res) => {
    try {
      const movieId = req.params.movieId;
      const userReviews = await reviewController.getReviewByMovie(movieId);
      res.json(userReviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/reviews', async (req, res) => {
  try {
    const allReviews = await reviewController.getAllUReviews();
    res.json(allReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;