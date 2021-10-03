import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import auth from "@/api/Auth";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/auth-email",
		name: "Email Auth",
		component: () => import("../views/EmailAuth.vue"),
		beforeEnter: async function(to, from, next) {
			let isVerified;
			try {
				await auth.isVerifiedUser();
				isVerified = true;
			} catch (err) {
				isVerified = false;
			}

			if (isVerified) return next("/dashboard");
			next();
		}
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: () => import("../views/Dashboard.vue"),
		beforeEnter: async function(to, from, next) {
			try {
				await auth.isVerifiedUser();
				next();
			} catch (err) {
				next("/auth-email");
			}
		}
	}
	// {
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
