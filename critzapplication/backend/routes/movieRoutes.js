const express = require('express');
const router = express.Router();
const movieController = require('../Controllers/movieController');

// Routes
router.post('/movies', async (req, res) => {
  try {
    const { title, releaseDate, genre, director,description,trailerUrl,topRated} = req.body;
    const movie = await movieController.createMovie(title, releaseDate, genre, director,description,trailerUrl,topRated);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/movies/:movieId', async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movie = await movieController.getAllMovies(movieId);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/movies', async (req, res) => {
  try {
    const allMovies = await movieController.getAllMovies();
    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/movies/topMovies', async (req, res) => {
    try {
      const allMovies = await movieController.getAllTopMovies();
      res.json(allMovies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
