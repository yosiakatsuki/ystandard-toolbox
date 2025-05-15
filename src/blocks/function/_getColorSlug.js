import { select } from '@wordpress/data';

export function getColorSlug( color ) {
	const { colors } = select( 'core/block-editor' ).getSettings();
	const selected = colors.filter( ( data ) => data.color === color );
	if ( 0 < selected.length ) {
		return selected[ 0 ].slug;
	}
	return undefined;
}

export function getColorCode( color ) {
	const colorClass = getColorSlug( color );
	if ( undefined !== colorClass ) {
		return undefined;
	}
	return color;
}
