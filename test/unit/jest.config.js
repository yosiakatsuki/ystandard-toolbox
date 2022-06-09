module.exports = {
	rootDir: '../../',
	moduleNameMapper: {
		'^@aktk/(.+)': '<rootDir>/src/js/$1',
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
