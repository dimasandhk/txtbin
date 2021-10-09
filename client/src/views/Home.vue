<template>
	<div class="home container text-center mt-3">
		<h1>Welcome to Txt<span>Bin</span></h1>
		<h4>A Place to Paste Your Temporary Text</h4>
		<div class="row justify-content-center">
			<div class="col-12 col-md-8 col-lg-8">
				<router-link
					class="btn btn-primary btn-block shadow-none btn-lg mt-4"
					:to="{ name: 'Email Auth' }"
					>Get Started</router-link
				>
				<p class="mt-2">No login required - create and share right away.</p>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: "Home"
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";
.home {
	h1 {
		font-weight: 700;
	}
	.btn {
		@include mainButton();
	}
	p {
		color: darken($color: #acacac, $amount: 10%);
	}
	padding: 30px;
}
</style>
