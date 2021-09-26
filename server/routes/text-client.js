const router = require("express").Router();
const TxtBin = require("../models/txt_models");

const decode = (b64) => {
	return Buffer.from(b64, "base64").toString("ascii");
};

router.get("/pb/:pb/text/:id", async (req, res) => {
	const { pb, id } = req.params;
	const noParams = !id || !pb;

	if (noParams) {
		return res.status(400).send({ error: "Params (id, pb) are required" });
	}

	const arrParams = [decode(pb), id];

	try {
		const filteredText = await TxtBin.findOne({ _id: arrParams[1], publisher: arrParams[0] });
		if (!filteredText) {
			return res.status(404).send({ error: "Text Not Found" });
		}

		res.setHeader("content-type", "text/plain").send(`${filteredText.text}`);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
