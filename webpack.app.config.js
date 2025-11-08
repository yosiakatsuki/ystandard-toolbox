const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const ystdtbConfig = require( './webpack.blocks.config' );

module.exports = {
	...defaultConfig,
	entry: {
		app: './src/js/app/app.js',
		'app-ie': './src/js/app/app-ie.js',
		overlay: './src/js/app/overlay.js',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/js/app`,
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
