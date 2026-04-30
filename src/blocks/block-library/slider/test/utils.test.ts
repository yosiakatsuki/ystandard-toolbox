// slider ブロックの utils.ts 純関数テスト
// spec.md「L0 Jest unit テストパターン」に対応
import {
	getSliderBlockClasses,
	getSliderWrapClasses,
	getSliderWrapStyles,
	getSliderContainerClasses,
	getSliderContainerStyles,
	getNavigationClasses,
	getNavigationStyles,
	getPaginationClasses,
	getPaginationStyles,
	getSliderOptions,
	hasSlidesOption,
} from '../utils';
import type { SliderBlockAttributes } from '../types';

// block.json の default を反映した attributes ベース
// （実装の getSliderOptions は default が attributes に入っている前提で動く）
const DEFAULTS: SliderBlockAttributes = {
	effect: 'slide',
	speed: 0.3,
	loop: true,
	autoplay: true,
	autoplayDelay: 8,
	autoplayPauseOnMouse: false,
	autoplayDisableOnInteraction: true,
	autoplayReverseDirection: false,
	hasNavigation: false,
	previewType: 'grid',
};

const withDefaults = (
	overrides: Partial< SliderBlockAttributes > = {}
): SliderBlockAttributes => ( { ...DEFAULTS, ...overrides } );

// data-slider-options JSON 文字列をパースしてオブジェクト比較できる形にする
const parseOptions = ( attrs: SliderBlockAttributes ) =>
	JSON.parse( getSliderOptions( attrs ) );

describe( 'getSliderBlockClasses', () => {
	it( '"ystdtb-slider" 単一クラスを返す', () => {
		expect( getSliderBlockClasses() ).toBe( 'ystdtb-slider' );
	} );
} );

describe( 'getSliderWrapClasses', () => {
	it( 'デフォルト attributes では is-fixed-height は付かない', () => {
		expect( getSliderWrapClasses( withDefaults() ) ).toBe(
			'ystdtb-slider__slider swiper'
		);
	} );

	it( 'ratio 指定時に is-fixed-height が付く', () => {
		expect(
			getSliderWrapClasses( withDefaults( { ratio: '16-9' } ) )
		).toBe( 'ystdtb-slider__slider swiper is-fixed-height' );
	} );

	it( 'height 指定時に is-fixed-height が付く', () => {
		expect(
			getSliderWrapClasses( withDefaults( { height: '600px' } ) )
		).toBe( 'ystdtb-slider__slider swiper is-fixed-height' );
	} );

	it( 'responsiveHeight 指定時に is-fixed-height が付く', () => {
		expect(
			getSliderWrapClasses(
				withDefaults( { responsiveHeight: { desktop: '500px' } } )
			)
		).toBe( 'ystdtb-slider__slider swiper is-fixed-height' );
	} );
} );

describe( 'getSliderWrapStyles', () => {
	it.each( [
		[ '1-1', '1 / 1' ],
		[ '2-1', '2 / 1' ],
		[ '3-1', '3 / 1' ],
		[ '3-2', '3 / 2' ],
		[ '4-3', '4 / 3' ],
		[ '16-9', '16 / 9' ],
		[ '2-3', '2 / 3' ],
		[ '9-16', '9 / 16' ],
	] )(
		'ratio: "%s" → aspectRatio: "%s"',
		( ratio, expected ) => {
			const style = getSliderWrapStyles( withDefaults( { ratio } ) );
			expect( style.aspectRatio ).toBe( expected );
		}
	);

	it( 'height 単一値が style.height にそのまま入る', () => {
		const style = getSliderWrapStyles( withDefaults( { height: '600px' } ) );
		expect( style.height ).toBe( '600px' );
	} );

	it( 'responsiveHeight が CSS カスタムプロパティに展開される', () => {
		const style: any = getSliderWrapStyles(
			withDefaults( {
				responsiveHeight: {
					desktop: '500px',
					tablet: '400px',
					mobile: '300px',
				},
			} )
		);
		expect( style[ '--ystdtb--desktop--slider--height' ] ).toBe(
			'500px'
		);
		expect( style[ '--ystdtb--tablet--slider--height' ] ).toBe( '400px' );
		expect( style[ '--ystdtb--mobile--slider--height' ] ).toBe( '300px' );
	} );

	it( 'responsiveHeight 部分指定（desktop のみ）', () => {
		const style: any = getSliderWrapStyles(
			withDefaults( { responsiveHeight: { desktop: '500px' } } )
		);
		expect( style[ '--ystdtb--desktop--slider--height' ] ).toBe(
			'500px'
		);
		expect( style[ '--ystdtb--tablet--slider--height' ] ).toBeUndefined();
		expect( style[ '--ystdtb--mobile--slider--height' ] ).toBeUndefined();
	} );
} );

