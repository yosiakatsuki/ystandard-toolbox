import type { BoxShadowValue } from './types';

/**
 * HEXカラーをRGBに変換
 */
function hex2rgb( hex: string ): number[] {
	let hexValue = hex;
	if ( hexValue.slice( 0, 1 ) === '#' ) {
		hexValue = hexValue.slice( 1 );
	}
	if ( hexValue.length === 3 ) {
		hexValue =
			hexValue.slice( 0, 1 ) +
			hexValue.slice( 0, 1 ) +
			hexValue.slice( 1, 2 ) +
			hexValue.slice( 1, 2 ) +
			hexValue.slice( 2, 3 ) +
			hexValue.slice( 2, 3 );
	}

	return [ hexValue.slice( 0, 2 ), hexValue.slice( 2, 4 ), hexValue.slice( 4, 6 ) ].map(
		( str ) => {
			return parseInt( str, 16 );
		}
	);
}

/**
 * BoxShadowValueからCSSスタイルを生成
 */
export function getBoxShadowStyle( value?: BoxShadowValue ) {
	if (
		! value?.offsetX ||
		! value?.offsetY ||
		! value?.blurRadius
	) {
		return undefined;
	}

	const color = hex2rgb( value.color ?? '#000' );
	const opacity = value.opacity ?? 0.7;

	return {
		boxShadow: `${ value.offsetX } ${ value.offsetY } ${ value.blurRadius } rgba(${ color[ 0 ] },${ color[ 1 ] },${ color[ 2 ] },${ opacity })`,
	};
}