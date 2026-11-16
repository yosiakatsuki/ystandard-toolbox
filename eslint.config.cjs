const { fixupConfigRules } = require( '@eslint/compat' );
const wordpressPlugin = require( '@wordpress/eslint-plugin' );
const jestPlugin = require( 'eslint-plugin-jest' );
const tailwindcssConfig = require( 'eslint-plugin-tailwindcss' ).configs[
	'flat/recommended'
];
const globals = require( 'globals' );

module.exports = [
	{
		ignores: [
			'**/build/**',
			'**/node_modules/**',
			'**/vendor/**',
			'blocks/**/deprecated/*.js',
		],
	},
	{ files: [ '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts' ] },
	...wordpressPlugin.configs.recommended,
	// Tailwind CSSの既存ルールをESLint10でも利用できるようにする。
	...fixupConfigRules( tailwindcssConfig ),
	// WordPressのVitest用設定を取り込まず、既存のJestテストを検証する。
	{
		...jestPlugin.configs[ 'flat/recommended' ],
		files: [
			'**/@(test|__tests__)/**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}',
			'**/*.@(test|spec).{js,jsx,ts,tsx,mjs,cjs,mts,cts}',
		],
	},
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
