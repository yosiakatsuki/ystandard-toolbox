const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		block: './src/js/blocks/block.js',
		styles: './blocks/styles/index.js',
		extension: './blocks/extension/index.js',
		posts: './blocks/posts/index.js',
		timeline: './blocks/timeline/index.js',
		'timeline-item': './blocks/timeline/item/index.js',
		faq: './blocks/faq/index.js',
		'faq-item': './blocks/faq/item/index.js',
		'sns-share': './blocks/sns-share/index.js',
		'icon-list': './blocks/icon-list/index.js',
		box: './blocks/box/index.js',
		parts: './blocks/parts/index.js',
		'banner-link': './blocks/banner-link/index.js',
		slider: './blocks/slider/index.js',
		'slider-item': './blocks/slider/item/index.js',
		'description-list': './blocks/description-list/index.js',
		'description-list-dt': './blocks/description-list/dt/index.js',
		'description-list-dd-simple':
			'./blocks/description-list/dd-simple/index.js',
		'description-list-dd-box': './blocks/description-list/dd-box/index.js',
		'description-list-column':
			'./blocks/description-list/dl-column/index.js',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/dist/blocks`,
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
			...defaultConfig.resolve.alias,
			'@aktk/function': path.resolve( __dirname, 'src/block-function' ),
			'@aktk/config': path.resolve( __dirname, 'src/js/config' ),
			'@aktk/components': path.resolve(
				__dirname,
				'src/block-components'
			),
			'@aktk/controls': path.resolve( __dirname, 'src/block-controls' ),
			'@aktk/api': path.resolve( __dirname, 'src/block-api' ),
			'@aktk/helper': path.resolve( __dirname, 'src/js/helper' ),
			'@aktk/plugin-settings/components': path.resolve(
				__dirname,
				'src/plugin-settings/components'
			),
		},
	},
};
