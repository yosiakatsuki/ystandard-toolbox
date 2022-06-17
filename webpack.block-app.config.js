const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'block-app': './src/js/blocks/app.js',
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
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.alias,
			'@aktk/function': path.resolve(
				__dirname,
				'src/js/blocks/function'
			),
			'@aktk/config': path.resolve( __dirname, 'src/js/config' ),
			'@aktk/components': path.resolve( __dirname, 'src/js/component' ),
			'@aktk/helper': path.resolve( __dirname, 'src/js/helper' ),
		},
	},
};
