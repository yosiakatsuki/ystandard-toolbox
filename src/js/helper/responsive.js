export const isResponsive = ( attributes ) => {
	if ( ! attributes || 'object' !== typeof attributes ) {
		return false;
	}
	return (
		attributes.hasOwnProperty( 'tablet' ) &&
		attributes.hasOwnProperty( 'mobile' )
	);
};

export const getResponsiveProperty = ( attributes, key ) => {
	let result = ! attributes ? { desktop: undefined } : attributes;
	switch ( key ) {
		case 'desktop':
			if ( result.hasOwnProperty( 'desktop' ) ) {
				return result.desktop;
			}
			break;
		case 'tablet':
			if ( result.hasOwnProperty( 'tablet' ) ) {
				return result.tablet;
			}
			result = undefined;
			break;
		case 'mobile':
			if ( result.hasOwnProperty( 'mobile' ) ) {
				return result.mobile;
			}
			result = undefined;
			break;
	}

	return result;
};

export const addResponsiveProperty = ( attributes ) => {
	let newAttributes = ! attributes ? {} : attributes;
	if ( ! newAttributes.hasOwnProperty( 'desktop' ) ) {
		newAttributes = { desktop: attributes };
	}
	if ( ! newAttributes.hasOwnProperty( 'tablet' ) ) {
		newAttributes = {
			...newAttributes,
			tablet: newAttributes.desktop,
		};
	}
	if ( ! newAttributes.hasOwnProperty( 'mobile' ) ) {
		newAttributes = {
			...newAttributes,
			mobile: newAttributes.desktop,
		};
	}
	return newAttributes;
};

export const deleteResponsiveProperty = ( attributes ) => {
	attributes = ! attributes ? {} : attributes;
	if ( attributes.hasOwnProperty( 'tablet' ) ) {
		delete attributes.tablet;
	}
	if ( attributes.hasOwnProperty( 'mobile' ) ) {
		delete attributes.mobile;
	}

	return attributes;
};
