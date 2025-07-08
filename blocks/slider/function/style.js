import { getResponsiveCustomProperties } from '@ystd/helper/responsive';

export const getCustomProperty = ( property, value, ignoreDesktop = false ) => {
	return getResponsiveCustomProperties(
		property,
		value,
		'slide',
		ignoreDesktop
	);
};
