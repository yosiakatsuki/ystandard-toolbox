import { __ } from '@wordpress/i18n';

export const blockClasses = {
	blockClass: 'ystdtb-slider',
	slider: 'ystdtb-slider__slider',
	sliderContainer: 'ystdtb-slider__container',
	sliderPagination: 'ystdtb-slider__pagination',
	sliderButtonPrev: 'ystdtb-slider__button-prev',
	sliderButtonNext: 'ystdtb-slider__button-next',
	sliderScrollbar: 'ystdtb-slider__scrollbar',
};

export const sliderClasses = {
	wrap: 'swiper',
	container: 'swiper-wrapper',
	item: 'swiper-slide',
	pagination: 'swiper-pagination',
	buttonPrev: 'swiper-button-prev',
	buttonNext: 'swiper-button-next',
	scrollbar: 'swiper-scrollbar',
};

export const attributes = {
	sliderId: {
		type: 'string',
	},
	effect: {
		type: 'string',
	},
	speed: {
		type: 'number',
	},
	loop: {
		type: 'boolean',
		default: true,
	},
	autoplay: {
		type: 'boolean',
		default: true,
	},
	autoplayDelay: {
		type: 'number',
		default: 3,
	},
	autoplayPauseOnMouse: {
		type: 'boolean',
		default: false,
	},
	autoplayDisableOnInteraction: {
		type: 'boolean',
		default: true,
	},
	ratio: {
		type: 'string',
	},
	height: {
		type: 'object',
	},
	slides: {
		type: 'object',
	},
	breakpoints: {
		type: 'object',
	},
	hasNavigation: {
		type: 'boolean',
		default: false,
	},
	navigationColor: {
		type: 'string',
	},
	customNavigationColor: {
		type: 'string',
	},
	paginationType: {
		type: 'string',
	},
	paginationColor: {
		type: 'string',
	},
	previewType: {
		type: 'string',
		default: 'grid',
	},
};

export const supports = {
	anchor: false,
	align: [ 'wide', 'full' ],
	className: false,
	lightBlockWrapper: true,
};

export const ALLOWED_BLOCKS = [
	'core/image',
	'core/cover',
	'core/video',
	'ystdtb/slider-item',
];

export const effectOptions = [
	{
		label: __( 'スライド', 'ystandard-blocks' ),
		value: 'slide',
	},
	{
		label: __( 'フェード', 'ystandard-blocks' ),
		value: 'fade',
	},
	{
		label: __( 'カバー', 'ystandard-blocks' ),
		value: 'coverflow',
	},
	{
		label: __( 'キューブ', 'ystandard-blocks' ),
		value: 'cube',
	},
];
export const paginationOptions = [
	{
		label: __( 'なし', 'ystandard-blocks' ),
		value: '',
	},
	{
		label: __( 'ドット', 'ystandard-blocks' ),
		value: 'bullets',
	},
	{
		label: __( 'ダイナミック', 'ystandard-blocks' ),
		value: 'dynamicBullets',
	},
	{
		label: __( 'プログレスバー', 'ystandard-blocks' ),
		value: 'progressbar',
	},
	{
		label: __( 'スライド / 総スライド数', 'ystandard-blocks' ),
		value: 'fraction',
	},
];

export const breakpoints = {
	desktop: 769,
	tablet: 600,
};
