const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const ystdtbConfig = require( './webpack.blocks.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'plugin-settings': './src/plugin-settings/index.js',
		'ystdtb-settings-v2': './src/plugin-settings/start-page/index.js',
		'add-code': './src/plugin-settings/add-code/index.js',
		design: './src/plugin-settings/design/index.js',
		'block-patterns': './src/plugin-settings/block-patterns/index.js',
		'custom-css': './src/plugin-settings/custom-css/index.js',
		font: './src/plugin-settings/font/index.js',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/build/plugin-settings`,
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
