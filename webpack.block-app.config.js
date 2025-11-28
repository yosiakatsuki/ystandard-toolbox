const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const ystdtbConfig = require( './webpack.blocks.config' );

module.exports = {
	...defaultConfig,
	entry: {
		'app-slider': './blocks/slider/app.js',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/js/block-app`,
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/env' ],
							targets: {
								ie: '11',
								esmodules: true,
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		...ystdtbConfig.resolve,
	},
};
