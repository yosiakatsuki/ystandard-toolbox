module.exports = {
	rootDir: '../../',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: [ '<rootDir>/test/unit/setup-tests.js' ],
	moduleNameMapper: {
		'^@aktk/block-components/(.+)':
			'<rootDir>/src/aktk-block-components/$1',
		'\\.css$': 'identity-obj-proxy',
	},
	preset: '@wordpress/jest-preset-default',
	transform: {
		'^.+\\.[tj]sx?$': 'babel-jest',
	},
	testMatch: [
		'<rootDir>/src/aktk-block-components/**/*.test.[jt]s?(x)',
		'<rootDir>/src/plugin-settings/**/*.test.[jt]s?(x)',
	],
	testPathIgnorePatterns: [
		'/.git/',
		'/node_modules/',
		'<rootDir>/js/',
		'<rootDir>/src/js/admin/',
		'<rootDir>/library/',
		'<rootDir>/vendor/',
		'<rootDir>/temp/',
	],
	errorOnDeprecated: true,
};
