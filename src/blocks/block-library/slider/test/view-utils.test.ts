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
	} );

	it( 'runtime breakpointがない場合は変更しない', () => {
		const options = {
			slidesPerView: 1,
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
			},
		};

		expect( normalizeSliderOptions( options ) ).toBe( options );
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
