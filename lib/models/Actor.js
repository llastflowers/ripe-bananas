const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: String,
  pob: String
});

module.exports = mongoose.model('Actor', schema);
