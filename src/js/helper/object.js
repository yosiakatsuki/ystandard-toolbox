export const isObject = ( value ) => {
	return 'object' === typeof value;
};
export const parseObject = ( value ) => {
	if ( ! value || ! isObject( value ) ) {
		return undefined;
	}
	return 0 < Object.keys( value ).length ? value : undefined;
};

export const parseObjectAll = ( value ) => {
	const _value = parseObject( value );
	if ( ! _value ) {
		return undefined;
	}
	let result = {};
	Object.keys( _value ).map( ( key ) => {
		let hasValue;
		if ( isObject( _value[ key ] ) ) {
			hasValue = !! parseObject( _value[ key ] );
		} else {
			hasValue = undefined !== _value[ key ];
		}
		if ( hasValue ) {
			result = {
				...result,
				[ key ]: _value[ key ],
			}
		}
		return true;
	} );
	return parseObject( result );
};