describe( 'getSliderContainerClasses', () => {
	it( '"ystdtb-slider__container swiper-wrapper" を返す', () => {
		expect( getSliderContainerClasses() ).toBe(
			'ystdtb-slider__container swiper-wrapper'
		);
	} );
} );

describe( 'getSliderContainerStyles', () => {
	it( 'slideFunction 未指定で transitionTimingFunction undefined', () => {
		const style = getSliderContainerStyles( withDefaults() );
		expect( style.transitionTimingFunction ).toBeUndefined();
	} );

	it( 'slideFunction: "ease-in-out" で transitionTimingFunction が設定される', () => {
		const style = getSliderContainerStyles(
			withDefaults( { slideFunction: 'ease-in-out' } )
		);
		expect( style.transitionTimingFunction ).toBe( 'ease-in-out' );
	} );
} );

describe( 'getNavigationClasses', () => {
	it( 'navigationColor / customNavigationColor 無指定では prev/next 単一クラス', () => {
		expect(
			getNavigationClasses( 'prev', withDefaults() )
		).toBe( 'swiper-button-prev' );
		expect(
			getNavigationClasses( 'next', withDefaults() )
		).toBe( 'swiper-button-next' );
	} );

	it( 'navigationColor: "ys-red" で has-text-color と has-ys-red-color が付く', () => {
		expect(
			getNavigationClasses(
				'prev',
				withDefaults( { navigationColor: 'ys-red' } )
			)
		).toBe( 'swiper-button-prev has-text-color has-ys-red-color' );
	} );

	it( 'customNavigationColor のみで has-text-color が付く（プリセット色クラスなし）', () => {
		expect(
			getNavigationClasses(
				'next',
				withDefaults( { customNavigationColor: '#ff6600' } )
			)
		).toBe( 'swiper-button-next has-text-color' );
	} );
} );

describe( 'getNavigationStyles', () => {
	it( 'customNavigationColor 未指定で color: undefined', () => {
		const style = getNavigationStyles( withDefaults() );
		expect( style.color ).toBeUndefined();
	} );

	it( 'customNavigationColor 指定で color に hex 値が入る', () => {
		const style = getNavigationStyles(
			withDefaults( { customNavigationColor: '#ff6600' } )
		);
		expect( style.color ).toBe( '#ff6600' );
	} );
} );

describe( 'getPaginationClasses', () => {
	it( '"swiper-pagination" 単一クラスを返す', () => {
		expect( getPaginationClasses() ).toBe( 'swiper-pagination' );
	} );
} );

describe( 'getPaginationStyles', () => {
	it( 'paginationColor 未指定で color と --swiper-pagination-color が undefined', () => {
		const style: any = getPaginationStyles( withDefaults() );
		expect( style.color ).toBeUndefined();
		expect( style[ '--swiper-pagination-color' ] ).toBeUndefined();
	} );

	it( 'paginationColor 指定で color と --swiper-pagination-color に同値が入る', () => {
		const style: any = getPaginationStyles(
			withDefaults( { paginationColor: '#ff00aa' } )
		);
		expect( style.color ).toBe( '#ff00aa' );
		expect( style[ '--swiper-pagination-color' ] ).toBe( '#ff00aa' );
	} );
} );

describe( 'hasSlidesOption', () => {
	it( '"slide" は true', () => {
		expect( hasSlidesOption( 'slide' ) ).toBe( true );
	} );
	it( '"coverflow" は true', () => {
		expect( hasSlidesOption( 'coverflow' ) ).toBe( true );
	} );
	it( '"fade" は false', () => {
		expect( hasSlidesOption( 'fade' ) ).toBe( false );
	} );
	it( '"cube" は false', () => {
		expect( hasSlidesOption( 'cube' ) ).toBe( false );
	} );
	it( 'undefined は "slide" にフォールバックして true', () => {
		expect( hasSlidesOption( undefined ) ).toBe( true );
	} );
} );

