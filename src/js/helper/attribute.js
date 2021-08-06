export const getDefaultAttributes = () => {
	if ( ! window.ystdtbBlockEditor.hasOwnProperty( 'defaultAttributes' ) ) {
		return {};
	}
	return window.ystdtbBlockEditor.defaultAttributes;
};

export const mergeDefaultAttributes = ( name, attributes ) => {
	const defaultAttributes = getDefaultAttributes();
	if ( ! defaultAttributes ) {
		return attributes;
	}
	if ( ! defaultAttributes.hasOwnProperty( name ) ) {
		return attributes;
	}
	// TODO:デフォルト値変更処理.
	return defaultAttributes[ name ];
};
