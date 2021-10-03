module.exports = {
	devServer: {
		watchOptions: {
			poll: true
		},
		proxy: {
			"/api": {
				target: "http://localhost:3000"
			},
			"/raw": {
				target: "http://localhost:3000"
			}
		}
	}
};
