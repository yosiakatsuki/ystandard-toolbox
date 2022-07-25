module.exports = {
	rootDir: '../../',
	moduleNameMapper: {
		'^@aktk/function/(.+)': '<rootDir>/src/block-function/$1',
		'^@aktk/config': '<rootDir>/src/js/config',
		'^@aktk/config/(.+)': '<rootDir>/src/js/config/$1',
		'^@aktk/components/(.+)': '<rootDir>/src/block-components/$1',
		'^@aktk/helper/(.+)': '<rootDir>/src/js/helper/$1',
		'^@aktk/helper': '<rootDir>/src/js/helper',
	},
	preset: '@wordpress/jest-preset-default',
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
	testURL: 'http://localhost:10020/',
	testPathIgnorePatterns: [
		'/.git/',
		'/node_modules/',
		'<rootDir>/js/',
		'<rootDir>/src/js/admin/',
		'<rootDir>/library/',
		'<rootDir>/vendor/',
		'<rootDir>/temp/',
	],
};