describe( 'getSliderOptions', () => {
	it( 'デフォルト attributes', () => {
		const opts = parseOptions( withDefaults() );
		expect( opts.effect ).toBe( 'slide' );
		expect( opts.speed ).toBe( 300 );
		expect( opts.loop ).toBe( true );
		expect( opts.autoplay ).toEqual( {
			delay: 8000,
			pauseOnMouseEnter: false,
			disableOnInteraction: true,
			reverseDirection: false,
		} );
		expect( opts.navigation ).toBeUndefined();
		expect( opts.pagination ).toBeUndefined();
	} );

	describe( 'effect', () => {
		it.each( [ 'slide', 'fade', 'coverflow', 'cube' ] )(
			'effect: "%s" がそのまま JSON に含まれる',
			( effect ) => {
				const opts = parseOptions( withDefaults( { effect } ) );
				expect( opts.effect ).toBe( effect );
			}
		);
	} );

	describe( 'speed', () => {
		it( 'speed: 1 → 1000ms', () => {
			expect( parseOptions( withDefaults( { speed: 1 } ) ).speed ).toBe(
				1000
			);
		} );
		it( 'speed: 5 → 5000ms', () => {
			expect( parseOptions( withDefaults( { speed: 5 } ) ).speed ).toBe(
				5000
			);
		} );
	} );

	describe( 'loop', () => {
		it( 'loop: false', () => {
			expect( parseOptions( withDefaults( { loop: false } ) ).loop ).toBe(
				false
			);
		} );
	} );

	describe( 'autoplay', () => {
		it( 'autoplay: false で autoplay キー自体が出力されない', () => {
			const opts = parseOptions( withDefaults( { autoplay: false } ) );
			expect( opts.autoplay ).toBeUndefined();
		} );

		it( 'autoplayDelay: 5 → delay: 5000', () => {
			const opts = parseOptions( withDefaults( { autoplayDelay: 5 } ) );
			expect( opts.autoplay.delay ).toBe( 5000 );
		} );

		it( 'autoplayDelay: 15 → delay: 15000', () => {
			const opts = parseOptions(
				withDefaults( { autoplayDelay: 15 } )
			);
			expect( opts.autoplay.delay ).toBe( 15000 );
		} );

		it( 'autoplayPauseOnMouse: true → pauseOnMouseEnter: true', () => {
			const opts = parseOptions(
				withDefaults( { autoplayPauseOnMouse: true } )
			);
			expect( opts.autoplay.pauseOnMouseEnter ).toBe( true );
		} );

		it( 'autoplayDisableOnInteraction: false → disableOnInteraction: false', () => {
			const opts = parseOptions(
				withDefaults( { autoplayDisableOnInteraction: false } )
			);
			expect( opts.autoplay.disableOnInteraction ).toBe( false );
		} );

		it( 'autoplayDisableOnInteraction: true → disableOnInteraction: true', () => {
			const opts = parseOptions(
				withDefaults( { autoplayDisableOnInteraction: true } )
			);
			expect( opts.autoplay.disableOnInteraction ).toBe( true );
		} );

		it( 'autoplayReverseDirection: true → reverseDirection: true', () => {
			const opts = parseOptions(
				withDefaults( { autoplayReverseDirection: true } )
			);
			expect( opts.autoplay.reverseDirection ).toBe( true );
		} );
	} );

	describe( 'navigation', () => {
		it( 'hasNavigation: true で navigation キーに nextEl / prevEl が入る', () => {
			const opts = parseOptions(
				withDefaults( { hasNavigation: true } )
			);
			expect( opts.navigation ).toEqual( {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			} );
		} );
	} );

	describe( 'pagination', () => {
		it( 'paginationType: "bullets" → type: "bullets", dynamicBullets: false', () => {
			const opts = parseOptions(
				withDefaults( { paginationType: 'bullets' } )
			);
			expect( opts.pagination ).toEqual( {
				type: 'bullets',
				el: '.swiper-pagination',
				dynamicBullets: false,
			} );
		} );

		it( 'paginationType: "dynamicBullets" → type: "bullets", dynamicBullets: true（type 変換あり）', () => {
			const opts = parseOptions(
				withDefaults( { paginationType: 'dynamicBullets' } )
			);
			expect( opts.pagination ).toEqual( {
				type: 'bullets',
				el: '.swiper-pagination',
				dynamicBullets: true,
			} );
		} );

		it( 'paginationType: "progressbar"', () => {
			const opts = parseOptions(
				withDefaults( { paginationType: 'progressbar' } )
			);
			expect( opts.pagination.type ).toBe( 'progressbar' );
			expect( opts.pagination.dynamicBullets ).toBe( false );
		} );

		it( 'paginationType: "fraction"', () => {
			const opts = parseOptions(
				withDefaults( { paginationType: 'fraction' } )
			);
			expect( opts.pagination.type ).toBe( 'fraction' );
			expect( opts.pagination.dynamicBullets ).toBe( false );
		} );
	} );

	describe( 'slides（全デバイス共通）', () => {
		it( 'slides: { slidesPerView: 2 } → slidesPerView: 2, slidesPerGroup: 1（fallback）', () => {
			const opts = parseOptions(
				withDefaults( { slides: { slidesPerView: 2 } } )
			);
			expect( opts.slidesPerView ).toBe( 2 );
			expect( opts.slidesPerGroup ).toBe( 1 );
		} );

		it( 'slides: { slidesPerView: "auto" }', () => {
			const opts = parseOptions(
				withDefaults( { slides: { slidesPerView: 'auto' } } )
			);
			expect( opts.slidesPerView ).toBe( 'auto' );
		} );

		it( 'slides: { slidesPerView: 2, slidesPerGroup: 2 }', () => {
			const opts = parseOptions(
				withDefaults( {
					slides: { slidesPerView: 2, slidesPerGroup: 2 },
				} )
			);
			expect( opts.slidesPerGroup ).toBe( 2 );
		} );

		it( 'slides: { slidesPerView: 2, spaceBetween: "16px" }', () => {
			const opts = parseOptions(
				withDefaults( {
					slides: { slidesPerView: 2, spaceBetween: '16px' },
				} )
			);
			expect( opts.spaceBetween ).toBe( '16px' );
		} );

		it( 'slides: { slidesPerView: 2, centeredSlides: true }', () => {
			const opts = parseOptions(
				withDefaults( {
					slides: { slidesPerView: 2, centeredSlides: true },
				} )
			);
			expect( opts.centeredSlides ).toBe( true );
		} );

		it( 'effect: "fade" + slides: {...} で slidesPerView は出力されない（hasSlidesOption false）', () => {
			const opts = parseOptions(
				withDefaults( {
					effect: 'fade',
					slides: { slidesPerView: 2 },
				} )
			);
			expect( opts.slidesPerView ).toBeUndefined();
		} );
	} );

	// Swiper の breakpoints 仕様（https://swiperjs.com/swiper-api#param-breakpoints）に
	// 準拠した期待値で書く。実装が仕様通りでない場合（B001 / B002 / B003）は失敗する。
	describe( 'responsiveSlides（デバイス別、Swiper 仕様準拠）', () => {
		it( 'mobile のみ → ベース値に mobile の値、breakpoints は出力されない', () => {
			const opts = parseOptions(
				withDefaults( {
					responsiveSlides: { mobile: { slidesPerView: 1 } },
				} )
			);
			// mobile はベース（トップレベル）に出る
			expect( opts.slidesPerView ).toBe( 1 );
			expect( opts.slidesPerGroup ).toBe( 1 );
			// breakpoints は出力されない（他デバイス未指定）
			expect( opts.breakpoints ).toBeUndefined();
			// トップレベルにも数値キー（640 / 1024）は出ない
			expect( opts[ '640' ] ).toBeUndefined();
			expect( opts[ '1024' ] ).toBeUndefined();
		} );

		it( 'mobile + tablet → breakpoints.640 に tablet の値が入る', () => {
			const opts = parseOptions(
				withDefaults( {
					responsiveSlides: {
						mobile: { slidesPerView: 1 },
						tablet: { slidesPerView: 2 },
					},
				} )
			);
			// ベースは mobile
			expect( opts.slidesPerView ).toBe( 1 );
			// breakpoints は Swiper 仕様のネスト構造、640 には tablet の値が入る
			expect( opts.breakpoints ).toEqual( {
				640: {
					slidesPerView: 2,
					slidesPerGroup: 1,
				},
			} );
			// トップレベルに数値キーが直接展開されてはいけない
			expect( opts[ '640' ] ).toBeUndefined();
		} );

		it( 'mobile + tablet + desktop → breakpoints.640 に tablet、breakpoints.1024 に desktop の値', () => {
			const opts = parseOptions(
				withDefaults( {
					responsiveSlides: {
						mobile: { slidesPerView: 1 },
						tablet: { slidesPerView: 2 },
						desktop: {
							slidesPerView: 3,
							spaceBetween: '24px',
						},
					},
				} )
			);
			// ベースは mobile
			expect( opts.slidesPerView ).toBe( 1 );
			// breakpoints はネスト構造、各デバイスは Swiper 仕様のキー名
			expect( opts.breakpoints ).toEqual( {
				640: {
					slidesPerView: 2,
					slidesPerGroup: 1,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: '24px',
					slidesPerGroup: 1,
				},
			} );
			// トップレベルに数値キーが直接展開されてはいけない
			expect( opts[ '640' ] ).toBeUndefined();
			expect( opts[ '1024' ] ).toBeUndefined();
		} );
	} );
} );
