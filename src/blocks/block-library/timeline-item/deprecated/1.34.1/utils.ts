import { camelCase, kebabCase } from 'lodash';

export const CUSTOM_PROPERTY_PREFIX = '--ystdtb';

const responsiveKeys = {
	desktop: 'desktop',
	tablet: 'tablet',
	mobile: 'mobile',
};

export const getResponsiveMarginStyle = ( values, suffix = '' ) => {
	return getResponsiveSpacingStyle( 'margin', values, suffix );
};

const getResponsiveSpacingStyle = ( type, values, suffix = '' ) => {
	const parsedValue = parseResponsiveValues( {
		desktop: getSpacingProps( type, values?.desktop ),
		tablet: getSpacingProps( type, values?.tablet ),
		mobile: getSpacingProps( type, values?.mobile ),
	} );

	return parseObject(
		getResponsiveSpacingCustomProperty( parsedValue, suffix )
	);
};

const getResponsiveSpacingCustomProperty = ( value, suffix = '' ) => {
	if ( ! isObject( value ) ) {
		return undefined;
	}
	return getResponsiveCustomProperties( { value, suffix } );
};
const getResponsiveCustomProperties = ( { value, suffix = '' } ) => {
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
				isResponsive: isResponsive( _value ),
				suffix,
			} ),
		};
		return true;
	} );

	return result;
};

const isResponsive = ( values ) => {
	if ( ! values || 'object' !== typeof values ) {
		return false;
	}
	return (
		values.hasOwnProperty( 'tablet' ) || values.hasOwnProperty( 'mobile' )
	);
};

const getCustomProperties = ( {
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

const getPropertyName = ( {
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

const parseResponsiveValues = ( values, arrowFalsy = false ) => {
	if ( ! values || 'object' !== typeof values ) {
		return undefined;
	}
	let result = {};
	Object.keys( responsiveKeys ).map( ( key ) => {
		if ( values.hasOwnProperty( key ) ) {
			if ( arrowFalsy ) {
				result = {
					...result,
					[ key ]: values[ key ],
				};
			} else if ( !! values[ key ] ) {
				result = {
					...result,
					[ key ]: values[ key ],
				};
			}
		}
		return true;
	} );
	return 0 < Object.keys( result ).length ? result : undefined;
};

const getSpacingProps = ( type, value ) => {
	if ( ! value || 'object' !== typeof value ) {
		return undefined;
	}
	const top = value?.top || '';
	const right = value?.right || '';
	const bottom = value?.bottom || '';
	const left = value?.left || '';
	// 全部共通.
	if ( !! top && [ right, bottom, left ].every( ( x ) => x === top ) ) {
		return {
			[ `${ type }` ]: top,
		};
	}
	// 上下・左右.
	if ( !! top && top === bottom && !! right && right === left ) {
		return {
			[ `${ type }` ]: `${ top } ${ right }`,
		};
	}
	// 上・左右・下
	if ( !! top && !! right && right === left && !! bottom ) {
		return {
			[ `${ type }` ]: `${ top } ${ right } ${ bottom }`,
		};
	}
	// 全部あるけどバラバラ.
	if ( !! top && !! right && !! left && !! bottom ) {
		return {
			[ `${ type }` ]: `${ top } ${ right } ${ bottom } ${ left }`,
		};
	}
	let result = {};
	if ( top ) {
		result = {
			...result,
			[ `${ type }-top` ]: top,
		};
	}
	if ( right ) {
		result = {
			...result,
			[ `${ type }-right` ]: right,
		};
	}
	if ( bottom ) {
		result = {
			...result,
			[ `${ type }-bottom` ]: bottom,
		};
	}
	if ( left ) {
		result = {
			...result,
			[ `${ type }-left` ]: left,
		};
	}
	return result;
};

const parseObject = ( value ) => {
	if ( ! value || ! isObject( value ) ) {
		return undefined;
	}
	let result = {};
	Object.keys( value ).map( ( key ) => {
		if ( undefined !== value[ key ] ) {
			result = {
				...result,
				...{ [ key ]: value[ key ] },
			};
		}
		return true;
	} );
	return 0 < Object.keys( result ).length ? result : undefined;
};

const isObject = ( value ) => {
	return 'object' === typeof value;
};
