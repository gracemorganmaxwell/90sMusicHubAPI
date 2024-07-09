const Album = require("../models/album");

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

exports.getAlbumById = async (req, res) => {
	try {
		const album = await Album.findOne({ id: req.params.albumId });
		if (!album) return res.status(404).json({ error: "Album not found" });
		res.json(album);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.updateAlbum = async (req, res) => {
	try {
		const updatedAlbum = await Album.findOneAndUpdate(
			{ id: req.params.albumId },
			req.body,
			{ new: true }
		);
		if (!updatedAlbum)
			return res.status(404).json({ error: "Album not found" });
		res.json(updatedAlbum);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.deleteAlbum = async (req, res) => {
	try {
		const deletedAlbum = await Album.findOneAndDelete({
			id: req.params.albumId,
		});
		if (!deletedAlbum)
			return res.status(404).json({ error: "Album not found" });
		res.status(204).send();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
