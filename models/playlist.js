const mongoose = require("mongoose");
const getNextSequenceValue = require("../utils/getNextSequenceValue");

const playlistSchema = new mongoose.Schema({
	id: { type: Number, unique: true },
	name: { type: String, required: true },
	tracks: { type: [String], required: true },
});

playlistSchema.pre("save", async function (next) {
	if (this.isNew) {
		this.id = await getNextSequenceValue("playlistId");
	}
	next();
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
