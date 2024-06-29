const Album = require('../models/album');

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAlbum = async (req, res) => {
  try {
    const newAlbum = new Album(req.body);
    const savedAlbum = await newAlbum.save();
    res.status(201).json(savedAlbum);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Implement other controller methods (getAlbumById, updateAlbum, deleteAlbum)
