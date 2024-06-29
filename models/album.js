const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  artist: { type: String, required: true },
  releaseDate: { type: String, required: true }
});

module.exports = mongoose.model('Album', albumSchema);
