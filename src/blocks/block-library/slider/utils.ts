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
	if (
		[ 'slide', 'coverflow' ].includes( effect ?? 'slide' ) &&
		! isEmpty( slides as object )
	) {
		const {
			desktop: slidesDesktop,
			tablet: slidesTablet,
			mobile: slidesMobile,
		} = slides || {};
		// @ts-ignore
		const hasTabletSlides = ! isEmpty( stripUndefined( slidesTablet ) );
		// @ts-ignore
		const hasMobileSlides = ! isEmpty( stripUndefined( slidesMobile ) );

		const {
			slidesPerView = 1,
			spaceBetween,
			slidesPerGroup = 1,
			centeredSlides,
		} = slidesDesktop || {};

		slideEffectOptions = {
			slidesPerView,
			spaceBetween,
			slidesPerGroup,
			centeredSlides,
		};
		// レスポンシブ設定がある場合はbreakpointsを生成.
		if ( hasTabletSlides || hasMobileSlides ) {
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

			if ( hasTabletSlides ) {
				const {
					slidesPerView: tabletSlidesPerView = 1,
					spaceBetween: tabletSpaceBetween,
					slidesPerGroup: tabletSlidesPerGroup = 1,
					centeredSlides: tabletCenteredSlides,
				} = slidesTablet || {};
				breakpointsOptions[ breakpointsTablet ] = {
					slidesPerView: tabletSlidesPerView,
					spaceBetween: tabletSpaceBetween,
					slidesPerGroup: tabletSlidesPerGroup,
					centeredSlides: tabletCenteredSlides,
				};
			}
			// @ts-ignore
			if ( ! isEmpty( stripUndefined( slidesDesktop ) ) ) {
				breakpointsOptions[ breakpointsDesktop ] = {
					slidesPerView,
					spaceBetween,
					slidesPerGroup,
					centeredSlides,
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

function getMilliseconds( seconds: number | undefined ) {
	if ( undefined === seconds ) {
		return undefined;
	}
	return seconds * 1000;
}
