const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		block: './src/js/blocks/block.js',
		//styles: './blocks/styles/index.js',
		//posts: './blocks/posts/index.js',
		//timeline: './blocks/timeline/index.js',
		//'timeline-item': './blocks/timeline/item/index.js',
		//faq: './blocks/faq/index.js',
		//'faq-item': './blocks/faq/item/index.js',
		'icon-list': './blocks/icon-list/index.js',
		'icon-list-item': './blocks/icon-list-item/index.js',
		//slider: './blocks/slider/index.js',
		//'slider-item': './blocks/slider/item/index.js',
		//'description-list': './blocks/description-list/index.js',
		//'description-list-dt': './blocks/description-list/dt/index.js',
		//'description-list-dd-simple':
		//	'./blocks/description-list/dd-simple/index.js',
		//'description-list-dd-box': './blocks/description-list/dd-box/index.js',
		// 'description-list-column':
		// 	'./blocks/description-list/dl-column/index.js',
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
