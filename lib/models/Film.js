const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  role: String,
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true
  }
});

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true
  }, 
  cast: [castSchema]
}, {
  toJSON: {
    virtuals: true
  }
});

schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'film',
});

module.exports = mongoose.model('Film', schema);
