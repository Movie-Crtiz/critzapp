const mongoose = require('mongoose');

const userFavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
});

const UserFavorite = mongoose.model('UserFavorite', userFavoriteSchema);

module.exports = UserFavorite;