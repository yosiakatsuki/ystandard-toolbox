// @ts-ignore
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'extension-hidden-by-size': './src/blocks/block-library/extension-hidden-by-size/index.tsx',
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@aktk/function': path.resolve( __dirname, 'src/blocks/function' ),
			'@aktk/config': path.resolve( __dirname, 'src/js/config' ),
			'@aktk/components': path.resolve(
				__dirname,
				'src/blocks/components'
			),
			'@aktk/controls': path.resolve( __dirname, 'src/blocks/controls' ),
			'@aktk/api': path.resolve( __dirname, 'src/blocks/api' ),
			'@aktk/utils': path.resolve( __dirname, 'src/blocks/utils' ),
			'@aktk/helper': path.resolve( __dirname, 'src/js/helper' ),
			'@aktk/block-components': path.resolve(
				__dirname,
				'src/aktk-block-components'
			),
			'@aktk/plugin-settings': path.resolve(
				__dirname,
				'src/plugin-settings'
			),
		},
	},
};
