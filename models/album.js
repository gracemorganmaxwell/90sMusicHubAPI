const mongoose = require("mongoose");
const getNextSequenceValue = require("../utils/getNextSequenceValue");

const albumSchema = new mongoose.Schema({
	id: { type: Number, unique: true },
	name: { type: String, required: true },
	artist: { type: String, required: true },
	releaseDate: { type: Date, required: true },
});

albumSchema.pre("save", async function (next) {
	if (this.isNew) {
		this.id = await getNextSequenceValue("albumId");
	}
	next();
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
