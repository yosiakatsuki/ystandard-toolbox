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
	extends: [ ...defaultConfig.extends, 'plugin:tailwindcss/recommended' ],
	overrides: [
		// @ts-ignore
		...defaultConfig.overrides,
		{
			files: [ '**/*.ts', '**/*.tsx' ],
			parser: '@typescript-eslint/parser',
			plugins: [ '@typescript-eslint' ],
			rules: {
				'no-undef': 'off',
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						ignoreRestSiblings: true,
					},
				],
			},
		},
	],
	rules: {
		// @ts-ignore
		...defaultConfig.rules,
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'@wordpress/no-unsafe-wp-apis': 'off',
		'jsdoc/require-returns-description': 'off',
		'jsdoc/require-param-type': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'jsdoc/check-param-names': 'off',
		'tailwindcss/no-custom-classname': 'off',
		'tailwindcss/enforces-shorthand': 'off',
	},
	parserOptions: {
		requireConfigFile: false,
	},
};
