import { getResponsiveProperty } from '@ystdtb/helper/responsive';

export const getSpacingCSS = ( value ) => {
	if ( ! value || 'object' !== typeof value ) {
		return undefined;
	}
	const top = value?.top || '';
	const right = value?.right || '';
	const bottom = value?.bottom || '';
	const left = value?.left || '';
	let result = top;
	if ( ! [ right, bottom, left ].every( ( x ) => x === top ) ) {
		result = `${ top } ${ right } ${ bottom } ${ left }`;
	}

	return result || undefined;
};

export const hasSpacing = ( spacing, media = null ) => {
	let value = spacing;
	if ( null !== media ) {
		value = getResponsiveProperty( spacing, media );
	}
	if ( ! value ) {
		return false;
	}

	return value.top && value.right && value.bottom && value.left;
};

export const getSpacing = ( spacing, position = null, media = null ) => {
	let value = spacing;
	if ( null !== media ) {
		value = getResponsiveProperty( spacing, media );
	}
	if ( ! value ) {
		return undefined;
	}
	if ( null === position ) {
		return hasSpacing( value ) ? value : undefined;
	}
	return value[ position ];
};
