const Counter = require("../models/counter");

const getNextSequenceValue = async (sequenceName) => {
	const counter = await Counter.findByIdAndUpdate(
		sequenceName,
		{ $inc: { sequenceValue: 1 } },
		{ new: true, upsert: true }
	);

	return counter.sequenceValue;
};

module.exports = getNextSequenceValue;
