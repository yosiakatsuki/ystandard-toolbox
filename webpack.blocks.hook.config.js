// @ts-ignore
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const pluginConfig = require( './webpack.blocks.v2.config.js' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		'hidden-by-size':
			'./src/blocks/block-library/block-hook-hidden-by-size/',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/build/block-hook/`,
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
