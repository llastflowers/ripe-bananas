const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    required: true
  },
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
});

module.exports = mongoose.model('Review', schema);
