const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title : {
    type: String,
    required: true,
  },
  releaseDate : {
    type: Date,
  },
  genre : {
    type: String,
    required: true,
  },
  director : {
    type: String,
  },
  description : {
    type: String,
    required: true,
  },
  trailerUrl : {
    type: String,
    required: true,
    unique: true,
  },
  topRated : {
    type: Boolean,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;