const defaultConfig = require( "@wordpress/scripts/config/webpack.config" );

module.exports = {
	...defaultConfig,
	entry: {
		'app': './src/js/blocks/app.js',
		'block': './src/js/blocks/block.js',
		'styles': './blocks/styles/index.js',
		'posts': './blocks/posts/index.js',
		'timeline': './blocks/timeline/index.js',
		'timeline-item': './blocks/timeline/item/index.js',
		'faq': './blocks/faq/index.js',
		'faq-item': './blocks/faq/item/index.js',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/js/blocks`
	},
	module: {
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader?name=../font/[name].[ext]'
			}
		]
	}
};
