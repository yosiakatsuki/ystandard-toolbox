import {
	getResponsiveCustomProperties,
	parseResponsiveValues,
} from '@ystdtb/helper/responsive';
import { getSpacingCSS } from '@ystdtb/helper/spacing';

export const getDTPaddingStyle = ( padding ) => {
	const value = parseResponsiveValues( {
		desktop: getSpacingCSS( padding?.desktop ),
		tablet: getSpacingCSS( padding?.tablet ),
		mobile: getSpacingCSS( padding?.mobile ),
	} );
	return getResponsiveCustomProperties(
		'padding',
		'dt',
		value
	);
};

export const getFontSizeStyle = ( fontSize, fontSizeClass ) => {
	const value = {
		desktop: fontSize?.desktop?.size,
		tablet: fontSize?.tablet,
		mobile: fontSize?.mobile,
	};
	return getResponsiveCustomProperties(
		'font-size',
		'dt',
		parseResponsiveValues( value ),
		!! fontSizeClass
	);
};
