const mongoose = require("mongoose");
const now = new Date();

const txtSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true
		},
		publisher: {
			type: String,
			required: true
		},
		encoded: {
			type: String,
			required: true
		},
		expireAt: { type: Date, default: now.setDate(now.getDate() + parseInt(10)) }
	},
	{ timestamps: true }
);

const Txt = mongoose.model("TextBin", txtSchema);
module.exports = Txt;
