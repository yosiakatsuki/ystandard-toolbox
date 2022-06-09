const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'plugin-settings': './src/js/plugin-settings/index.js',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/dist/plugin-settings`,
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader',
				options: {
					name: '../font/[name].[ext]',
				},
			},
		],
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.alias,
			'@ystd/function': path.resolve(
				__dirname,
				'src/js/blocks/function'
			),
			'@ystd/config': path.resolve( __dirname, 'src/js/config' ),
			'@ystd/components': path.resolve( __dirname, 'src/js/component' ),
			'@ystd/controls': path.resolve( __dirname, 'src/js/controls' ),
			'@ystd/helper': path.resolve( __dirname, 'src/js/helper' ),
		},
	},
};
