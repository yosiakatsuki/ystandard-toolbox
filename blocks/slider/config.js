export const blockClasses = {
	blockClass: 'ystdtb-slider',
	sliderContainer: 'ystdtb-slider__container',
	sliderPagination: 'ystdtb-slider__pagination',
	sliderButtonPrev: 'ystdtb-slider__button-prev',
	sliderButtonNext: 'ystdtb-slider__button-next',
	sliderScrollbar: 'ystdtb-slider__scrollbar',
}

export const sliderClasses = {
	wrap: 'swiper',
	container: 'swiper-wrapper',
	item: 'swiper-slide',
	pagination: 'swiper-pagination',
	buttonPrev: 'swiper-button-prev',
	buttonNext: 'swiper-button-next',
	scrollbar: 'swiper-scrollbar',
}

export const attributes = {
	sliderId: {
		type: 'string',
	}
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
]
