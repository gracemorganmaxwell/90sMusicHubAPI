const mongoose = require("mongoose");
const getNextSequenceValue = require("../utils/counterFunction");

const artistSchema = new mongoose.Schema({
	id: { type: Number, unique: true },
	name: { type: String, required: true },
	genre: { type: String, required: true },
});

artistSchema.pre("save", async function (next) {
	if (this.isNew) {
		this.id = await getNextSequenceValue("artistId");
	}
	next();
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
