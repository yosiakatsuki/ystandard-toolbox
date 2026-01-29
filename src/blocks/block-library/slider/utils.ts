import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import { getColorClassName } from '@wordpress/block-editor';
/**
 * Block dependencies.
 */
import type { navigationType, SliderBlockAttributes } from './types';
import { getResponsiveCustomPropName } from '@aktk/block-components/utils/responsive-value';
import { isEmpty, stripUndefined } from '@aktk/block-components/utils/object';

/**
 * スライダーブロックのクラス名を取得
 */
export function getSliderBlockClasses() {
	return classnames( 'ystdtb-slider' );
}

/**
 * スライダーブロックのスタイルを取得
 * @param attributes
 */
export function getSliderBlockStyles( attributes: SliderBlockAttributes ) {
	const { ratio } = attributes;
	return {
		...getAspectRatioStyle( ratio || '' ),
	};
}

/**
 * スライダーブロックのラップクラス名を取得
 * @param attributes
 */
export function getSliderWrapClasses( attributes: SliderBlockAttributes ) {
	const { ratio, height, responsiveHeight } = attributes;
	return classnames( 'ystdtb-slider__slider', 'swiper', {
		'is-fixed-height': ratio || height || responsiveHeight,
	} );
}

/**
 * スライダーブロックのラップスタイルを取得
 * @param attributes
 */
export function getSliderWrapStyles( attributes: SliderBlockAttributes ) {
	const { height, responsiveHeight } = attributes;
	const types = [ 'desktop', 'tablet', 'mobile' ] as const;

	// レスポンシブ指定のあるスタイルを生成.
	const responsiveStyles = types.reduce(
		( acc, type ) => {
			// height.
			const _height = responsiveHeight?.[ type ];
			if ( _height ) {
				const customPropName = getResponsiveCustomPropName(
					'ystdtb',
					`slider--height`,
					type
				);
				acc[ customPropName ] = _height;
			}
			return acc;
		},
		{} as Record< string, string >
	);

	return {
		height,
		...responsiveStyles,
	};
}

/**
 * スライダーブロックのコンテナクラス名を取得
 */
export function getSliderContainerClasses() {
	return classnames( 'ystdtb-slider__container', 'swiper-wrapper', {} );
}

/**
 * スライダーブロックのコンテナスタイルを取得
 * @param attributes
 */
export function getSliderContainerStyles( attributes: SliderBlockAttributes ) {
	const { slideFunction } = attributes;
	return {
		transitionTimingFunction: slideFunction,
	};
}

/**
 * ナビゲーションボタンのクラス名を取得
 * @param type
 * @param attributes
 */
export function getNavigationClasses(
	type: navigationType,
	attributes: SliderBlockAttributes
) {
	const { navigationColor, customNavigationColor } = attributes;
	const navColorClass = getColorClassName( 'color', navigationColor || '' );
	return classnames( `swiper-button-${ type }`, {
		'has-text-color': navColorClass || customNavigationColor,
		[ navColorClass ]: navColorClass,
	} );
}

/**
 * ナビゲーションボタンのスタイルを取得
 * @param attributes
 */
export function getNavigationStyles( attributes: SliderBlockAttributes ) {
	const { customNavigationColor } = attributes;
	return {
		color: customNavigationColor || undefined,
	};
}

/**
 * ページネーションクラス名を取得
 */
export function getPaginationClasses() {
	return classnames( 'swiper-pagination' );
}

/**
 * ページネーションスタイルを取得
 * @param attributes
 */
export function getPaginationStyles( attributes: SliderBlockAttributes ) {
	const { paginationColor } = attributes;
	return {
		color: paginationColor || undefined,
		'--swiper-pagination-color': paginationColor || undefined,
	};
}

/**
 * スライダーオプションを取得
 *
 * @param attributes
 */
