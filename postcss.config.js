module.exports = {
	plugins: {
		'postcss-preset-env': {
			stage: 2,
			features: {
				'nesting-rules': true,
				'custom-media-queries': true,
				'media-query-ranges': true,
				'custom-properties': false,
				'cascade-layers': false,
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
