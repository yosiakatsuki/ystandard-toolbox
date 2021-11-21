export const isObject = ( value ) => {
	return 'object' === typeof value;
};
export const parseObject = ( value ) => {
	if ( ! value || ! isObject( value ) ) {
		return undefined;
	}
	return 0 < Object.keys( value ).length ? { ...value } : undefined;
};

export const parseObjectAll = ( value ) => {
	const _value = parseObject( value );
	if ( ! _value ) {
		return undefined;
	}
	let result = {};
	Object.keys( _value ).map( ( key ) => {
		let hasValue;
		let parsedValue = _value[ key ];
		if ( isObject( parsedValue ) ) {
			parsedValue = parseObjectAll( parsedValue );
			hasValue = !! parsedValue;
		} else {
			hasValue = undefined !== parsedValue;
		}
		if ( hasValue ) {
			result = {
				...result,
				[ key ]: parsedValue,
			}
		}
		return true;
	} );
	return parseObject( result );
};
