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

router.get("/text-info/id/:id", async (req, res) => {
	const { id } = req.params;

	const noParams = !id;
	if (noParams) {
		return res.status(400).send({
			error: "Id Param are required"
		});
	}

	try {
		const selectedText = await TxtBin.findById(id);
		if (!selectedText) {
			return res.status(404).send({ error: "Text Info Not Found" });
		}

		res.send(selectedText);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
