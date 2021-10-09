<template>
	<div class="dashboard-txt container mt-3">
		<h3>Dashboard ({{ user.email }})</h3>
		<div class="row">
			<div class="col-12 col-md-12 col-lg-6">
				<button :class="buttonTab" v-if="curr_tab == 'db'" @click="switchTab">
					Create New
				</button>
				<button :class="buttonTab" v-else @click="switchTab">
					Back To Dashboard
				</button>
			</div>
		</div>
		<div v-if="curr_tab == 'db'">
			<h5 class="mt-3">Created Texts:</h5>
			<div class="row">
				<div class="col-12 col-md-12 col-lg-6 mt-2" v-for="text in texts" :key="text._id">
					<div class="text-card">
						<h5>Expire: {{ text.expireAt.split("T")[0] }}</h5>
						<p>{{ text.text }}</p>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="row">
				<div class="col-12 col-md-12 col-lg-8 mt-3">
					<form @submit="postText">
						<textarea v-model="inputValue" class="form-control" cols="5" rows="10"></textarea>
						<button class="btn btn-primary shadow-none mt-2" type="submit">Create New Text</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import auth from "../api/Auth.js";
export default {
	data: () => ({
		curr_tab: "db",
		user: {},
		texts: [],
		buttonTab: "btn btn-primary btn-block shadow-none",
		inputValue: ""
	}),
	async mounted() {
		const userInfo = await auth.isVerifiedUser();
		this.texts = [...userInfo.createdTexts];
		this.user = userInfo;
	},
	methods: {
		switchTab() {
			if (this.curr_tab == "db") return (this.curr_tab = "crt");
			this.curr_tab = "db";
		},
		async postText(ev) {
			ev.preventDefault();
			const res = await auth.createNewText(this.inputValue);
			console.log(res);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";
.dashboard-txt {
	.text-card {
		border-radius: 10px;
		padding: 30px;
		height: 100%;
		border: 1px solid #acacac;
	}
	.btn-primary {
		@include mainButton();
	}
	textarea {
		resize: none;
	}
	padding-bottom: 100px;
	padding-top: 30px;
}
</style>
