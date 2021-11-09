export const responsiveKeys = {
	desktop: 'desktop',
	tablet: 'tablet',
	mobile: 'mobile',
};
export const isResponsive = ( attributes ) => {
	if ( ! attributes || 'object' !== typeof attributes ) {
		return false;
	}
	return (
		attributes.hasOwnProperty( responsiveKeys.tablet ) &&
		attributes.hasOwnProperty( responsiveKeys.mobile )
	);
};

export const getResponsiveValues = ( values ) => {
	let result = {};
	if ( values[ responsiveKeys.desktop ] ) {
		result = {
			...result,
			[ responsiveKeys.desktop ]: values[ responsiveKeys.desktop ],
		}
	}
	if ( values[ responsiveKeys.tablet ] ) {
		result = {
			...result,
			[ responsiveKeys.tablet ]: values[ responsiveKeys.tablet ],
		}
	}
	if ( values[ responsiveKeys.mobile ] ) {
		result = {
			...result,
			[ responsiveKeys.mobile ]: values[ responsiveKeys.mobile ],
		}
	}
	return 0 < Object.keys( result ).length ? result : undefined;
}

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
