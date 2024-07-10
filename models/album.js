const mongoose = require("mongoose");
const getNextSequenceValue = require("../utils/counterFunction");

const albumSchema = new mongoose.Schema({
	_id: { type: Number, required: true },
	id: { type: String, required: true },
	name: { type: String, required: true },
	artist: { type: String, required: true },
	releaseDate: { type: Date, required: true },
});

albumSchema.pre("save", async function (next) {
	if (this.isNew) {
		this._id = await getNextSequenceValue("albumid");
	}
	next();
});

module.exports = mongoose.model("Album", albumSchema);
