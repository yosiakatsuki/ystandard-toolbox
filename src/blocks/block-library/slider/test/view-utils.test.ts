import { normalizeSliderOptions } from '../view-utils';

describe( 'normalizeSliderOptions', () => {
	it( '保存済みの640/1024キーをruntime breakpointに差し替える', () => {
		const options = normalizeSliderOptions(
			{
				slidesPerView: 1,
				breakpoints: {
					640: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
				},
			},
			{
				breakpoints: {
					tablet: 600,
					desktop: 769,
				},
			}
		);

		expect( options.breakpoints ).toEqual( {
			600: {
				slidesPerView: 2,
			},
			769: {
				slidesPerView: 3,
			},
		} );
		expect( options.resizeObserver ).toBe( false );
	} );

	it( 'runtime breakpointがない場合もresizeObserverを無効化する', () => {
		const options = {
			slidesPerView: 1,
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
			},
		};

		expect( normalizeSliderOptions( options ) ).toEqual( {
			...options,
			resizeObserver: false,
		} );
	} );

	it( 'fadeエフェクトではcrossFadeを有効化する', () => {
		expect(
			normalizeSliderOptions( {
				effect: 'fade',
			} ).fadeEffect
		).toEqual( {
			crossFade: true,
		} );
	} );

	it( '既存のfadeEffect設定を維持してcrossFadeを有効化する', () => {
		expect(
			normalizeSliderOptions( {
				effect: 'fade',
				fadeEffect: {
					crossFade: false,
				},
			} ).fadeEffect
		).toEqual( {
			crossFade: true,
		} );
	} );

	it( 'fade以外のエフェクトではfadeEffectを追加しない', () => {
		expect(
			normalizeSliderOptions( {
				effect: 'slide',
			} ).fadeEffect
		).toBeUndefined();
	} );

	it( '既知キー以外のbreakpointは維持する', () => {
		const options = normalizeSliderOptions(
			{
				breakpoints: {
					640: {
						slidesPerView: 2,
					},
					1200: {
						slidesPerView: 4,
					},
				},
			},
			{
				breakpoints: {
					tablet: 600,
				},
			}
		);

		expect( options.breakpoints ).toEqual( {
			600: {
				slidesPerView: 2,
			},
			1200: {
				slidesPerView: 4,
			},
		} );
	} );
} );
