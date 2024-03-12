const Movie = require('../Models/movieModel');

// Controller functions
const createMovie = async (title, releaseDate, genre, director,description,trailerUrl,topRated) => {
  try {
    const movie = await Movie.create({ title, releaseDate, genre, director,description,trailerUrl ,topRated});
    return movie;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
};

const getMovieById = async (movieId) => {
  try {
    const movie = await Movie.findOne({ movieId }).exec();
    return movie;
  } catch (error) {
    console.error('Error getting movie by email:', error);
    throw error;
  }
};

const getAllMovies = async () => {
  try {
    const allMovies = await Movie.find();
    return allMovies;
  } catch (error) {
    throw new Error(`Error fetching all movies: ${error.message}`);
  }
};

const getAllTopMovies = async () => {
    try {
    const allMovies = await Movie.find({ topRated: true });
      return allMovies;
    } catch (error) {
      throw new Error(`Error fetching all movies: ${error.message}`);
    }
  };

module.exports = {
    createMovie,
  getMovieById,
  getAllMovies,
  getAllTopMovies,
};
