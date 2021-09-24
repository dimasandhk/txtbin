const mongoose = require("mongoose");
mongoose.connect(
	"mongodb://127.0.0.1:27017/txtbin",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	(err) => {
		if (!err) return console.log("Connected");
		console.error(err);
	}
);
