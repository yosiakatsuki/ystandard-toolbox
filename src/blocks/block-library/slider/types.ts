import type { ResponsiveValues } from '@aktk/block-components/types';

export interface SliderEditProps {
	attributes: SliderBlockAttributes;
	setAttributes: ( attributes: Partial< SliderBlockAttributes > ) => void;
	clientId: string;
	isSelected: boolean;
}

/**
 * スライダーブロックの属性型定義
 */
export interface SliderBlockAttributes {
	sliderId?: string;
	effect?: string;
	speed?: number;
	loop?: boolean;
	slideFunction?: string;
	autoplay?: boolean;
	autoplayDelay?: number;
	autoplayPauseOnMouse?: boolean;
	autoplayDisableOnInteraction?: boolean;
	autoplayReverseDirection?: boolean;
	ratio?: string;
	height?: string;
	responsiveHeight?: ResponsiveValues;
	slides?: Slides;
	responsiveSlides?: ResponsiveSlides;
	breakpoints?: breakpoints;
	hasNavigation?: boolean;
	navigationColor?: string;
	customNavigationColor?: string;
	navigationBackgroundColor?: string;
	customNavigationBackgroundColor?: string;
	paginationType?: string;
	paginationColor?: string;
	previewType?: previewType;
	previewColumns?: number;
	zoomAnimation?: ZoomAnimationType;
	zoomAnimationScale?: number;
	zoomAnimationEasing?: string;
	style?: SliderStyle;
}

/**
 * ズームアニメーションの種類。in: ズームイン、out: ズームアウト。
 */
export type ZoomAnimationType = 'in' | 'out';

/**
 * スライダーのスタイル属性。標準サポートの値と独自スタイルを持つ。
 */
export interface SliderStyle {
	ystdtb?: {
		slider?: {
			navigation?: SliderNavigationStyle;
		};
	};
	[ key: string ]: unknown;
}

export type NavigationDesign = 'square' | 'circle';

/**
 * 矢印（ナビゲーション）の独自スタイル。
 */
export interface SliderNavigationStyle {
	design?: NavigationDesign;
	size?: string;
	responsive?: {
		size?: ResponsiveValues;
	};
}

export interface ResponsiveSlides {
	desktop?: Slides;
	tablet?: Slides;
	mobile?: Slides;
}

export interface Slides {
	slidesPerView?: number | 'auto';
	spaceBetween?: string;
	slidesPerGroup?: number;
	centeredSlides?: boolean;
}

export type breakpoints = {
	desktop: number;
	tablet: number;
	mobile: number;
};

export type previewType = 'grid' | 'horizontal';

export type navigationType = 'next' | 'prev';

export interface SlideOptionEditProps {
	onChange: ( newValue?: Slides ) => void;
	value?: Slides;
	type: 'normal' | 'desktop' | 'tablet' | 'mobile';
}

export interface ResponsiveSlideOptionEditProps {
	onChange: ( newValue?: ResponsiveSlides ) => void;
	value?: ResponsiveSlides;
	type: 'desktop' | 'tablet' | 'mobile';
}
