const defaultConfig = require( "@wordpress/scripts/config/webpack.config" );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	mode: 'production',
	entry: {
		'block-app': './src/js/blocks/app.js',
		'app-slider': './blocks/slider/app.js',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/js/app`
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
							presets: [
								'@babel/env',
							],
							targets: {
								ie: '11',
								esmodules: true
							}
						}
					}
				]
			}
		]
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.alias,
			'@ystd/function': path.resolve( __dirname, 'src/js/blocks/function' ),
			'@ystd/config': path.resolve( __dirname, 'src/js/config' ),
			'@ystd/components': path.resolve( __dirname, 'src/js/component' ),
			'@ystd/helper': path.resolve( __dirname, 'src/js/helper' ),
		}
	},
};
