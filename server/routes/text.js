const router = require("express").Router();
const moment = require("moment");
const TxtBin = require("../models/txt_models");

router.post("/create-text", async (req, res) => {
	const ExpireDate = moment().add(10, "days").calendar();
	const expire = moment(ExpireDate, "MM/DD/YYYY").format("YYYYMMDD");
	const NewText = new TxtBin({ ...req.body, expire });

	try {
		await NewText.save();
		res.send(NewText);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get("/pb/:pb/id/:id", async (req, res) => {
	res.send(await TxtBin.find({ publisher: req.params.pb, _id: req.params.id }));
});

module.exports = router;
