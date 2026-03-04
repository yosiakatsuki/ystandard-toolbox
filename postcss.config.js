module.exports = {
	plugins: {
		'postcss-preset-env': {
			stage: 2,
			features: {
				'nesting-rules': true,
				'media-query-ranges': true,
			},
		},
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
