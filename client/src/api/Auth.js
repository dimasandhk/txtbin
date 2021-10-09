import axios from "redaxios";

export default class {
	static async verifyEmail(em) {
		const res = await (await axios.get(`/api/auth-email?em=${em}`)).data;
		return res;
	}

	static async setCookie(em, cotp) {
		const res = await (await axios.get(`/api/verify-user?em=${em}&cotp=${cotp}`)).data;
		return res;
	}

	static async isVerifiedUser() {
		const res = await (await axios.get("/api/isverified")).data;
		return res;
	}

	static async createNewText(text) {
		const response = await axios.post("/api/text-create", { text });
		return response.data;
	}
}
