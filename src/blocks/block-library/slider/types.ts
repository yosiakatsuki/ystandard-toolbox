import type { ResponsiveValues } from '@aktk/block-components/types';

export interface SliderEditProps {
	attributes: SliderBlockAttributes;
	setAttributes: ( attributes: Partial< SliderBlockAttributes > ) => void;
	clientId: string;
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
	paginationType?: string;
	paginationColor?: string;
	previewType?: previewType;
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
