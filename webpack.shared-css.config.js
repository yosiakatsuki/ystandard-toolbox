const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'aktk-components-editor':
			'./src/aktk-block-components/index.css',
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'build/shared' ),
	},
};
