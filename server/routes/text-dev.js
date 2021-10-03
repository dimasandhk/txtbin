const router = require("express").Router();
const TxtBin = require("../models/txt_models");
require("dotenv").config();

const mailjet = require("node-mailjet").connect(
	process.env.MJ_APIKEY_PUBLIC,
	process.env.MJ_APIKEY_PRIVATE
);

const decode = (b64) => {
	return Buffer.from(b64, "base64").toString("ascii");
};
/* 
	Flow:
	- Client input email => verify (/api/auth-email?em={email})
	- Verified set variable => redir Dashboard
	- Dashboard => Create Temp Text (/api/text-create)
*/

const generateOtp = require("../utils/OTP");
const { isEmail } = require("validator");

router.post("/text-create", async (req, res) => {
	const vid = req.cookies.vid;
	const isValidEmail = isEmail(decode(vid));
	if (!isValidEmail)
		return res.status(400).send({
			error: "Email isn't valid"
		});

	// Encode Email
	const NewText = new TxtBin({ ...req.body, encoded: vid, publisher: decode(vid) });

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

let AUTH_INFO = {};

router.get("/auth-email", async (req, res) => {
	const email = req.query.em;
	if (email) {
		if (!isEmail(email)) return res.status(400).send({ error: "Email isn't valid" });
	} else {
		return res.status(400).send({ error: "Email Query is required!" });
	}

	const OTP = generateOtp();
	AUTH_INFO = { OTP, email };
	console.log(AUTH_INFO, OTP);

	try {
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: "dimasandhikadiputra@gmail.com",
						Name: "TxtBin Admin"
					},
					To: [
						{
							Email: email
						}
					],
					Subject: "TxtBin - Verify your Email",
					HTMLPart: `
					<h3>Hi Welcome to TxtBin!</h3>
					<p>Your Verification Code is <b>${OTP}</b>, never share your OTP to anyone!</p>
					`
				}
			]
		});

		res.send({ code: OTP });
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/verify-user", (req, res) => {
	const { em, cotp } = req.query;
	if (!em || !cotp) return res.status(400).send({ error: "Email is required" });

	console.log(AUTH_INFO, em, cotp);
	if (!Object.keys(AUTH_INFO).length) return res.status(401).send({ error: "data isn't valid" });
	// if (Object.keys(AUTH_INFO).length) return res.status(401).send({ error: "data isn't valid" });

	if (parseInt(cotp) == AUTH_INFO.OTP && em == AUTH_INFO.email) {
		res.cookie("vid", Buffer.from(em).toString("base64"), { sameSite: true });
		return res.send("verified");
	}

	res.status(401).send({ error: "data isn't valid" });
});

router.get("/isverified", async (req, res) => {
	const { vid } = req.cookies;

	if (!vid) return res.status(401).send({ error: "User isn't verified" });

	const validEmail = isEmail(decode(vid));
	if (!validEmail) return res.status(401).send({ error: "User isn't verified" });

	res.send("User is verified");
});

module.exports = router;
