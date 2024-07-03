import type {
	ResponsiveValues,
	MayBeResponsiveValue,
	FlatValue,
} from '@aktk/block-components/types';
import { deleteUndefined, isObject } from '@aktk/block-components/utils/object';

export const RESPONSIVE_KEYS = [ 'desktop', 'tablet', 'mobile' ] as const;

/**
 * レスポンシブタイプの値かチェック.
 * @param value
 */
export function isResponsiveValue( value: unknown ): value is ResponsiveValues {
	if ( ! isObject( value as unknown as object ) ) {
		return false;
	}

	const keys = Object.keys( value as unknown as object );
	if ( 0 === keys.length ) {
		return false;
	}

	return RESPONSIVE_KEYS.some( ( key ) => {
		return keys.includes( key );
	} );
}

/**
 * レスポンシブタイプであれば、空のプロパティを削除するなど整理する.
 * @param value
 */
export function parseResponsiveValue(
	value: MayBeResponsiveValue
): MayBeResponsiveValue {
	if ( ! isObject( value as unknown as object ) ) {
		return value;
	}

	let result = {} as ResponsiveValues;
	RESPONSIVE_KEYS.forEach( ( key: keyof ResponsiveValues ) => {
		if ( !! value && value.hasOwnProperty( key ) ) {
			// @ts-ignore
			if ( null !== value[ key ] ) {
				// @ts-ignore
				result[ key ] = value[ key ];
			}
		}
	} );

	result = deleteUndefined( result );
	if ( 0 === Object.keys( result ).length ) {
		return undefined;
	}

	return result as unknown as ResponsiveValues;
}

/**
 * レスポンシブ形式の値を非レスポンシブな形式に変更する.
 *
 * @param value
 * @param defaultValue
 */
export function getFlatValue(
	value: MayBeResponsiveValue,
	defaultValue: FlatValue
): FlatValue {
	// レスポンシブ形式の場合.
	if ( isResponsiveValue( value ) ) {
		// desktopの値があれば返す.
		if ( value.hasOwnProperty( 'desktop' ) ) {
			return value.desktop;
		}
		// desktopがなければデフォルト値
		return defaultValue;
	}

	// レスポンシブ形式ではない場合、そのまま返却.
	return value;
}
