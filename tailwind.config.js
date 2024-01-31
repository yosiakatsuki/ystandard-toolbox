/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [ './src/**/*.{html,js,jsx,ts,tsx}' ],
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {
			colors: {
				'aktk-blue': '#07689f',
				'admin-gray': '#aaaaaa',
				'notice-error': '#ae3b43',
				'aktk-text-gray': 'var(--ys--global--text-color--gray)',
				'aktk-border-gray': 'var(--ys--global--border-color--gray)',
				'aktk-border-light-gray':
					'var(--ys--global--border-color--light-gray)',
			},
			fontFamily: {
				orbitron: [ 'Orbitron', 'sans-serif' ],
			},
		},
	},
	plugins: [],
};
