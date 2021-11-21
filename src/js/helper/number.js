export const toNumber = ( value, defaultValue = undefined ) => {
	const newValue = parseFloat( value );
	if ( Number.isNaN( newValue ) ) {
		return defaultValue;
	}
	return newValue;
};
export const toInt = ( value, defaultValue = undefined ) => {
	const newValue = parseInt( value );
	if ( Number.isNaN( newValue ) ) {
		return defaultValue;
	}
	return newValue;
};
