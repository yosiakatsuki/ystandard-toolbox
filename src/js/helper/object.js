export const isObject = ( value ) => {
	return 'object' === typeof value;
}
export const parseObject = ( value ) => {
	if ( ! value || ! isObject( value ) ) {
		return undefined;
	}
	return 0 < Object.keys( value ).length ? value : undefined;
}
