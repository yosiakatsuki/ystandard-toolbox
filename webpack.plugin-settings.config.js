const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const ystdtbConfig = require("./webpack.blocks.config");

module.exports = {
	...defaultConfig,
	entry: {
		"plugin-settings": "./src/plugin-settings/",
		"ystdtb-settings-v2": "./src/plugin-settings/start-page/",
		"add-code": "./src/plugin-settings/add-code/",
		design: "./src/plugin-settings/design/",
		"block-patterns": "./src/plugin-settings/block-patterns/",
		"custom-css": "./src/plugin-settings/custom-css/",
		font: "./src/plugin-settings/font/",
		cta: "./src/plugin-settings/cta/",
		"heading-v2": "./src/plugin-settings/heading/",
	},
	output: {
		filename: "[name].js",
		path: `${__dirname}/build/plugin-settings`,
	},
	resolve: {
		...ystdtbConfig.resolve,
	},
	performance: {
		maxEntrypointSize: 500000,
		maxAssetSize: 500000,
	},
	cache: false,
};
