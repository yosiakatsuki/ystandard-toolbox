import { getResponsiveCustomProperties, parseResponsiveValues } from "@ystdtb/helper/responsive";
import { headingTag } from "../config";
import { getSpacingCSS } from "@ystdtb/helper/spacing";
import { isObject, parseObject } from "@ystdtb/helper/object";

export const getCustomProperty = ( property, value, ignoreDesktop = false ) => {
	return getResponsiveCustomProperties(
		property,
		'banner-link',
		value,
		ignoreDesktop
	);
}

export const getBackgroundImage = ( value ) => {
	return value?.url ? `url('${ value?.url }')` : undefined;
}
export const getBackgroundPosition = ( value ) => {
	if ( ! value || ( ! value?.x && ! value?.y ) ) {
		return undefined;
	}
	const x = value?.x ? Math.round( value.x * 100 * 100 ) / 100 : 50;
	const y = value?.y ? Math.round( value.y * 100 * 100 ) / 100 : 50;
	return `${ x }% ${ y }%`;
}

export const getOverlayBackGround = ( color, gradient ) => {
	if ( gradient ) {
		return gradient;
	}
	if ( color ) {
		return color;
	}
	return undefined;
}

export const getFontSizeStyle = ( fontSize, fontSizeClass ) => {
	const value = {
		desktop: fontSize?.desktop?.size,
		tablet: fontSize?.tablet,
		mobile: fontSize?.mobile,
	};
	return getResponsiveCustomProperties(
		'font-size',
		'banner-link',
		parseResponsiveValues( value ),
		!! fontSizeClass
	);
}


export const isClearStyle = ( tagName, isClear ) => {
	if ( ! headingTag.includes( tagName ) ) {
		return false;
	}
	return undefined === isClear ? true : isClear;
}

export const getPaddingStyle = ( padding ) => {
	const value = parseResponsiveValues( {
		desktop: getSpacingCSS( padding?.desktop ),
		tablet: getSpacingCSS( padding?.tablet ),
		mobile: getSpacingCSS( padding?.mobile ),
	} );
	return getCustomProperty( 'padding', value );
}

export const getContentPositionStyle = ( position ) => {
	if ( ! isObject( position ) ) {
		return undefined;
	}
	let result = {};
	const list = {
		left: 'flex-start',
		right: 'flex-end',
		top: 'flex-start',
		bottom: 'flex-end',
	};
	if ( list[ position?.horizontal ] ) {
		result = {
			...result,
			justifyContent: list[ position?.horizontal ],
			textAlign: position?.horizontal,
		}
	}
	if ( list[ position?.vertical ] ) {
		result = {
			...result,
			alignItems: list[ position?.vertical ],
		}
	}
	return parseObject( result );
}