export function getSliderOptions( attributes: SliderBlockAttributes ) {
	const {
		effect,
		speed,
		loop = true,
		autoplay,
		autoplayDelay,
		autoplayPauseOnMouse,
		autoplayDisableOnInteraction = true,
		autoplayReverseDirection,
		slides,
		responsiveSlides,
		breakpoints,
		hasNavigation,
		paginationType,
	} = attributes;

	const {
		desktop: breakpointsDesktop = 1024,
		tablet: breakpointsTablet = 640,
	} = breakpoints || {};
	const breakpointsOptions = {
		[ breakpointsTablet ]: {},
		[ breakpointsDesktop ]: {},
	};

	// 自動再生設定.
	let autoplayOptions;
	if ( autoplay ) {
		autoplayOptions = {
			delay: getMilliseconds( autoplayDelay ) || 3000,
			pauseOnMouseEnter: autoplayPauseOnMouse,
			disableOnInteraction: ! autoplayDisableOnInteraction,
			reverseDirection: autoplayReverseDirection,
		};
	}

	// スライド形式のオプション.
	let slideEffectOptions = {};
	if ( hasSlidesOption( effect ) ) {
		// スライド設定（全デバイス共通）
		if ( ! isEmpty( slides as object ) ) {
			slideEffectOptions = {
				slidesPerView: slides?.slidesPerView || 1,
				spaceBetween: slides?.spaceBetween,
				slidesPerGroup: slides?.slidesPerGroup || 1,
				centeredSlides: slides?.centeredSlides,
			};
		}
		// スライド設定（デバイス別）
		if ( ! isEmpty( responsiveSlides as object ) ) {
			const {
				desktop: slidesDesktop,
				tablet: slidesTablet,
				mobile: slidesMobile,
			} = responsiveSlides || {};

			// モバイル設定が標準設定として
			const {
				slidesPerView: mobileSlidesPerView = 1,
				spaceBetween: mobileSpaceBetween,
				slidesPerGroup: mobileSlidesPerGroup = 1,
				centeredSlides: mobileCenteredSlides,
			} = slidesMobile || {};

			slideEffectOptions = {
				slidesPerView: mobileSlidesPerView,
				spaceBetween: mobileSpaceBetween,
				slidesPerGroup: mobileSlidesPerGroup,
				centeredSlides: mobileCenteredSlides,
			};
			// タブレット設定.
			if ( ! isEmpty( stripUndefined( slidesTablet as object ) || {} ) ) {
				const {
					slidesPerView: tabletSlidesPerView = 1,
					spaceBetween: tabletSpaceBetween,
					slidesPerGroup: tabletSlidesPerGroup = 1,
					centeredSlides: tabletCenteredSlides,
				} = slidesMobile || {};
				breakpointsOptions[ breakpointsTablet ] = {
					slidesPerView: tabletSlidesPerView,
					spaceBetween: tabletSpaceBetween,
					slidesPerGroup: tabletSlidesPerGroup,
					centeredSlides: tabletCenteredSlides,
				};
			}
			// デスクトップ設定.
			if (
				! isEmpty( stripUndefined( slidesDesktop as object ) || {} )
			) {
				const {
					slidesPerView: desktopSlidesPerView = 1,
					spaceBetween: desktopSpaceBetween,
					slidesPerGroup: desktopSlidesPerGroup = 1,
					centeredSlides: desktopCenteredSlides,
				} = slidesDesktop || {};
				breakpointsOptions[ breakpointsDesktop ] = {
					desktopSlidesPerView,
					desktopSpaceBetween,
					desktopSlidesPerGroup,
					desktopCenteredSlides,
				};
			}
		}
	}

	const sliderOptions = {
		effect,
		speed: getMilliseconds( speed ) || 300,
		loop,
		autoplay: autoplayOptions,
		navigation: hasNavigation
			? {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
			  }
			: undefined,
		pagination: paginationType
			? {
					type:
						'dynamicBullets' === paginationType
							? 'bullets'
							: paginationType,
					el: '.swiper-pagination',
					dynamicBullets: 'dynamicBullets' === paginationType,
			  }
			: undefined,
		...stripUndefined( slideEffectOptions ),
		...stripUndefined( breakpointsOptions ),
	};

	return JSON.stringify( sliderOptions );
}

/**
 * アスペクト比のスタイルを取得
 * @param ratio
 */
function getAspectRatioStyle( ratio: string ) {
	if ( ! ratio ) {
		return {};
	}
	const [ width, height ] = ratio.split( '-' ).map( Number );
	if ( ! width || ! height ) {
		return {};
	}
	return {
		aspectRatio: `${ width } / ${ height }`,
	} as CSSStyleDeclaration;
}

/**
 * 秒をミリ秒に変換
 * @param seconds
 */
function getMilliseconds( seconds: number | undefined ) {
	if ( undefined === seconds ) {
		return undefined;
	}
	return seconds * 1000;
}

export function hasSlidesOption( effect: string | undefined ) {
	return [ 'slide', 'coverflow' ].includes( effect ?? 'slide' );
}
