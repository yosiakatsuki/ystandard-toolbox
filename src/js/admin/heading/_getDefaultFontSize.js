const defaultFontSize = {
	h1: 1.4,
	h2: 1.4,
	h3: 1.3,
	h4: 1.2,
	h5: 1.1,
	h6: 1.1,
	sidebar: 1.1,
	footer: 1.1,
	'post-title': 1.4,
	'page-title': 1.4,
	'archive-title': 1.4,
};

export default function getDefaultFontSize( level ) {
	return defaultFontSize[ level ];
}
