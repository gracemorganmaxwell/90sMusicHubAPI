const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  genre: { type: String, required: true }
});

module.exports = mongoose.model('Artist', artistSchema);
