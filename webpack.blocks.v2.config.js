const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
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
