const defaultConfig = require( '@wordpress/scripts/config/.eslintrc.js' );

module.exports = {
	...defaultConfig,
	globals: {
		...defaultConfig.globals,
		ystdtbBlockEditor: true,
		ystdtbIconList: true,
	},
	rules: {
		...defaultConfig.rules,
		'import/no-unresolved': 'off',
		'@wordpress/no-unsafe-wp-apis': 'off',
	},
	parserOptions: {
		requireConfigFile: false,
	},
};
