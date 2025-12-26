import { camelCase, kebabCase } from 'lodash';
import { getFontSizeClass } from '@wordpress/block-editor';

export const CUSTOM_PROPERTY_PREFIX = '--ystdtb';

const checkIsResponsive = ( values ) => {
	if ( ! values || 'object' !== typeof values ) {
		return false;
	}
	return (
		values.hasOwnProperty( 'tablet' ) || values.hasOwnProperty( 'mobile' )
	);
};

export const getBackGroundStyle = ( backgroundColor, gradient = undefined ) => {
	if ( gradient ) {
		return gradient;
	}
	if ( backgroundColor?.color ) {
		return backgroundColor.color;
	}
	if ( 'object' !== typeof backgroundColor && backgroundColor ) {
		return backgroundColor;
	}
	return undefined;
};

const responsiveKeys = {
	desktop: 'desktop',
	tablet: 'tablet',
	mobile: 'mobile',
};
const responsiveCustomPropertyPrefix = '--ystdtb';

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

const isObject = ( value ) => {
	return 'object' === typeof value;
};

export const getResponsivePaddingStyle = ( values, suffix = '' ) => {
	return getResponsiveSpacingStyle( 'padding', values, suffix );
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
	return getResponsiveCustomPropertiesSpacing( { value, suffix } );
};

const getResponsiveCustomPropertiesSpacing = ( { value, suffix = '' } ) => {
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

export const getFontSizeClassByObject = ( value ) => {
	return getFontSizeClass( value?.slug ) ?? '';
};

export const getResponsiveFontSizeStyle = (
	fontSize,
	fontSizeClass = false
) => {
	const value = {
		desktop: fontSize?.desktop?.size,
		tablet: fontSize?.tablet,
		mobile: fontSize?.mobile,
	};
	return getResponsiveCustomProperties(
		'font-size',
		parseResponsiveValues( value ),
		'',
		!! fontSizeClass
	);
};

const getResponsiveCustomProperties = (
	property,
	value,
	prefix = '',
	ignoreDesktop = false
) => {
	if ( ! value || 'object' !== typeof value ) {
		return undefined;
	}
	let result = {};
	const _prefix = !! prefix ? `-${ prefix }` : '';
	const customProperty = `${ responsiveCustomPropertyPrefix }${ _prefix }-${ kebabCase(
		property
	) }`;
	const hasDesktop =
		value.hasOwnProperty( responsiveKeys.desktop ) && ! ignoreDesktop;
	const hasTablet = value.hasOwnProperty( responsiveKeys.tablet );
	const hasMobile = value.hasOwnProperty( responsiveKeys.mobile );
	if ( hasDesktop ) {
		if ( ! hasTablet && ! hasMobile ) {
			result = {
				...result,
				[ property ]: value.desktop,
			};
		} else {
			result = {
				...result,
				[ `${ customProperty }-desktop` ]: value.desktop,
			};
		}
	}
	if ( hasTablet ) {
		result = {
			...result,
			[ `${ customProperty }-tablet` ]: value.tablet,
		};
	}
	if ( hasMobile ) {
		result = {
			...result,
			[ `${ customProperty }-mobile` ]: value.mobile,
		};
	}
	return 0 < Object.keys( result ).length ? result : undefined;
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

export function getBorderCustomProperty( border, prefix, position = '' ) {
	const customPropertyPrefix = responsiveCustomPropertyPrefix;
	const _position = position ? `-${ position }` : '';
	const customProperty = `${ customPropertyPrefix }-${ prefix }-border${ _position }`;
	const borderStyle = border?.style || 'solid';
	/**
	 * チェック
	 */
	if ( ! isObject( border ) ) {
		return undefined;
	}
	if ( ! border?.width || ! border?.color?.hex ) {
		return undefined;
	}

	return {
		[ `${ customProperty }` ]: `${ border.width } ${ borderStyle } ${ border.color.hex }`,
	};
}

export function getResponsiveWidthStyle( values, prefix = '' ) {
	return getResponsiveValueStyle( 'width', values, prefix );
}

const getResponsiveValueStyle = ( propertyName, values, prefix = '' ) => {
	const parsedValue = parseResponsiveValues( {
		desktop: values?.desktop,
		tablet: values?.tablet,
		mobile: values?.mobile,
	} );
	return getResponsiveCustomProperties( propertyName, parsedValue, prefix );
};
