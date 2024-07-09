const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
	{
		id: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		artist: { type: String, required: true },
		releaseDate: { type: Date, required: true },
	},
	{ _id: false }
);

module.exports = mongoose.model("Album", albumSchema);
