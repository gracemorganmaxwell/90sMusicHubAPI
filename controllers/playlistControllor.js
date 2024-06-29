const Playlist = require('../models/playlist');

exports.getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPlaylist = async (req, res) => {
  try {
    const newPlaylist = new Playlist(req.body);
    const savedPlaylist = await newPlaylist.save();
    res.status(201).json(savedPlaylist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Implement other controller methods (getPlaylistById, updatePlaylist, deletePlaylist)
