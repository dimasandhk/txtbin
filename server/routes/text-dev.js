const router = require("express").Router();
const TxtBin = require("../models/txt_models");

router.post("/text-create", async (req, res) => {
	const encoded = Buffer.from(req.body.publisher).toString("base64");
	const NewText = new TxtBin({ ...req.body, encoded });

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
