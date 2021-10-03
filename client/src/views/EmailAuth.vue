<template>
	<div class="email-auth container mt-3 text-center">
		<h1>Verify Your Email</h1>
		<h4>Once verified, you don't have to do it again</h4>
		<div class="row justify-content-center mt-4">
			<div class="col-12 col-md-12 col-lg-8">
				<!-- Input Email -->
				<form @submit="verifyEmail" v-if="!Object.keys(AUTH_INFO).length">
					<div class="input-group mb-3">
						<input
							v-model="email"
							type="email"
							class="form-control shadow-none"
							placeholder="Email..."
							required
						/>
						<div class="input-group-append">
							<button class="btn btn-primary shadow-none" type="submit">
								Send Code
							</button>
						</div>
					</div>
				</form>
				<!-- Input OTP Code -->
				<form v-else @submit="compareOtp">
					<div class="input-group mb-3">
						<input
							v-model="OTP"
							type="text"
							class="form-control shadow-none"
							placeholder="Otp..."
							required
						/>
						<div class="input-group-append">
							<button class="btn btn-primary shadow-none" type="submit">
								Submit Code
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import auth from "@/api/Auth";

export default {
	data: () => ({
		email: "",
		AUTH_INFO: {},
		OTP: ""
	}),
	methods: {
		async verifyEmail(ev) {
			ev.preventDefault();
			this.AUTH_INFO = await auth.verifyEmail(this.email);
			sessionStorage.setItem("TMP_INFO", JSON.stringify({ ...this.AUTH_INFO, email: this.email }));

			this.email = "";
		},
		async compareOtp(ev) {
			ev.preventDefault();
			const USER = JSON.parse(sessionStorage.getItem("TMP_INFO"));

			try {
				console.log(await auth.setCookie(USER.email, this.OTP));
				this.$router.push("/dashboard");
			} catch (err) {
				alert("Wrong OTP Code!");
			}

			this.OTP = "";
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";
.email-auth {
	h1 {
		font-weight: 700;
	}
	padding: 30px;
}

.input-group {
	button {
		@include mainButton();
	}
}
</style>
