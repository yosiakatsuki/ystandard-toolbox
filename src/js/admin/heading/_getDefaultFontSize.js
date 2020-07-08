const defaultFontSize = {
	h1: 1.4,
	h2: 1.3,
	h3: 1.2,
	h4: 1.1,
	h5: 1.1,
	h6: 1.0
};

export default function getDefaultFontSize( level ) {
	return defaultFontSize[ level ];
}
