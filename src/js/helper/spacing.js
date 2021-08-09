import { getResponsiveProperty } from '@ystdtb/helper/responsive';

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

export const getSpacing = ( spacing, position, media = null ) => {
	let value = spacing;
	if ( null !== media ) {
		value = getResponsiveProperty( spacing, media );
	}
	if ( ! value ) {
		return undefined;
	}
	return value[ position ];
};
