const defaultConfig = require( '@wordpress/scripts/config/.eslintrc.js' );

module.exports = {
	...defaultConfig,
	globals: {
		...defaultConfig.globals,
		ystdtbBlockEditor: true,
		ystdtbIconList: true,
		ystdtbPluginSettings: true,
	},
	rules: {
		...defaultConfig.rules,
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'@wordpress/no-unsafe-wp-apis': 'off',
	},
	parserOptions: {
		requireConfigFile: false,
	},
};
