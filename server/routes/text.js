const router = require("express").Router();
const moment = require("moment");
const TxtBin = require("../models/txt_models");

router.post("/text/new", async (req, res) => {
	const ExpireDate = moment().add(10, "days").calendar();
	const expire = moment(ExpireDate, "MM/DD/YYYY").format("YYYYMMDD");
	const NewText = new TxtBin({ ...req.body, expire });

	try {
		await NewText.save();
		res.send(NewText);
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
