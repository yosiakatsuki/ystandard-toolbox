const defaultConfig = require( '@wordpress/scripts/config/.eslintrc.js' );
module.exports = {
	...defaultConfig,
	globals: {
		// @ts-ignore
		...defaultConfig.globals,
		ystdtbBlockEditor: true,
		ystdtbIconList: true,
		ystdtbAdminConfig: true,
		ystdtbPluginSettings: true,
	},
	rules: {
		// @ts-ignore
		...defaultConfig.rules,
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'@wordpress/no-unsafe-wp-apis': 'off',
	},
	parserOptions: {
		requireConfigFile: false,
	},
};
