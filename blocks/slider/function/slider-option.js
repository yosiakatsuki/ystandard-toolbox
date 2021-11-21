import { isObject, parseObjectAll } from "@ystdtb/helper/object";
import { breakpoints } from "../config";
import { getResponsiveValue, responsiveKeys as keys } from "@ystdtb/helper/responsive";

export const getSliderOptions = ( attributes ) => {

	let options = {};

	const addOptions = ( name, value, defaultValue = undefined ) => {
		if ( undefined === value && undefined === defaultValue ) {
			return;
		}
		options = {
			...options,
			[ name ]: value ?? defaultValue,
		}
	}
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
		const autoplayOptions = {
			delay: secToMs( attributes?.autoplayDelay || 3, 3000 ),
			pauseOnMouseEnter: attributes?.autoplayPauseOnMouse || undefined,
			disableOnInteraction: true === attributes?.autoplayDisableOnInteraction ? undefined : attributes?.autoplayDisableOnInteraction,
		};
		addOptions( 'autoplay', autoplayOptions );
	}
	/**
	 * スライド表示設定.
	 */
	if ( hasSlidesOption( attributes ) ) {
		addOptionsSlides( {
			...attributes,
			addOptions
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
			type: 'dynamicBullets' === attributes?.paginationType ? 'bullets' : attributes?.paginationType,
			el: '.swiper-pagination',
			dynamicBullets: 'dynamicBullets' === attributes?.paginationType,
		}
		addOptions( 'pagination', pagination );
	}
	console.log( { options } );

	return JSON.stringify( options );
}

const secToMs = ( value, defaultValue = undefined ) => {
	if ( ! value || Number.isNaN( parseFloat( value ) ) ) {
		return defaultValue;
	}

	return parseFloat( value ) * 1000;
}

export const hasSlidesOption = ( attributes ) => {
	const list = [ 'slide', 'coverflow' ];
	return list.includes( attributes?.effect ?? 'slide' );
}

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
}

const getBreakpoints = ( type, attributes ) => {
	if ( keys.desktop === type ) {
		return attributes?.breakpoints?.desktop ?? breakpoints.desktop;
	}
	if ( keys.tablet === type ) {
		return attributes?.breakpoints?.tablet ?? breakpoints.tablet;
	}

	return 0;
}

export const addOptionsSlides = ( props ) => {
	const { slides, addOptions } = props;
	if ( ! isObject( slides ) ) {
		return;
	}
	const desktop = getResponsiveValue( slides, keys.desktop );
	const tablet = getResponsiveValue( slides, keys.tablet );
	const mobile = getResponsiveValue( slides, keys.mobile );

	if ( ! tablet && ! mobile ) {
		addOptions( 'slidesPerView', desktop?.slidesPerView, 1 );
		addOptions( 'spaceBetween', desktop?.spaceBetween );
		addOptions( 'slidesPerGroup', desktop?.slidesPerGroup, 1 );

		return;
	}

	addOptions( 'slidesPerView', mobile?.slidesPerView, 1 );
	addOptions( 'spaceBetween', mobile?.spaceBetween );
	addOptions( 'slidesPerGroup', mobile?.slidesPerGroup, 1 );

	let breakpoints = {};
	const tabletBreakpoint = getBreakpoints( keys.tablet, props );
	const tabletValue = {
		slidesPerView: tablet?.slidesPerView || 1,
		spaceBetween: tablet?.spaceBetween || undefined,
		slidesPerGroup: tablet?.slidesPerGroup || 1,
	}
	if ( tabletBreakpoint ) {
		breakpoints = {
			...breakpoints,
			[ tabletBreakpoint ]: tabletValue,
		}
	}
	const desktopBreakpoint = getBreakpoints( keys.desktop, props );
	let desktopValue = {
		slidesPerView: desktop?.slidesPerView || 1,
		spaceBetween: desktop?.spaceBetween || undefined,
		slidesPerGroup: desktop?.slidesPerGroup || 1,
	}
	if ( desktopBreakpoint ) {
		breakpoints = {
			...breakpoints,
			[ desktopBreakpoint ]: desktopValue,
		}
	}

	addOptions( 'breakpoints', parseObjectAll( breakpoints ) );

}
