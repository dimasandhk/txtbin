const router = require("express").Router();
const TxtBin = require("../models/txt_models");

router.post("/text/new", async (req, res) => {
	const NewText = new TxtBin(req.body);

	try {
		await NewText.save();
		res.send(NewText);
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
