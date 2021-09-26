const router = require("express").Router();

router.get("/pb/:pb/text/:id", async (req, res) => {
	const { pb, id } = req.params;
	const noParams = !id || !pb;
});

module.exports = router;
