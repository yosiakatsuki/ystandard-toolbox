export const parseObject = ( value ) => {
	if ( ! value || 'object' !== typeof value ) {
		return undefined;
	}
	return 0 < Object.keys( value ).length ? value : undefined;
}
