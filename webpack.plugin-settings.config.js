const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'plugin-settings': './src/js/plugin-settings/index.js',
		'ystdtb-settings-v2': './src/js/plugin-settings/start-page/index.js',
		'add-code': './src/js/plugin-settings/add-code/index.js',
	},
	output: {
		filename: '[name].js',
		path: `${ __dirname }/dist/plugin-settings`,
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
			'@aktk/controls': path.resolve( __dirname, 'src/js/controls' ),
			'@aktk/helper': path.resolve( __dirname, 'src/js/helper' ),
			'@aktk/api': path.resolve( __dirname, 'src/js/api' ),
		},
	},
	performance: {
		maxEntrypointSize: 500000,
		maxAssetSize: 500000,
	},
	cache: false,
};
