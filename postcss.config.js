module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: { grid: 'autoplace' },
		cssnano: {
			preset: [
				'default',
				{ minifyFontValues: { removeQuotes: false } },
			],
		},
		'css-declaration-sorter': { order: 'smacss' },
	},
};
