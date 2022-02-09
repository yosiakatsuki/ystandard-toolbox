import {
	getResponsiveCustomProperties,
	parseResponsiveValues,
} from '@ystdtb/helper/responsive';
import { getSpacingCSS } from '@ystdtb/helper/spacing';

export const getDLMarginStyle = ( margin ) => {
	const value = parseResponsiveValues( {
		desktop: getSpacingCSS( margin?.desktop ),
		tablet: getSpacingCSS( margin?.tablet ),
		mobile: getSpacingCSS( margin?.mobile ),
	} );
	return getResponsiveCustomProperties(
		'margin',
		'dl',
		value
	);
};
