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
			'@ystdtb/function': path.resolve( __dirname, 'src/js/blocks/function' ),
			'@ystdtb/config': path.resolve( __dirname, 'src/js/config' ),
			'@ystdtb/components': path.resolve( __dirname, 'src/js/component' ),
			'@ystdtb/helper': path.resolve( __dirname, 'src/js/helper' ),
		}
	},
};
