import { isObject, parseObjectAll } from '@ystd/helper/object';
import { breakpoints } from '../config';
import {
	getResponsiveValue,
	responsiveKeys as keys,
} from '@ystd/helper/responsive';

export const getSliderOptions = ( attributes ) => {
	let options = {};

	const addOptions = ( name, value, defaultValue = undefined ) => {
		if ( undefined === value && undefined === defaultValue ) {
			return;
		}
		options = {
			...options,
			[ name ]: value ?? defaultValue,
		};
	};

	/**
	 * ページネーション
	 */
	if ( attributes?.paginationType ) {
		const pagination = {
			type:
				'dynamicBullets' === attributes?.paginationType
					? 'bullets'
					: attributes?.paginationType,
			el: '.swiper-pagination',
			dynamicBullets: 'dynamicBullets' === attributes?.paginationType,
		};
		addOptions( 'pagination', pagination );
	}

	return JSON.stringify( options );
};

const secToMs = ( value, defaultValue = undefined ) => {
	if ( ! value || Number.isNaN( parseFloat( value ) ) ) {
		return defaultValue;
	}

	return parseFloat( value ) * 1000;
};

export const hasSlidesOption = ( attributes ) => {
	const list = [ 'slide', 'coverflow' ];
	return list.includes( attributes?.effect ?? 'slide' );
};

export const getSlidesOption = ( slides, type, name ) => {
	if ( ! isObject( slides ) ) {
		return undefined;
	}
	if ( ! slides.hasOwnProperty( type ) ) {
		return undefined;
	}
	if ( ! isObject( slides[ type ] ) ) {
		return undefined;
	}
	if ( ! slides[ type ].hasOwnProperty( name ) ) {
		return undefined;
	}
	return slides[ type ][ name ];
};

const getBreakpoints = ( type, attributes ) => {
	if ( keys.desktop === type ) {
		return attributes?.breakpoints?.desktop ?? breakpoints.desktop;
	}
	if ( keys.tablet === type ) {
		return attributes?.breakpoints?.tablet ?? breakpoints.tablet;
	}

	return 0;
};
