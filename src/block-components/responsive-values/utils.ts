import type { MayBeResponsiveValue, ResponsiveValues } from './types';
import { deleteUndefined, isObject } from '@aktk/utils/object';
import { RESPONSIVE_KEYS } from './types';

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

export function parseResponsiveValue(
	value: MayBeResponsiveValue
): MayBeResponsiveValue {
	if ( ! isObject( value as unknown as object ) ) {
		return value;
	}

	let result = RESPONSIVE_KEYS.map( ( key ) => {
		value = value as unknown as ResponsiveValues;
		if ( value.hasOwnProperty( key ) ) {
			return value[ key ];
		}
		return undefined;
	} );

	result = deleteUndefined( result );
	if ( 0 === Object.keys( result ).length ) {
		return undefined;
	}

	return result as unknown as ResponsiveValues;
}
