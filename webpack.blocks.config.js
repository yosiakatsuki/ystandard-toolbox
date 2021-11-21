const defaultConfig = require( "@wordpress/scripts/config/webpack.config" );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	mode: 'production',
	entry: {
		'app': './src/js/blocks/app.js',
		'app-slider': './blocks/slider/app.js',
		'block': './src/js/blocks/block.js',
		'styles': './blocks/styles/index.js',
		'posts': './blocks/posts/index.js',
		'timeline': './blocks/timeline/index.js',
		'timeline-item': './blocks/timeline/item/index.js',
		'faq': './blocks/faq/index.js',
		'faq-item': './blocks/faq/item/index.js',
		'sns-share': './blocks/sns-share/index.js',
		'icon-list': './blocks/icon-list/index.js',
		'box': './blocks/box/index.js',
		'parts': './blocks/parts/index.js',
		'banner-link': './blocks/banner-link/index.js',
		'slider': './blocks/slider/index.js',
		'slider-item': './blocks/slider/item/index.js',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/js/blocks`
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
						loader: 'css-loader'
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader',
				options: {
					name: '../font/[name].[ext]'
				}
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
