const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );

module.exports = {
	mode: "production",
	entry: {
		'admin': './src/js/admin/admin.js',
		'heading': './src/js/admin/heading/index.js',
		'header-design': './src/js/admin/header-design/index.js',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/js/admin`
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
							]
						}
					}
				]
			},
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require( 'sass' ),
							sassOptions: {
								fiber: require( 'fibers' )
							},
						},
					},
				],
			}
		],
	},
	resolve: {
		extensions: [ '.js', '.vue' ],
		modules: [
			"node_modules"
		],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	performance: {
		maxEntrypointSize: 1000000,
		maxAssetSize: 1000000
	},
	plugins: [
		new VueLoaderPlugin()
	]
};
