const router = require("express").Router();
const moment = require("moment");
const TxtBin = require("../models/txt_models");

router.post("/text-create", async (req, res) => {
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

router.get("/text-info/pb/:pb/id/:id", async (req, res) => {
	const { id, pb } = req.params;
	const selectedText = await TxtBin.findOne({ publisher: pb, _id: id });

	const noParams = !id || !pb;
	if (noParams) {
		return res.status(400).send({
			error: "Pb and Id Params are required"
		});
	}

	if (!selectedText) {
		return res.status(404).send({ error: "Text Info Not Found" });
	}

	res.send(selectedText);
});

module.exports = router;
