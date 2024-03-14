const Review = require('../Models/reviewModel');

const addReview = async (userId, movieId, rating, reviewText ) => {
  try {
    const newReview = await Review.create({ userId, movieId , rating, reviewText });
    return newReview;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

const getReviewByUser = async (userId) => {
  try {
    const reviews = await Review.find({ userId }).exec();
    return reviews;
  } catch (error) {
    console.error('Error getting ureviewe by user:', error);
    throw error;
  }
};

const getReviewByMovie = async (movieId) => {
    try {
      const reviews = await Review.find({ movieId }).exec();
      return reviews;
    } catch (error) {
      console.error('Error getting review by moview:', error);
      throw error;
    }
  };

const getAllUReviews = async () => {
  try {
    const allReview = await Review.find();
    return allReview;
  } catch (error) {
    throw new Error(`Error fetching all review: ${error.message}`);
  }
};

module.exports = {
    addReview,
    getReviewByUser,
    getReviewByMovie,
    getAllUReviews,
};