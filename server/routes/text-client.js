const router = require("express").Router();
const TxtBin = require("../models/txt_models");

const decode = (b64) => {
	return Buffer.from(b64, "base64").toString("ascii");
};

router.get("/raw/:data", async (req, res) => {
	const { data } = req.params;
	const noParams = !data;

	if (noParams) {
		return res.status(400).send({ error: "Params data are required" });
	}

	const objParams = {
		pb: decode(data.split(".")[0]),
		id: data.split(".")[1]
	};

	try {
		const filteredText = await TxtBin.findOne({ _id: objParams.id, publisher: objParams.pb });
		if (!filteredText) {
			return res.status(404).send({ error: "Text Not Found" });
		}

		res.setHeader("content-type", "text/plain").send(`${filteredText.text}`);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
