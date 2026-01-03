import type { FlatBorder, SplitBorders } from './types';
import { isObject } from '@aktk/block-components/utils/object';

/**
 * Splitタイプかのチェック
 * @param value
 */
export function isSplit( value: SplitBorders | FlatBorder ) {
	if ( ! isObject( value ) ) {
		return false;
	}
	const keys = [ 'top', 'right', 'bottom', 'left' ];

	return keys.some( ( key ) => {
		return value.hasOwnProperty( key );
	} );
}

export function getFlatBorderStyle(
	position: string,
	border: FlatBorder | undefined
) {
	if ( ! isObject( border ) ) {
		return undefined;
	}
	// borderの位置.
	const _position = position ? `-${ position }` : '';

	const _color = border?.color;
	const _style = border?.style;
	const _width = border?.width;

	// 全て揃っている場合ショートハンド.
	if ( _color && _style && _width ) {
		return {
			[ `border${ _position }` ]: `${ _width } ${ _style } ${ _color }`,
		};
	}

	return {
		[ `border${ _position }-color` ]: _color,
		[ `border${ _position }-style` ]: _style,
		[ `border${ _position }-width` ]: _width,
	};
}
