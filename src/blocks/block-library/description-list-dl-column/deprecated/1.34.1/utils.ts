export const CUSTOM_PROPERTY_PREFIX = '--ystdtb';

const isObject = ( value ) => {
	return 'object' === typeof value;
};

const parseObject = ( value ) => {
	if ( ! value || ! isObject( value ) ) {
		return undefined;
	}
	return 0 < Object.keys( value ).length ? { ...value } : undefined;
};

export const getBorderCustomProperty = ( border, prefix, position = '' ) => {
	const customPropertyPrefix = CUSTOM_PROPERTY_PREFIX;
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
		getResponsiveSpacingCustomProps( type, parsedValue, suffix )
	);
};

const responsiveKeys = {
	desktop: 'desktop',
	tablet: 'tablet',
	mobile: 'mobile',
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

const getResponsiveSpacingCustomProps = ( type, value, suffix = '' ) => {
	const prefix = '--ystdtb';
	const _suffix = suffix ? `-${ suffix }` : '';
	if ( ! value || 'object' !== typeof value ) {
		return undefined;
	}
	const getProps = ( spacing, device, isResponsive = true ) => {
		if ( ! spacing || 'object' !== typeof spacing ) {
			return undefined;
		}
		let result = {};
		Object.keys( spacing ).map( ( key ) => {
			const customProp = isResponsive
				? `${ prefix }-${ key }${ _suffix }-${ device }`
				: key;
			result = {
				...result,
				[ customProp ]: spacing[ key ],
			};
			return true;
		} );
		return result;
	};
	return {
		...getProps(
			value?.desktop,
			'desktop',
			!! ( value?.tablet || value?.mobile )
		),
		...getProps( value?.tablet, 'tablet' ),
		...getProps( value?.mobile, 'mobile' ),
	};
};

export const getResponsiveWidthStyle = ( values, prefix = '' ) => {
	return getResponsiveValueStyle( 'width', values, prefix );
};

const getResponsiveValueStyle = ( propertyName, values, prefix = '' ) => {
	const parsedValue = parseResponsiveValues( {
		desktop: values?.desktop,
		tablet: values?.tablet,
		mobile: values?.mobile,
	} );
	return getResponsiveCustomProperties( propertyName, parsedValue, prefix );
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
	const customProperty = `${ CUSTOM_PROPERTY_PREFIX }${ _prefix }-${ property }`;
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
