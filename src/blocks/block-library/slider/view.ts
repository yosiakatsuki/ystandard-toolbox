/**
 * スライダーブロック フロントエンド用JavaScript
 */
import Swiper from 'swiper';
import {
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	EffectCoverflow,
	EffectCube,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

document.addEventListener( 'DOMContentLoaded', () => {
	// @ts-ignore.
	window.ystdtbSlider = [];
	const sliders = document.querySelectorAll( '.ystdtb-slider__slider' );
	sliders.forEach( ( element ) => {
		const slideItem = element.querySelectorAll(
			'.ystdtb-slider__container > .wp-block-image,' +
				'.ystdtb-slider__container > .wp-block-video,' +
				'.ystdtb-slider__container > .wp-block-cover,' +
				'.ystdtb-slider__container > .ystdtb-slider-item'
		);
		slideItem.forEach( ( slideItemElement ) => {
			slideItemElement.classList.add( 'swiper-slide' );
		} );
		let options = {};
		if ( element.hasAttribute( 'data-slider-options' ) ) {
			try {
				options = JSON.parse(
					element.getAttribute( 'data-slider-options' ) || ''
				);
			} catch ( error ) {
				options = {};
			}
		}
		const slider = new Swiper( element as HTMLElement, options );
		console.log( { slider } );
		// @ts-ignore.
		window.ystdtbSlider = [ ...window.ystdtbSlider, slider ];
	} );
} );
