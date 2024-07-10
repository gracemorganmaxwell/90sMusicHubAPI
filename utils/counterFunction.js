// counterFunction.js
const Counter = require("../models/counter");

const getNextSequenceValue = async (sequenceName) => {
	const sequenceDocument = await Counter.findOneAndUpdate(
		{ id: sequenceName },
		{ $inc: { sequence_value: 1 } },
		{ new: true }
	);
	return sequenceDocument.sequence_value;
};

module.exports = getNextSequenceValue;
