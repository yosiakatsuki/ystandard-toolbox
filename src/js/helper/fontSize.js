import { useSelect } from '@wordpress/data';
import { getFontSizeClass } from '@wordpress/block-editor';

export const getFontSizes = () => {

	const {
		fontSizes
	} = useSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );

		return {
			fontSizes: getSettings().fontSizes,
		}
	} );

	return fontSizes;
};

export const getFontSizeClassByObject = (value) => {
	return getFontSizeClass( value?.slug );
}
export const getFontSizeValue = ( value, fontSizes ) => {

	if ( value?.size ) {
		return value.size;
	}
	if ( value?.slug ) {
		const fontSize = fontSizes.find( ( size ) => size.slug === value.slug );
		return fontSize ? fontSize.size : undefined;
	}
	return undefined;
}
export const createFontSizeObject = ( value, fontSizes ) => {

	const fontSize = fontSizes.find( ( size ) => size.size === value );

	return {
		size: fontSize ? undefined : value,
		slug: fontSize?.slug,
	}
}
