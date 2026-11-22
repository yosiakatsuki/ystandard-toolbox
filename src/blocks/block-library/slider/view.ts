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
import {
	normalizeSliderOptions,
	type SliderRuntimeSettings,
} from './view-utils';
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

declare global {
	interface Window {
		ystdtbSliderSettings?: SliderRuntimeSettings;
	}
}

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

/**
 * ズームアニメーション中のスライドに付けるクラス
 */
const ZOOM_ACTIVE_CLASS = 'is-zoom-active';

/**
 * ズームアニメーションのクラスを、表示中のスライドに付け替える
 *
 * CSSの.swiper-slide-activeだけで動かすと、フェードアウトの途中でズームが解除され、
 * 画像が元の大きさに戻って見える。切り替えが終わるまで、前のスライドにもクラスを残す。
 *
 * @param slider Swiperインスタンス
 */
function setupZoomAnimation( slider: Swiper ) {
	const addToActiveSlide = () => {
		slider.slides[ slider.activeIndex ]?.classList.add( ZOOM_ACTIVE_CLASS );
	};
	slider.on( 'slideChangeTransitionStart', addToActiveSlide );
	slider.on( 'slideChangeTransitionEnd', () => {
		slider.slides.forEach( ( slide, index ) => {
			// 次に表示されたとき最初から再生するよう、表示中以外のスライドから外す
			if ( index !== slider.activeIndex ) {
				slide.classList.remove( ZOOM_ACTIVE_CLASS );
			}
		} );
	} );
	addToActiveSlide();
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
		options = normalizeSliderOptions(
			options,
			window.ystdtbSliderSettings
		);
		// オプションに基づいたモジュールを設定.
		options.modules = getModules( options );
		const slider = new Swiper( element as HTMLElement, options );
		// 保存時に条件を満たしたスライダーだけ、ズームアニメーションを動かす
		if (
			element.matches(
				'.has-zoom-animation--in, .has-zoom-animation--out'
			)
		) {
			setupZoomAnimation( slider );
		}
		// @ts-ignore.
		window.ystdtbSlider = [ ...window.ystdtbSlider, slider ];
	} );
} );
