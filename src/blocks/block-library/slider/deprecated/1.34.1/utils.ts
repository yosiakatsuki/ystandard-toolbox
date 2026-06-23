import { kebabCase } from 'lodash';

export const isObject = ( value ) => {
	return 'object' === typeof value;
};

export const parseObject = ( value ) => {
	if ( ! value || ! isObject( value ) ) {
		return undefined;
	}
	let result = {};
	Object.keys( value ).map( ( key ) => {
		if ( undefined !== value[ key ] ) {
			result = {
				...result,
				...{ [ key ]: value[ key ] },
			};
		}
		return true;
	} );
	return 0 < Object.keys( result ).length ? result : undefined;
};

export const parseObjectAll = ( value ) => {
	const _value = parseObject( value );
	if ( ! _value ) {
		return undefined;
	}
	let result = {};
	Object.keys( _value ).map( ( key ) => {
		let hasValue;
		let parsedValue = _value[ key ];
		if ( isObject( parsedValue ) ) {
			parsedValue = parseObjectAll( parsedValue );
			hasValue = !! parsedValue;
		} else {
			hasValue = undefined !== parsedValue;
		}
		if ( hasValue ) {
			result = {
				...result,
				[ key ]: parsedValue,
			};
		}
		return true;
	} );
	return result;
};

const getResponsiveValue = ( values, key ) => {
	if ( ! values || 'object' !== typeof values ) {
		return undefined;
	}
	let result = values.hasOwnProperty( key ) ? values[ key ] : {};
	if ( 'object' === typeof result ) {
		result = 0 < Object.keys( result ).length ? result : undefined;
	}
	return result;
};

import { breakpoints } from './index';
import classnames from 'classnames';

const responsiveCustomPropertyPrefix = '--ystdtb';
const responsiveKeys = {
	desktop: 'desktop',
	tablet: 'tablet',
	mobile: 'mobile',
};
const keys = responsiveKeys;

export const getCustomProperty = ( property, value, ignoreDesktop = false ) => {
	return getResponsiveCustomProperties(
		property,
		value,
		'slide',
		ignoreDesktop
	);
};

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
	 * 基本設定
	 */
	// エフェクト.
	addOptions( 'effect', attributes?.effect );
	// 速さ.
	addOptions( 'speed', secToMs( attributes?.speed, 300 ) );
	// ループ再生.
	addOptions( 'loop', attributes?.loop, true );
	/**
	 * オートプレイ.
	 */
	// 自動再生.
	if ( false !== attributes?.autoplay ) {
		const delay =
			0 === attributes?.autoplayDelay
				? 0
				: secToMs( attributes?.autoplayDelay ?? 3, 3000 );
		const autoplayOptions = {
			delay,
			pauseOnMouseEnter: attributes?.autoplayPauseOnMouse || undefined,
			disableOnInteraction:
				true === attributes?.autoplayDisableOnInteraction
					? undefined
					: attributes?.autoplayDisableOnInteraction,
			reverseDirection: attributes?.autoplayReverseDirection || undefined,
		};
		addOptions( 'autoplay', autoplayOptions );
	}
	/**
	 * スライド表示設定.
	 */
	if ( hasSlidesOption( attributes ) ) {
		addOptionsSlides( {
			...attributes,
			addOptions,
		} );
	}
	/**
	 * ナビゲーション.
	 */
	if ( attributes?.hasNavigation ) {
		addOptions( 'navigation', {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		} );
	}
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

export const addOptionsSlides = ( props ) => {
	const { slides, addOptions } = props;
	if ( ! isObject( slides ) ) {
		return;
	}
	const desktop = getResponsiveValue( slides, keys.desktop );
	const tablet = parseObjectAll( getResponsiveValue( slides, keys.tablet ) );
	const mobile = parseObjectAll( getResponsiveValue( slides, keys.mobile ) );

	if ( ! tablet && ! mobile ) {
		addOptions( 'slidesPerView', desktop?.slidesPerView, 1 );
		addOptions( 'spaceBetween', desktop?.spaceBetween );
		addOptions( 'slidesPerGroup', desktop?.slidesPerGroup, 1 );
		addOptions( 'centeredSlides', desktop?.centeredSlides );

		return;
	}

	addOptions( 'slidesPerView', mobile?.slidesPerView, 1 );
	addOptions( 'spaceBetween', mobile?.spaceBetween );
	addOptions( 'slidesPerGroup', mobile?.slidesPerGroup, 1 );
	addOptions( 'centeredSlides', mobile?.centeredSlides );

	let _breakpoints = {};
	const tabletBreakpoint = getBreakpoints( keys.tablet, props );
	const tabletValue = {
		slidesPerView: tablet?.slidesPerView || 1,
		spaceBetween: tablet?.spaceBetween || undefined,
		slidesPerGroup: tablet?.slidesPerGroup || 1,
		centeredSlides: tablet?.centeredSlides || undefined,
	};
	if ( tabletBreakpoint ) {
		_breakpoints = {
			..._breakpoints,
			[ tabletBreakpoint ]: tabletValue,
		};
	}
	const desktopBreakpoint = getBreakpoints( keys.desktop, props );
	const desktopValue = {
		slidesPerView: desktop?.slidesPerView || 1,
		spaceBetween: desktop?.spaceBetween || undefined,
		slidesPerGroup: desktop?.slidesPerGroup || 1,
		centeredSlides: desktop?.centeredSlides || undefined,
	};
	if ( desktopBreakpoint ) {
		_breakpoints = {
			..._breakpoints,
			[ desktopBreakpoint ]: desktopValue,
		};
	}

	addOptions( 'breakpoints', parseObjectAll( _breakpoints ) );
};

const getResponsiveCustomProperties = (
	property,
	value,
	prefix = '',
	ignoreDesktop = false
) => {
	if ( ! value || 'object' !== typeof value ) {
		return undefined;
	}
	let result = {};
	const _prefix = !! prefix ? `-${ prefix }` : '';
	const customProperty = `${ responsiveCustomPropertyPrefix }${ _prefix }-${ kebabCase(
		property
	) }`;
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

export const getRatioClassName = ( ratio ) => {
	if ( ! ratio ) {
		return undefined;
	}
	return classnames( 'ystdtb-ratio', `is-${ ratio }` );
};

export const getRatioInnerClassName = ( ratio ) => {
	return ! ratio ? undefined : 'ystdtb-ratio__inner';
};
