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
	breakpoints?: breakpoints;
	hasNavigation?: boolean;
	navigationColor?: string;
	customNavigationColor?: string;
	paginationType?: string;
	paginationColor?: string;
	previewType?: string;
}

export interface Slides {
	desktop: SlideOptions;
	tablet: SlideOptions;
	mobile: SlideOptions;
}

export interface SlideOptions {
	slidesPerView?: number;
	spaceBetween?: string;
	slidesPerGroup?: number;
	centeredSlides?: boolean;
}

export type breakpoints = {
	desktop: number;
	tablet: number;
	mobile: number;
};

export type navigationType = 'next' | 'prev';
