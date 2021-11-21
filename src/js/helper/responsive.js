export const responsiveCustomPropertyPrefix = '--ystdtb';

export const responsiveKeys = {
	desktop: 'desktop',
	tablet: 'tablet',
	mobile: 'mobile',
};

export const isResponsive = ( values ) => {
	if ( ! values || 'object' !== typeof values ) {
		return false;
	}
	return (
		values.hasOwnProperty( responsiveKeys.tablet ) &&
		values.hasOwnProperty( responsiveKeys.mobile )
	);
};

export const getResponsiveValue = ( values, key ) => {
	if ( ! values || 'object' !== typeof values ) {
		return undefined;
	}
	let result = values.hasOwnProperty( key ) ? values[ key ] : {};
	if ( 'object' === typeof result ) {
		result = 0 < Object.keys( result ).length ? result : undefined;
	}
	return result;
};

export const getResponsiveValues = ( values ) => {
	if ( ! values || 'object' !== typeof values ) {
		return undefined;
	}
	let result = {};
	if ( values[ responsiveKeys.desktop ] ) {
		result = {
			...result,
			[ responsiveKeys.desktop ]: values[ responsiveKeys.desktop ],
		};
	}
	if ( values[ responsiveKeys.tablet ] ) {
		result = {
			...result,
			[ responsiveKeys.tablet ]: values[ responsiveKeys.tablet ],
		};
	}
	if ( values[ responsiveKeys.mobile ] ) {
		result = {
			...result,
			[ responsiveKeys.mobile ]: values[ responsiveKeys.mobile ],
		};
	}
	return 0 < Object.keys( result ).length ? result : undefined;
};

export const parseResponsiveValues = ( values, arrowFalsy = false ) => {
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

export const getResponsiveCustomProperties = (
	property,
	prefix,
	value,
	ignoreDesktop = false
) => {
	if ( ! value || 'object' !== typeof value ) {
		return undefined;
	}
	let result = {};
	const customProperty = `${ responsiveCustomPropertyPrefix }-${ prefix }-${ property }`;
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

// TODO:廃止.
export const getResponsiveProperty = ( attributes, key ) => {
	let result = ! attributes ? { desktop: undefined } : attributes;
	switch ( key ) {
		case responsiveKeys.desktop:
			if ( result.hasOwnProperty( responsiveKeys.desktop ) ) {
				return result.desktop;
			}
			break;
		case responsiveKeys.tablet:
			if ( result.hasOwnProperty( responsiveKeys.tablet ) ) {
				return result.tablet;
			}
			result = undefined;
			break;
		case responsiveKeys.mobile:
			if ( result.hasOwnProperty( responsiveKeys.mobile ) ) {
				return result.mobile;
			}
			result = undefined;
			break;
	}

	return result;
};

// TODO:廃止
export const addResponsiveProperty = ( attributes ) => {
	let newAttributes = ! attributes ? {} : attributes;
	if ( ! newAttributes.hasOwnProperty( responsiveKeys.desktop ) ) {
		newAttributes = { desktop: attributes };
	}
	if ( ! newAttributes.hasOwnProperty( responsiveKeys.tablet ) ) {
		newAttributes = {
			...newAttributes,
			tablet: newAttributes.desktop,
		};
	}
	if ( ! newAttributes.hasOwnProperty( responsiveKeys.mobile ) ) {
		newAttributes = {
			...newAttributes,
			mobile: newAttributes.desktop,
		};
	}
	return newAttributes;
};

// TODO:廃止.
export const deleteResponsiveProperty = ( attributes ) => {
	attributes = ! attributes ? {} : attributes;
	if ( attributes.hasOwnProperty( responsiveKeys.tablet ) ) {
		delete attributes.tablet;
	}
	if ( attributes.hasOwnProperty( responsiveKeys.mobile ) ) {
		delete attributes.mobile;
	}

	return attributes;
};
