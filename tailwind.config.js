/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [ './src/**/*.{html,js,jsx,ts,tsx}' ],
	theme: {
		extend: {
			colors: {
				'aktk-blue': '#07689f',
				'admin-gray': '#aaaaaa',
				'notice-error': '#ae3b43',
			},
			fontFamily: {
				orbitron: [ 'Orbitron', 'sans-serif' ],
			},
		},
	},
	plugins: [],
};
