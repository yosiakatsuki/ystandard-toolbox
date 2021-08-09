// eslint-disable-next-line @wordpress/no-global-event-listener
document.addEventListener( 'DOMContentLoaded', () => {
	parseResponsiveProperties();
} );

/**
 * IE用スタイル処理.
 */
const parseResponsiveProperties = () => {
	const fallbackAttribute = 'data-ys-ie-styles';
	const fallback = document.querySelectorAll( `[${ fallbackAttribute }]` );
	const property = Array.prototype.slice.call( fallback, 0 );
	property.forEach( ( el ) => {
		const attr = el.getAttribute( fallbackAttribute );
		const styles = JSON.parse( attr );
		if ( styles ) {
			for ( const key in styles ) {
				el.style[ key ] = styles[ key ];
			}
		}
		el.removeAttribute( fallbackAttribute );
	} );
}
