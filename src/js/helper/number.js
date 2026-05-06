export const isNumber = ( value ) => {
	return ! Number.isNaN( Number( value ) );
};

/**
 * @param      value
 * @param      defaultValue
 * @deprecated aktk-block-components の toNumber を使用してください。
 * @see {@link src/aktk-block-components/utils/number/index.ts toNumber}
 */
export const toNumber = ( value, defaultValue = undefined ) => {
	const newValue = parseFloat( value );
	if ( Number.isNaN( newValue ) ) {
		return defaultValue;
	}
	return newValue;
};

/**
 * @param      value
 * @param      defaultValue
 * @deprecated aktk-block-components の toInt を使用してください。
 * @see {@link src/aktk-block-components/utils/number/index.ts toInt}
 */
export const toInt = ( value, defaultValue = undefined ) => {
	const newValue = parseInt( value );
	if ( Number.isNaN( newValue ) ) {
		return defaultValue;
	}
	return newValue;
};

export const getNumber = (
	value,
	defaultValue = undefined,
	min = undefined,
	max = undefined
) => {
	let _value = toNumber( value, defaultValue );
	if ( ! isNumber( _value ) ) {
		return defaultValue;
	}
	if ( isNumber( min ) && min >= _value ) {
		_value = min;
	}
	if ( isNumber( max ) && max <= _value ) {
		_value = max;
	}
	return _value;
};
