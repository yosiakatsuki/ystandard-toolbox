/**
 * Jest config for integration (fixture-based) tests.
 *
 * Gutenberg コアと同じく test/integration/fixtures/blocks/ 配下の HTML/JSON ペアを
 * parse / serialize して比較する fixture-based test を実行する。
 */
module.exports = {
	rootDir: '../../',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: [ '<rootDir>/test/integration/setup-tests.js' ],
	moduleNameMapper: {
		'^@aktk/block-components/(.+)':
			'<rootDir>/src/aktk-block-components/$1',
		'^@aktk/plugin-settings/(.+)': '<rootDir>/src/plugin-settings/$1',
		'^@aktk/blocks/(.+)': '<rootDir>/src/blocks/$1',
		'^@aktk/api': '<rootDir>/src/blocks/api',
		'^@aktk/helper/(.+)': '<rootDir>/src/js/helper/$1',
		'^@aktk/components/(.+)': '<rootDir>/src/blocks/components/$1',
		'^@aktk/controls/(.+)': '<rootDir>/src/blocks/controls/$1',
		'^@aktk/utils/(.+)': '<rootDir>/src/blocks/utils/$1',
		'^@aktk/function/(.+)': '<rootDir>/src/blocks/function/$1',
		'^@aktk/config/(.+)': '<rootDir>/src/js/config/$1',
		'\\.css$': 'identity-obj-proxy',
		'\\.scss$': 'identity-obj-proxy',
	},
	preset: '@wordpress/jest-preset-default',
	transform: {
		'^.+\\.[tj]sx?$': 'babel-jest',
	},
	// node_modules 内の ESM パッケージ（parsel-js 等）も babel-jest で transform する.
	transformIgnorePatterns: [
		'/node_modules/(?!(parsel-js|@wordpress|@babel|change-case|memize|fast-deep-equal|uuid|marked|hast-util-|unist-util-|mdast-util-|micromark|decode-named-character-reference|character-entities|property-information|space-separated-tokens|comma-separated-tokens|web-namespaces|ccount|escape-string-regexp|markdown-table|zwitch|longest-streak|trim-lines)/)',
	],
	testMatch: [ '<rootDir>/test/integration/**/*.test.[jt]s?(x)' ],
	testPathIgnorePatterns: [
		'/.git/',
		'/node_modules/',
		'<rootDir>/build/',
		'<rootDir>/vendor/',
	],
};
