const Playlist = require("../models/playlist");

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

exports.getPlaylistById = async (req, res) => {
	try {
		const playlist = await Playlist.findById(req.params.id);
		if (!playlist) return res.status(404).json({ error: "Playlist not found" });
		res.json(playlist);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.updatePlaylist = async (req, res) => {
	try {
		const updatedPlaylist = await Playlist.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.json(updatedPlaylist);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.deletePlaylist = async (req, res) => {
	try {
		await Playlist.findByIdAndDelete(req.params.id);
		res.status(204).end();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
