const wordpressConfig = require( '@wordpress/scripts/config/eslint.config.cjs' );
const tailwindcssConfig = require( 'eslint-plugin-tailwindcss' ).configs[
	'flat/recommended'
];
const globals = require( 'globals' );

module.exports = [
	{
		ignores: [ 'blocks/**/deprecated/*.js' ],
	},
	...wordpressConfig,
	...tailwindcssConfig,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				ystdtbBlockEditor: 'readonly',
				ystdtbIconList: 'readonly',
				ystdtbAdminConfig: 'readonly',
				ystdtbPluginSettings: 'readonly',
			},
			parserOptions: {
				requireConfigFile: false,
			},
		},
		rules: {
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
	},
	{
		files: [ '**/*.ts', '**/*.tsx' ],
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
];
