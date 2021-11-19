import { getResponsiveCustomProperties } from "@ystdtb/helper/responsive";

export const getCustomProperty = ( property, value, ignoreDesktop = false ) => {
	return getResponsiveCustomProperties(
		property,
		'slide',
		value,
		ignoreDesktop
	);
};
