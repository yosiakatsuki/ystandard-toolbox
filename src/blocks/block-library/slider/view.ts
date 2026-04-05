/**
 * スライダーブロック フロントエンド用JavaScript
 */
import Swiper from 'swiper';
import type { SwiperModule, SwiperOptions } from 'swiper/types';
import {
	Autoplay,
	Navigation,
	Pagination,
	EffectFade,
	EffectCoverflow,
	EffectCube,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';

/**
 * エフェクト名とモジュールの対応マップ
 */
const EFFECT_MODULES: Record< string, SwiperModule > = {
	fade: EffectFade,
	coverflow: EffectCoverflow,
	cube: EffectCube,
};

/**
 * オプションに基づいて必要なSwiperモジュールを取得
 *
 * @param options Swiperオプション
 */
function getModules( options: SwiperOptions ): SwiperModule[] {
	const modules: SwiperModule[] = [];

	if ( options.autoplay ) {
		modules.push( Autoplay );
	}
	if ( options.navigation ) {
		modules.push( Navigation );
	}
	if ( options.pagination ) {
		modules.push( Pagination );
	}

	// エフェクトモジュール.
	const effectModule =
		EFFECT_MODULES[ options.effect as string ] ?? undefined;
	if ( effectModule ) {
		modules.push( effectModule );
	}

	return modules;
}

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
		let options: SwiperOptions = {};
		if ( element.hasAttribute( 'data-slider-options' ) ) {
			try {
				options = JSON.parse(
					element.getAttribute( 'data-slider-options' ) || ''
				);
			} catch ( error ) {
				options = {};
			}
		}
		// オプションに基づいたモジュールを設定.
		options.modules = getModules( options );
		const slider = new Swiper( element as HTMLElement, options );
		// @ts-ignore.
		window.ystdtbSlider = [ ...window.ystdtbSlider, slider ];
	} );
} );
