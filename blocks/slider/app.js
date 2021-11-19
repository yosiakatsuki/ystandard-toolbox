import Swiper, {
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	EffectCoverflow,
	EffectCube,
} from 'swiper';

Swiper.use( [
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	EffectCoverflow,
	EffectCube,
] );

// eslint-disable-next-line @wordpress/no-global-event-listener
document.addEventListener( 'DOMContentLoaded', () => {
	let sliders = document.querySelectorAll( '.ystdtb-slider' );
	sliders = Array.prototype.slice.call( sliders, 0 );
	sliders.forEach( ( element ) => {
		let slideItem = element.querySelectorAll( '.ystdtb-slider__container > *' );
		slideItem = Array.prototype.slice.call( slideItem, 0 );
		slideItem.forEach( ( slideItemElement ) => {
			slideItemElement.classList.add( 'swiper-slide' );
		} );
		const selector = element?.id ? `#${ element.id }` : '.swiper';
		let options = {};
		if ( element.hasAttribute( 'data-slider-options' ) ) {
			try {
				options = JSON.parse( element.getAttribute( 'data-slider-options' ) );
			} catch ( error ) {
				options = {};
			}
		}
		options = JSON.parse( '{"loop":true,"speed":400,"autoplay":{"delay":2000}}' );
		new Swiper( selector, options );
		console.log( {
			selector,
			options
		} );
	} );
} );
