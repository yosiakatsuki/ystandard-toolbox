import { select } from '@wordpress/data';
import { getFontSizeClass } from '@wordpress/block-editor';

export const getFontSizeClassByObject = ( value ) => {
	return getFontSizeClass( value?.slug );
}
export const getFontSizeValue = ( value ) => {

	if ( value?.size ) {
		return value.size;
	}
	const { fontSizes } = select( 'core/block-editor' ).getSettings();

	if ( value?.slug ) {
		const fontSize = fontSizes.find( ( size ) => size.slug === value.slug );
		return fontSize ? fontSize.size : undefined;
	}
	return undefined;
}
export const createFontSizeObject = ( value ) => {

	if ( ! value ) {
		return undefined;
	}
	const { fontSizes } = select( 'core/block-editor' ).getSettings();

	const fontSize = fontSizes.find( ( size ) => size.size === value );

	const result = {
		size: value,
		slug: fontSize?.slug,
	};

	return 0 < Object.keys( result ).length ? result : undefined;
}
