import { camelCase, kebabCase } from 'lodash';
import { isObject, parseObject } from '@aktk/helper/object.js';
import { isResponsive as checkIsResponsive } from '@aktk/helper/responsive.js';

export const CUSTOM_PROPERTY_PREFIX = '--ystdtb';

export const getPropertyName = ( {
	property,
	isResponsive = true,
	suffix,
	device,
} ) => {
	if ( ! isResponsive ) {
		return camelCase( property );
	}
	const _device = !! device ? `-${ device }` : '';
	const _suffix = !! suffix ? `-${ suffix }` : '';
	const _property = kebabCase( property );
	return `${ CUSTOM_PROPERTY_PREFIX }-${ _property }${ _suffix }${ _device }`;
};

export const getCustomProperties = ( {
	value,
	device,
	isResponsive = true,
	suffix = '',
} ) => {
	const _value = parseObject( value );
	if ( ! isObject( _value ) ) {
		return undefined;
	}
	let result = {};
	Object.keys( _value ).map( ( property ) => {
		const propertyName = getPropertyName( {
			property,
			isResponsive,
			suffix,
			device,
		} );
		result = {
			...result,
			[ propertyName ]: _value[ property ],
		};
		return true;
	} );
	return result;
};

export const getResponsiveCustomProperties = ( { value, suffix = '' } ) => {
	const _value = parseObject( value );
	if ( ! isObject( _value ) ) {
		return undefined;
	}
	let result = {};
	Object.keys( _value ).map( ( device ) => {
		result = {
			...result,
			...getCustomProperties( {
				value: _value[ device ],
				device,
				isResponsive: checkIsResponsive( _value ),
				suffix,
			} ),
		};
		return true;
	} );

	return result;
};
