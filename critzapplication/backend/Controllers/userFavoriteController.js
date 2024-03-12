const UserFavorite = require('../models/userFavorite');

const addUserFavorite = async (userId, movieId) => {
  try {
    const newUserFavorite = await UserFavorite.create({ userId, movieId });
    return newUserFavorite;
  } catch (error) {
    console.error('Error adding user favorite:', error);
    throw error;
  }
};

const getUserFavoriteByUser = async (userId) => {
  try {
    const userFavorites = await UserFavorite.find({ userId }).exec();
    return userFavorites;
  } catch (error) {
    console.error('Error getting user favorite by user:', error);
    throw error;
  }
};

const getAllUserFavorites = async () => {
  try {
    const allUserFavorite = await UserFavorite.find();
    return allUserFavorite;
  } catch (error) {
    throw new Error(`Error fetching all user favorite: ${error.message}`);
  }
};

module.exports = {
    addUserFavorite,
    getUserFavoriteByUser,
    getAllUserFavorites,
};