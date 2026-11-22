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
 * スライダーブロックのラップクラス名を取得
 * @param attributes
 */
export function getSliderWrapClasses( attributes: SliderBlockAttributes ) {
	const { ratio, height, responsiveHeight, zoomAnimation } = attributes;
	return classnames( 'ystdtb-slider__slider', 'swiper', {
		'is-fixed-height': ratio || height || responsiveHeight,
		[ `has-zoom-animation--${ zoomAnimation }` ]:
			hasZoomAnimation( attributes ),
	} );
}

/**
 * ズームアニメーションの拡大率の初期値（%）
 */
export const ZOOM_ANIMATION_SCALE_DEFAULT = 110;

/**
 * ズームアニメーションを使うか判定
 *
 * 表示中のスライドをズームし続ける演出のため、スライドが重なって切り替わるフェードで、
 * 自動再生する場合だけ使う。条件から外れても設定値は残し、出力だけを止める。
 *
 * @param attributes
 */
export function hasZoomAnimation( attributes: SliderBlockAttributes ) {
	const { effect, autoplay, zoomAnimation } = attributes;
	return 'fade' === effect && !! autoplay && !! zoomAnimation;
}

/**
 * ズームアニメーションのスタイルを取得
 *
 * @param attributes
 */
function getZoomAnimationStyles( attributes: SliderBlockAttributes ) {
	// 使わないスライダーの保存HTMLを変えないよう、何も出力しない
	if ( ! hasZoomAnimation( attributes ) ) {
		return {};
	}
	const { speed, autoplayDelay, zoomAnimationScale, zoomAnimationEasing } =
		attributes;
	// フェードイン・表示・フェードアウトの間ずっと動くよう、切り替え2回分を足す
	const delay = getMilliseconds( autoplayDelay ) ?? 3000;
	const duration = Math.round(
		delay + ( getMilliseconds( speed ) || 300 ) * 2
	);
	const scale = ( zoomAnimationScale ?? ZOOM_ANIMATION_SCALE_DEFAULT ) / 100;

	return {
		'--ystdtb-slider--zoom-scale': String( scale ),
		'--ystdtb-slider--zoom-duration': `${ duration }ms`,
		// 未指定はCSS側でlinearにする
		'--ystdtb-slider--zoom-easing': zoomAnimationEasing || undefined,
	};
}

/**
 * スライダーブロックのラップスタイルを取得
 * @param attributes
 */
export function getSliderWrapStyles( attributes: SliderBlockAttributes ) {
	const { height, responsiveHeight,ratio } = attributes;
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
		...getAspectRatioStyle( ratio || '' ),
		...getZoomAnimationStyles( attributes ),
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
	const {
		navigationColor,
		customNavigationColor,
		navigationBackgroundColor,
	} = attributes;
	const navColorClass = getColorClassName( 'color', navigationColor || '' );
	const design = attributes.style?.ystdtb?.slider?.navigation?.design;
	// 背景色は座布団のあるデザインでだけ出力する。
	const backgroundClass = design
		? getColorClassName( 'background-color', navigationBackgroundColor )
		: undefined;
	return classnames( `swiper-button-${ type }`, {
		'has-text-color': navColorClass || customNavigationColor,
		[ navColorClass ]: navColorClass,
		[ `ystdtb-slider__navigation--${ design }` ]: design,
		[ backgroundClass || '' ]: backgroundClass,
	} );
}

/**
 * ナビゲーションボタンのスタイルを取得
 * @param attributes
 */
export function getNavigationStyles( attributes: SliderBlockAttributes ) {
	const { customNavigationColor, customNavigationBackgroundColor } =
		attributes;
	const navigation = attributes.style?.ystdtb?.slider?.navigation;
	const types = [ 'desktop', 'tablet', 'mobile' ] as const;
	// 端末別の大きさは、PHP側のメディアクエリで通常の大きさを上書きする。
	const responsiveStyles = types.reduce(
		( acc, type ) => {
			const size = navigation?.responsive?.size?.[ type ];
			if ( size ) {
				const customPropName = getResponsiveCustomPropName(
					'ystdtb',
					'slider--navigation-size',
					type
				);
				acc[ customPropName ] = size;
			}
			return acc;
		},
		{} as Record< string, string >
	);
	return {
		color: customNavigationColor || undefined,
		backgroundColor:
			( navigation?.design && customNavigationBackgroundColor ) ||
			undefined,
		'--swiper-navigation-size': navigation?.size || undefined,
		...responsiveStyles,
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
			delay: getMilliseconds( autoplayDelay ) ?? 3000,
			pauseOnMouseEnter: autoplayPauseOnMouse,
			disableOnInteraction: autoplayDisableOnInteraction,
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
				} = slidesTablet || {};
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
					slidesPerView: desktopSlidesPerView,
					spaceBetween: desktopSpaceBetween,
					slidesPerGroup: desktopSlidesPerGroup,
					centeredSlides: desktopCenteredSlides,
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
		breakpoints: stripUndefined( breakpointsOptions ),
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
