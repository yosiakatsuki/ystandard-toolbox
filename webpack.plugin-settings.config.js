// @ts-ignore
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const pluginConfig = require( './webpack.blocks.v2.config.js' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		'plugin-settings': './src/plugin-settings/',
		'ystdtb-settings-v2': './src/plugin-settings/start-page/',
		'add-code': './src/plugin-settings/add-code/',
		design: './src/plugin-settings/design/',
		'block-patterns': './src/plugin-settings/block-patterns/',
		'custom-css': './src/plugin-settings/custom-css/',
		font: './src/plugin-settings/font/',
		cta: './src/plugin-settings/cta/',
		'heading-v2': './src/plugin-settings/heading/',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/build/plugin-settings`,
	},
	resolve: {
		...pluginConfig.resolve,
		alias: {
			...pluginConfig.resolve.alias,
		},
	},
	performance: {
		maxEntrypointSize: 500000,
		maxAssetSize: 500000,
	},
	cache: false,
};
