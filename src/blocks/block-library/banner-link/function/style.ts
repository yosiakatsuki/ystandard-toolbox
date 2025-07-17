import {
	getResponsiveCustomProperties,
	parseResponsiveValues,
} from '@ystd/helper/responsive';
import { headingTag } from '../config';
import { getSpacingCSS } from '@ystd/helper/spacing';
import { isObject, parseObject } from '@ystd/helper/object';

export const getCustomProperty = ( property, value, ignoreDesktop = false ) => {
	return getResponsiveCustomProperties(
		property,
		value,
		'banner-link',
		ignoreDesktop
	);
};

export const getBackgroundImage = ( value ) => {
	return value?.url ? `url('${ value?.url }')` : undefined;
};
export const getBackgroundPosition = ( value ) => {
	if ( ! value || ( ! value?.x && ! value?.y ) ) {
		return undefined;
	}
	const x = value?.x && ! Number.isNaN( value?.x ) ? value.x * 100 : 50;
	const y = value?.y && ! Number.isNaN( value?.y ) ? value.y * 100 : 50;
	if ( 50 === x && 50 === y ) {
		return undefined;
	}
	return `${ Math.round( x * 100 ) / 100 }% ${
		Math.round( y * 100 ) / 100
	}%`;
};

export const getOverlayBackGround = ( color, gradient ) => {
	if ( gradient ) {
		return gradient;
	}
	if ( color ) {
		return color;
	}
	return undefined;
};

export const getFontSizeStyle = ( fontSize, fontSizeClass ) => {
	const value = {
		desktop: fontSize?.desktop?.size,
		tablet: fontSize?.tablet,
		mobile: fontSize?.mobile,
	};
	return getResponsiveCustomProperties(
		'font-size',
		parseResponsiveValues( value ),
		'banner-link',
		!! fontSizeClass
	);
};

export const isClearStyle = ( tagName, isClear ) => {
	if ( ! headingTag.includes( tagName ) ) {
		return false;
	}
	return undefined === isClear ? true : isClear;
};

export const getPaddingStyle = ( padding ) => {
	const value = parseResponsiveValues( {
		desktop: getSpacingCSS( padding?.desktop ),
		tablet: getSpacingCSS( padding?.tablet ),
		mobile: getSpacingCSS( padding?.mobile ),
	} );
	return getCustomProperty( 'padding', value );
};

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
		};
	}
	if ( list[ position?.vertical ] ) {
		result = {
			...result,
			alignItems: list[ position?.vertical ],
		};
	}
	return parseObject( result );
};

export const getBlockPositionStyle = ( value ) => {
	if ( 'center' === value ) {
		return {
			marginRight: 'auto',
			marginLeft: 'auto',
		};
	}
	if ( 'right' === value ) {
		return {
			marginLeft: 'auto',
		};
	}
	return undefined;
};
