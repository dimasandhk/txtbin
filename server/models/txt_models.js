const mongoose = require("mongoose");

const txtSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	publisher: {
		type: String,
		required: true
	},
	expire: {
		type: String,
		required: true
	}
});

const Txt = mongoose.model("TextBin", txtSchema);
module.exports = Txt;
