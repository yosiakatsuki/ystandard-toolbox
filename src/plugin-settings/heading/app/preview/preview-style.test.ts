import { render } from '@testing-library/react';
import PreviewStyle, {
	parseStyles,
	parseStylesPseudoElements,
	isFontSize,
	parseFontSizeStyle,
	isBorder,
} from './preview-style';
import type {
	HeadingPseudoElementsStyle,
	HeadingStyle,
} from '@aktk/plugin-settings/heading/types';

/**
 * PreviewStyleのテスト
 */
describe( 'PreviewStyle', () => {
	it( 'スタイル要素が正しいCSSでレンダリングされること', () => {
		const props = {
			style: {
				fontSize: { desktop: '24px' },
				color: '#000000',
			} as HeadingStyle,
			selector: 'test-selector',
		};

		const { container } = render( PreviewStyle( props ) );
		const styleElement = container.querySelector( 'style' );
		expect( styleElement ).toBeTruthy();
		expect( styleElement?.textContent ).toContain( 'test-selector' );
		expect( styleElement?.textContent ).toContain( 'font-size: 24px' );
		expect( styleElement?.textContent ).toContain( 'color: #000000' );
	} );

	it( 'selectorの指定がない場合', () => {
		const props = {
			style: {
				fontSize: { desktop: '24px' },
				color: '#000000',
			} as HeadingStyle,
		};

		const { container } = render( PreviewStyle( props ) );
		const styleElement = container.querySelector( 'style' );
		expect( styleElement ).toBeTruthy();
		expect( styleElement?.textContent ).toContain(
			'ystdtb-setting-heading__preview-text'
		);
	} );
} );

/**
 * parseStylesのテスト
 */
describe( 'parseStyles', () => {
	describe( 'オブジェクトの扱い', () => {
		it( '空のスタイルオブジェクトを正しく解析すること', () => {
			const result = parseStyles( {} );
			expect( result ).toEqual( {} );
		} );

		it( 'レスポンシブスタイルを正しく解析すること', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
					tablet: '20px',
					mobile: '18px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'font-size: 24px;' );
			expect( result.tablet ).toContain( 'font-size: 20px;' );
			expect( result.mobile ).toContain( 'font-size: 18px;' );
		} );
	} );

	describe( 'fontSize', () => {
		it( 'fontSizeの場合はフォントサイズの値を正しく解析すること', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'font-size: 24px;' );
			expect( result.tablet ).not.toContain( 'font-size:' );
			expect( result.mobile ).not.toContain( 'font-size:' );
		} );
		it( 'fontSizeの値がレスポンシブ指定の場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
					tablet: '20px',
					mobile: '18px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'font-size: 24px;' );
			expect( result.tablet ).toContain( 'font-size: 20px;' );
			expect( result.mobile ).toContain( 'font-size: 18px;' );
		} );
		it( 'fontSizeの値がタブレットのみ指定の場合', () => {
			const styles = {
				fontSize: {
					tablet: '20px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'font-size:' );
			expect( result.tablet ).toContain( 'font-size: 20px;' );
			expect( result.mobile ).not.toContain( 'font-size:' );
		} );
		it( 'fontSizeの値がモバイルのみ指定の場合', () => {
			const styles = {
				fontSize: {
					mobile: '18px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'font-size:' );
			expect( result.tablet ).not.toContain( 'font-size:' );
			expect( result.mobile ).toContain( 'font-size: 18px;' );
		} );
	} );

	describe( 'color', () => {
		it( 'colorが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'color: ' );
			expect( result.tablet ).not.toContain( 'color:' );
			expect( result.mobile ).not.toContain( 'color:' );
		} );
		it( 'colorの場合は色の値を正しく解析すること', () => {
			const styles = {
				color: '#000000',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'color: #000000;' );
			expect( result.tablet ).not.toContain( 'color:' );
			expect( result.mobile ).not.toContain( 'color:' );
		} );
	} );

	describe( 'textAlign', () => {
		it( 'textAlignが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'text-align:' );
			expect( result.tablet ).not.toContain( 'text-align:' );
			expect( result.mobile ).not.toContain( 'text-align:' );
		} );
		it( 'textAlignがある場合', () => {
			const styles = {
				textAlign: {
					desktop: 'center',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'text-align: center;' );
			expect( result.tablet ).not.toContain( 'text-align:' );
			expect( result.mobile ).not.toContain( 'text-align:' );
		} );
		it( 'textAlignがレスポンシブ指定の場合', () => {
			const styles = {
				textAlign: {
					desktop: 'center',
					tablet: 'left',
					mobile: 'right',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'text-align: center;' );
			expect( result.tablet ).toContain( 'text-align: left;' );
			expect( result.mobile ).toContain( 'text-align: right;' );
		} );
	} );

	describe( 'fontWeight', () => {
		it( 'fontWeightが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'font-weight:' );
			expect( result.tablet ).not.toContain( 'font-weight:' );
			expect( result.mobile ).not.toContain( 'font-weight:' );
		} );
		it( 'fontWeightがある場合', () => {
			const styles = {
				fontWeight: {
					desktop: 'bold',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'font-weight: bold;' );
			expect( result.tablet ).not.toContain( 'font-weight:' );
			expect( result.mobile ).not.toContain( 'font-weight:' );
		} );
		it( 'fontWeightがレスポンシブ指定の場合', () => {
			const styles = {
				fontWeight: {
					desktop: 'bold',
					tablet: 'normal',
					mobile: 'lighter',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'font-weight: bold;' );
			expect( result.tablet ).toContain( 'font-weight: normal;' );
			expect( result.mobile ).toContain( 'font-weight: lighter;' );
		} );
	} );

	describe( 'fontStyle', () => {
		it( 'fontStyleが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'font-style:' );
			expect( result.tablet ).not.toContain( 'font-style:' );
			expect( result.mobile ).not.toContain( 'font-style:' );
		} );
		it( 'fontStyleがある場合', () => {
			const styles = {
				fontStyle: 'italic',
			};
			const result = parseStyles( styles );
			// fontStyle は特殊処理があってimportantつける.
			expect( result.desktop ).toContain(
				'font-style: italic !important;'
			);
			expect( result.tablet ).not.toContain( 'font-style:' );
			expect( result.mobile ).not.toContain( 'font-style:' );
		} );
	} );

	describe( 'lineHeight', () => {
		it( 'lineHeightが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'line-height:' );
			expect( result.tablet ).not.toContain( 'line-height:' );
			expect( result.mobile ).not.toContain( 'line-height:' );
		} );
		it( 'lineHeightがある場合', () => {
			const styles = {
				lineHeight: '1.5',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'line-height: 1.5;' );
			expect( result.tablet ).not.toContain( 'line-height:' );
			expect( result.mobile ).not.toContain( 'line-height:' );
		} );
	} );

	describe( 'letterSpacing', () => {
		it( 'letterSpacingが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'letter-spacing:' );
			expect( result.tablet ).not.toContain( 'letter-spacing:' );
			expect( result.mobile ).not.toContain( 'letter-spacing:' );
		} );
		it( 'letterSpacingがある場合', () => {
			const styles = {
				letterSpacing: '1px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'letter-spacing: 1px;' );
			expect( result.tablet ).not.toContain( 'letter-spacing:' );
			expect( result.mobile ).not.toContain( 'letter-spacing:' );
		} );
	} );

	describe( 'textDecoration', () => {
		it( 'textDecorationが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'text-decoration:' );
			expect( result.tablet ).not.toContain( 'text-decoration:' );
			expect( result.mobile ).not.toContain( 'text-decoration:' );
		} );
		it( 'textDecorationがある場合', () => {
			const styles = {
				textDecoration: 'underline',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'text-decoration: underline;' );
			expect( result.tablet ).not.toContain( 'text-decoration:' );
			expect( result.mobile ).not.toContain( 'text-decoration:' );
		} );
	} );

	describe( 'backgroundColor', () => {
		it( 'backgroundColorが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'background-color:' );
			expect( result.tablet ).not.toContain( 'background-color:' );
			expect( result.mobile ).not.toContain( 'background-color:' );
		} );
		it( 'backgroundColorがある場合', () => {
			const styles = {
				backgroundColor: '#ffffff',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'background-color: #ffffff;' );
			expect( result.tablet ).not.toContain( 'background-color:' );
			expect( result.mobile ).not.toContain( 'background-color:' );
		} );
	} );

	describe( 'backgroundImage', () => {
		it( 'backgroundImageが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'background-image:' );
			expect( result.tablet ).not.toContain( 'background-image:' );
			expect( result.mobile ).not.toContain( 'background-image:' );
		} );
		it( 'backgroundImageがある場合', () => {
			const styles = {
				backgroundImage: 'https://example.com/test.jpg',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain(
				'background-image: url("https://example.com/test.jpg");'
			);
			expect( result.tablet ).not.toContain( 'background-image:' );
			expect( result.mobile ).not.toContain( 'background-image:' );
		} );
	} );

	describe( 'backgroundPosition', () => {
		it( 'backgroundPositionが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'background-position:' );
			expect( result.tablet ).not.toContain( 'background-position:' );
			expect( result.mobile ).not.toContain( 'background-position:' );
		} );
		it( 'backgroundPositionがある場合', () => {
			const styles = {
				backgroundPosition: 'center center',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain(
				'background-position: center center;'
			);
			expect( result.tablet ).not.toContain( 'background-position:' );
			expect( result.mobile ).not.toContain( 'background-position:' );
		} );

		it( 'backgroundPositionのカスタム指定', () => {
			const styles = {
				backgroundPosition: '100%',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'background-position: 100%;' );
			expect( result.tablet ).not.toContain( 'background-position:' );
			expect( result.mobile ).not.toContain( 'background-position:' );
		} );
	} );

	describe( 'backgroundRepeat', () => {
		it( 'backgroundRepeatが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'background-repeat:' );
			expect( result.tablet ).not.toContain( 'background-repeat:' );
			expect( result.mobile ).not.toContain( 'background-repeat:' );
		} );
		it( 'backgroundRepeatがある場合', () => {
			const styles = {
				backgroundRepeat: 'no-repeat',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain(
				'background-repeat: no-repeat;'
			);
			expect( result.tablet ).not.toContain( 'background-repeat:' );
			expect( result.mobile ).not.toContain( 'background-repeat:' );
		} );
	} );

	describe( 'backgroundSize', () => {
		it( 'backgroundSizeが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'background-size:' );
			expect( result.tablet ).not.toContain( 'background-size:' );
			expect( result.mobile ).not.toContain( 'background-size:' );
		} );
		it( 'backgroundSizeがある場合', () => {
			const styles = {
				backgroundSize: 'cover',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'background-size: cover;' );
			expect( result.tablet ).not.toContain( 'background-size:' );
			expect( result.mobile ).not.toContain( 'background-size:' );
		} );
		it( 'backgroundSizeのカスタム指定', () => {
			const styles = {
				backgroundSize: '10px 20px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'background-size: 10px 20px;' );
			expect( result.tablet ).not.toContain( 'background-size:' );
			expect( result.mobile ).not.toContain( 'background-size:' );
		} );
	} );

	describe( 'border', () => {
		it( 'borderが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'border:' );
			expect( result.tablet ).not.toContain( 'border:' );
			expect( result.mobile ).not.toContain( 'border:' );
		} );
		it( 'SplitBordersタイプの場合', () => {
			const styles = {
				border: {
					top: {
						color: '#000000',
						style: 'solid',
						width: '1px',
					},
					right: {
						color: '#111111',
						style: 'dotted',
						width: '2px',
					},
					bottom: {
						color: '#222222',
						style: 'dashed',
						width: '3px',
					},
					left: {
						color: '#333333',
						style: 'double',
						width: '4px',
					},
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'border-top-color: #000000;' );
			expect( result.desktop ).toContain( 'border-top-style: solid;' );
			expect( result.desktop ).toContain( 'border-top-width: 1px;' );
			expect( result.desktop ).toContain(
				'border-right-color: #111111;'
			);
			expect( result.desktop ).toContain( 'border-right-style: dotted;' );
			expect( result.desktop ).toContain( 'border-right-width: 2px;' );
			expect( result.desktop ).toContain(
				'border-bottom-color: #222222;'
			);
			expect( result.desktop ).toContain(
				'border-bottom-style: dashed;'
			);
			expect( result.desktop ).toContain( 'border-bottom-width: 3px;' );
			expect( result.desktop ).toContain( 'border-left-color: #333333;' );
			expect( result.desktop ).toContain( 'border-left-style: double;' );
			expect( result.desktop ).toContain( 'border-left-width: 4px;' );
			expect( result.tablet ).not.toContain( 'border-' );
			expect( result.mobile ).not.toContain( 'border-' );
		} );
		it( 'FlatBorderタイプの場合', () => {
			const styles = {
				border: {
					color: '#000000',
					style: 'solid',
					width: '1px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'border-color: #000000;' );
			expect( result.desktop ).toContain( 'border-style: solid;' );
			expect( result.desktop ).toContain( 'border-width: 1px;' );
			expect( result.tablet ).not.toContain( 'border:' );
			expect( result.mobile ).not.toContain( 'border:' );
		} );
	} );

	describe( 'borderRadius', () => {
		it( 'borderRadiusが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'border-radius:' );
			expect( result.tablet ).not.toContain( 'border-radius:' );
			expect( result.mobile ).not.toContain( 'border-radius:' );
		} );
		it( 'borderRadiusがある場合(desktop)', () => {
			const styles = {
				borderRadius: {
					desktop: '10px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'border-radius: 10px;' );
			expect( result.tablet ).not.toContain( 'border-radius:' );
			expect( result.mobile ).not.toContain( 'border-radius:' );
		} );
		it( 'borderRadiusがある場合(tablet)', () => {
			const styles = {
				borderRadius: {
					tablet: '20px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'border-radius:' );
			expect( result.tablet ).toContain( 'border-radius: 20px;' );
			expect( result.mobile ).not.toContain( 'border-radius:' );
		} );
		it( 'borderRadiusがある場合(mobile)', () => {
			const styles = {
				borderRadius: {
					mobile: '30px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'border-radius:' );
			expect( result.tablet ).not.toContain( 'border-radius:' );
			expect( result.mobile ).toContain( 'border-radius: 30px;' );
		} );
		it( 'borderRadiusがある場合(all)', () => {
			const styles = {
				borderRadius: {
					desktop: '10px',
					tablet: '20px',
					mobile: '30px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'border-radius: 10px;' );
			expect( result.tablet ).toContain( 'border-radius: 20px;' );
			expect( result.mobile ).toContain( 'border-radius: 30px;' );
		} );
	} );

	describe( 'padding', () => {
		it( 'paddingが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'padding:' );
			expect( result.tablet ).not.toContain( 'padding:' );
			expect( result.mobile ).not.toContain( 'padding:' );
		} );
		it( 'paddingがある場合(desktop)', () => {
			const styles = {
				padding: {
					desktop: {
						top: '10px',
						right: '20px',
						bottom: '30px',
						left: '40px',
					},
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'padding-top: 10px;' );
			expect( result.desktop ).toContain( 'padding-right: 20px;' );
			expect( result.desktop ).toContain( 'padding-bottom: 30px;' );
			expect( result.desktop ).toContain( 'padding-left: 40px;' );
		} );
		it( 'paddingがある場合(tablet)', () => {
			const styles = {
				padding: {
					tablet: {
						top: '10px',
						right: '20px',
						bottom: '30px',
						left: '40px',
					},
				},
			};
			const result = parseStyles( styles );
			expect( result.tablet ).toContain( 'padding-top: 10px;' );
			expect( result.tablet ).toContain( 'padding-right: 20px;' );
			expect( result.tablet ).toContain( 'padding-bottom: 30px;' );
			expect( result.tablet ).toContain( 'padding-left: 40px;' );
		} );
		it( 'paddingがある場合(mobile)', () => {
			const styles = {
				padding: {
					mobile: {
						top: '10px',
						right: '20px',
						bottom: '30px',
						left: '40px',
					},
				},
			};
			const result = parseStyles( styles );
			expect( result.mobile ).toContain( 'padding-top: 10px;' );
			expect( result.mobile ).toContain( 'padding-right: 20px;' );
			expect( result.mobile ).toContain( 'padding-bottom: 30px;' );
			expect( result.mobile ).toContain( 'padding-left: 40px;' );
		} );
		it( 'paddingがある場合(all)', () => {
			const styles = {
				padding: {
					desktop: {
						top: '10px',
						right: '20px',
						bottom: '30px',
						left: '40px',
					},
					tablet: {
						top: '15px',
						right: '25px',
						bottom: '35px',
						left: '45px',
					},
					mobile: {
						top: '20px',
						right: '30px',
						bottom: '40px',
						left: '50px',
					},
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'padding-top: 10px;' );
			expect( result.desktop ).toContain( 'padding-right: 20px;' );
			expect( result.desktop ).toContain( 'padding-bottom: 30px;' );
			expect( result.desktop ).toContain( 'padding-left: 40px;' );

			expect( result.tablet ).toContain( 'padding-top: 15px;' );
			expect( result.tablet ).toContain( 'padding-right: 25px;' );
			expect( result.tablet ).toContain( 'padding-bottom: 35px;' );
			expect( result.tablet ).toContain( 'padding-left: 45px;' );

			expect( result.mobile ).toContain( 'padding-top: 20px;' );
			expect( result.mobile ).toContain( 'padding-right: 30px;' );
			expect( result.mobile ).toContain( 'padding-bottom: 40px;' );
			expect( result.mobile ).toContain( 'padding-left: 50px;' );
		} );
	} );

	describe( 'margin', () => {
		it( 'marginが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'margin:' );
			expect( result.tablet ).not.toContain( 'margin:' );
			expect( result.mobile ).not.toContain( 'margin:' );
		} );
		it( 'marginがある場合(desktop)', () => {
			const styles = {
				margin: {
					desktop: {
						top: '10px',
						right: '20px',
						bottom: '30px',
						left: '40px',
					},
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'margin-top: 10px;' );
			expect( result.desktop ).toContain( 'margin-right: 20px;' );
			expect( result.desktop ).toContain( 'margin-bottom: 30px;' );
			expect( result.desktop ).toContain( 'margin-left: 40px;' );
		} );
		it( 'marginがある場合(tablet)', () => {
			const styles = {
				margin: {
					tablet: {
						top: '10px',
						right: '20px',
						bottom: '30px',
						left: '40px',
					},
				},
			};
			const result = parseStyles( styles );
			expect( result.tablet ).toContain( 'margin-top: 10px;' );
			expect( result.tablet ).toContain( 'margin-right: 20px;' );
			expect( result.tablet ).toContain( 'margin-bottom: 30px;' );
			expect( result.tablet ).toContain( 'margin-left: 40px;' );
		} );
		it( 'marginがある場合(mobile)', () => {
			const styles = {
				margin: {
					mobile: {
						top: '10px',
						right: '20px',
						bottom: '30px',
						left: '40px',
					},
				},
			};
			const result = parseStyles( styles );
			expect( result.mobile ).toContain( 'margin-top: 10px;' );
			expect( result.mobile ).toContain( 'margin-right: 20px;' );
			expect( result.mobile ).toContain( 'margin-bottom: 30px;' );
			expect( result.mobile ).toContain( 'margin-left: 40px;' );
		} );
		it( 'marginがある場合(all)', () => {
			const styles = {
				margin: {
					desktop: {
						top: '10px',
						right: '20px',
						bottom: '30px',
						left: '40px',
					},
					tablet: {
						top: '15px',
						right: '25px',
						bottom: '35px',
						left: '45px',
					},
					mobile: {
						top: '20px',
						right: '30px',
						bottom: '40px',
						left: '50px',
					},
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'margin-top: 10px;' );
			expect( result.desktop ).toContain( 'margin-right: 20px;' );
			expect( result.desktop ).toContain( 'margin-bottom: 30px;' );
			expect( result.desktop ).toContain( 'margin-left: 40px;' );

			expect( result.tablet ).toContain( 'margin-top: 15px;' );
			expect( result.tablet ).toContain( 'margin-right: 25px;' );
			expect( result.tablet ).toContain( 'margin-bottom: 35px;' );
			expect( result.tablet ).toContain( 'margin-left: 45px;' );

			expect( result.mobile ).toContain( 'margin-top: 20px;' );
			expect( result.mobile ).toContain( 'margin-right: 30px;' );
			expect( result.mobile ).toContain( 'margin-bottom: 40px;' );
			expect( result.mobile ).toContain( 'margin-left: 50px;' );
		} );
	} );

	// Size.
	describe( 'width', () => {
		it( 'widthが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'width:' );
			expect( result.tablet ).not.toContain( 'width:' );
			expect( result.mobile ).not.toContain( 'width:' );
		} );
		it( 'widthがある場合', () => {
			const styles = {
				width: '100px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'width: 100px;' );
			expect( result.tablet ).not.toContain( 'width:' );
			expect( result.mobile ).not.toContain( 'width:' );
		} );
		it( 'widthがある場合（desktop）', () => {
			const styles = {
				width: {
					desktop: '100px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'width: 100px;' );
			expect( result.tablet ).not.toContain( 'width:' );
			expect( result.mobile ).not.toContain( 'width:' );
		} );
		it( 'widthがある場合（tablet）', () => {
			const styles = {
				width: {
					tablet: '200px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'width:' );
			expect( result.tablet ).toContain( 'width: 200px;' );
			expect( result.mobile ).not.toContain( 'width:' );
		} );
		it( 'widthがある場合（mobile）', () => {
			const styles = {
				width: {
					mobile: '300px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'width:' );
			expect( result.tablet ).not.toContain( 'width:' );
			expect( result.mobile ).toContain( 'width: 300px;' );
		} );
	} );
	describe( 'minWidth', () => {
		it( 'minWidthが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'min-width:' );
			expect( result.tablet ).not.toContain( 'min-width:' );
			expect( result.mobile ).not.toContain( 'min-width:' );
		} );
		it( 'minWidthがある場合', () => {
			const styles = {
				minWidth: '100px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'min-width: 100px;' );
			expect( result.tablet ).not.toContain( 'min-width:' );
			expect( result.mobile ).not.toContain( 'min-width:' );
		} );
		it( 'minWidthがある場合（desktop）', () => {
			const styles = {
				minWidth: {
					desktop: '100px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'min-width: 100px;' );
			expect( result.tablet ).not.toContain( 'min-width:' );
			expect( result.mobile ).not.toContain( 'min-width:' );
		} );
		it( 'minWidthがある場合（tablet）', () => {
			const styles = {
				minWidth: {
					tablet: '200px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'min-width:' );
			expect( result.tablet ).toContain( 'min-width: 200px;' );
			expect( result.mobile ).not.toContain( 'min-width:' );
		} );
		it( 'minWidthがある場合（mobile）', () => {
			const styles = {
				minWidth: {
					mobile: '300px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'min-width:' );
			expect( result.tablet ).not.toContain( 'min-width:' );
			expect( result.mobile ).toContain( 'min-width: 300px;' );
		} );
	} );
	describe( 'maxWidth', () => {
		it( 'maxWidthが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'max-width:' );
			expect( result.tablet ).not.toContain( 'max-width:' );
			expect( result.mobile ).not.toContain( 'max-width:' );
		} );
		it( 'maxWidthがある場合', () => {
			const styles = {
				maxWidth: '100px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'max-width: 100px;' );
			expect( result.tablet ).not.toContain( 'max-width:' );
			expect( result.mobile ).not.toContain( 'max-width:' );
		} );
		it( 'maxWidthがある場合（desktop）', () => {
			const styles = {
				maxWidth: {
					desktop: '100px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'max-width: 100px;' );
			expect( result.tablet ).not.toContain( 'max-width:' );
			expect( result.mobile ).not.toContain( 'max-width:' );
		} );
		it( 'maxWidthがある場合（tablet）', () => {
			const styles = {
				maxWidth: {
					tablet: '200px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'max-width:' );
			expect( result.tablet ).toContain( 'max-width: 200px;' );
			expect( result.mobile ).not.toContain( 'max-width:' );
		} );
		it( 'maxWidthがある場合（mobile）', () => {
			const styles = {
				maxWidth: {
					mobile: '300px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'max-width:' );
			expect( result.tablet ).not.toContain( 'max-width:' );
			expect( result.mobile ).toContain( 'max-width: 300px;' );
		} );
	} );
	describe( 'height', () => {
		it( 'heightが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'height:' );
			expect( result.tablet ).not.toContain( 'height:' );
			expect( result.mobile ).not.toContain( 'height:' );
		} );
		it( 'heightがある場合', () => {
			const styles = {
				height: '100px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'height: 100px;' );
			expect( result.tablet ).not.toContain( 'height:' );
			expect( result.mobile ).not.toContain( 'height:' );
		} );
		it( 'heightがある場合（desktop）', () => {
			const styles = {
				height: {
					desktop: '100px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'height: 100px;' );
			expect( result.tablet ).not.toContain( 'height:' );
			expect( result.mobile ).not.toContain( 'height:' );
		} );
		it( 'heightがある場合（tablet）', () => {
			const styles = {
				height: {
					tablet: '200px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'height:' );
			expect( result.tablet ).toContain( 'height: 200px;' );
			expect( result.mobile ).not.toContain( 'height:' );
		} );
		it( 'heightがある場合（mobile）', () => {
			const styles = {
				height: {
					mobile: '300px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'height:' );
			expect( result.tablet ).not.toContain( 'height:' );
			expect( result.mobile ).toContain( 'height: 300px;' );
		} );
	} );
	describe( 'minHeight', () => {
		it( 'minHeightが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'min-height:' );
			expect( result.tablet ).not.toContain( 'min-height:' );
			expect( result.mobile ).not.toContain( 'min-height:' );
		} );
		it( 'minHeightがある場合', () => {
			const styles = {
				minHeight: '100px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'min-height: 100px;' );
			expect( result.tablet ).not.toContain( 'min-height:' );
			expect( result.mobile ).not.toContain( 'min-height:' );
		} );
		it( 'minHeightがある場合（desktop）', () => {
			const styles = {
				minHeight: {
					desktop: '100px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'min-height: 100px;' );
			expect( result.tablet ).not.toContain( 'min-height:' );
			expect( result.mobile ).not.toContain( 'min-height:' );
		} );
		it( 'minHeightがある場合（tablet）', () => {
			const styles = {
				minHeight: {
					tablet: '200px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'min-height:' );
			expect( result.tablet ).toContain( 'min-height: 200px;' );
			expect( result.mobile ).not.toContain( 'min-height:' );
		} );
		it( 'minHeightがある場合（mobile）', () => {
			const styles = {
				minHeight: {
					mobile: '300px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'min-height:' );
			expect( result.tablet ).not.toContain( 'min-height:' );
			expect( result.mobile ).toContain( 'min-height: 300px;' );
		} );
	} );
	describe( 'maxHeight', () => {
		it( 'maxHeightが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'max-height:' );
			expect( result.tablet ).not.toContain( 'max-height:' );
			expect( result.mobile ).not.toContain( 'max-height:' );
		} );
		it( 'maxHeightがある場合', () => {
			const styles = {
				maxHeight: '100px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'max-height: 100px;' );
			expect( result.tablet ).not.toContain( 'max-height:' );
			expect( result.mobile ).not.toContain( 'max-height:' );
		} );
		it( 'maxHeightがある場合（desktop）', () => {
			const styles = {
				maxHeight: {
					desktop: '100px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'max-height: 100px;' );
			expect( result.tablet ).not.toContain( 'max-height:' );
			expect( result.mobile ).not.toContain( 'max-height:' );
		} );
		it( 'maxHeightがある場合（tablet）', () => {
			const styles = {
				maxHeight: {
					tablet: '200px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'max-height:' );
			expect( result.tablet ).toContain( 'max-height: 200px;' );
			expect( result.mobile ).not.toContain( 'max-height:' );
		} );
		it( 'maxHeightがある場合（mobile）', () => {
			const styles = {
				maxHeight: {
					mobile: '300px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'max-height:' );
			expect( result.tablet ).not.toContain( 'max-height:' );
			expect( result.mobile ).toContain( 'max-height: 300px;' );
		} );
	} );

	// advanced.
	describe( 'display', () => {
		it( 'displayが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'display:' );
			expect( result.tablet ).not.toContain( 'display:' );
			expect( result.mobile ).not.toContain( 'display:' );
		} );
		it( 'displayがある場合', () => {
			const styles = {
				display: 'block',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'display: block;' );
			expect( result.tablet ).not.toContain( 'display:' );
			expect( result.mobile ).not.toContain( 'display:' );
		} );
		it( 'displayがある場合(desktop)', () => {
			const styles = {
				display: {
					desktop: 'block',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'display: block;' );
			expect( result.tablet ).not.toContain( 'display:' );
			expect( result.mobile ).not.toContain( 'display:' );
		} );
		it( 'displayがある場合(tablet)', () => {
			const styles = {
				display: {
					tablet: 'block',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'display:' );
			expect( result.tablet ).toContain( 'display: block;' );
			expect( result.mobile ).not.toContain( 'display:' );
		} );
		it( 'displayがある場合(mobile)', () => {
			const styles = {
				display: {
					mobile: 'block',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'display:' );
			expect( result.tablet ).not.toContain( 'display:' );
			expect( result.mobile ).toContain( 'display: block;' );
		} );
	} );
	describe( 'flexDirection', () => {
		it( 'flexDirectionが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'flex-direction:' );
			expect( result.tablet ).not.toContain( 'flex-direction:' );
			expect( result.mobile ).not.toContain( 'flex-direction:' );
		} );
		it( 'flexDirectionがある場合', () => {
			const styles = {
				flexDirection: 'row',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'flex-direction: row;' );
			expect( result.tablet ).not.toContain( 'flex-direction:' );
			expect( result.mobile ).not.toContain( 'flex-direction:' );
		} );
		it( 'flexDirectionがある場合(desktop)', () => {
			const styles = {
				flexDirection: {
					desktop: 'row',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'flex-direction: row;' );
			expect( result.tablet ).not.toContain( 'flex-direction:' );
			expect( result.mobile ).not.toContain( 'flex-direction:' );
		} );
		it( 'flexDirectionがある場合(tablet)', () => {
			const styles = {
				flexDirection: {
					tablet: 'row',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'flex-direction:' );
			expect( result.tablet ).toContain( 'flex-direction: row;' );
			expect( result.mobile ).not.toContain( 'flex-direction:' );
		} );
		it( 'flexDirectionがある場合(mobile)', () => {
			const styles = {
				flexDirection: {
					mobile: 'row',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'flex-direction:' );
			expect( result.tablet ).not.toContain( 'flex-direction:' );
			expect( result.mobile ).toContain( 'flex-direction: row;' );
		} );
	} );
	describe( 'alignItems', () => {
		it( 'alignItemsが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'align-items:' );
			expect( result.tablet ).not.toContain( 'align-items:' );
			expect( result.mobile ).not.toContain( 'align-items:' );
		} );
		it( 'alignItemsがある場合', () => {
			const styles = {
				alignItems: 'center',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'align-items: center;' );
			expect( result.tablet ).not.toContain( 'align-items:' );
			expect( result.mobile ).not.toContain( 'align-items:' );
		} );
		it( 'alignItemsがある場合(desktop)', () => {
			const styles = {
				alignItems: {
					desktop: 'center',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'align-items: center;' );
			expect( result.tablet ).not.toContain( 'align-items:' );
			expect( result.mobile ).not.toContain( 'align-items:' );
		} );
		it( 'alignItemsがある場合(tablet)', () => {
			const styles = {
				alignItems: {
					tablet: 'center',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'align-items:' );
			expect( result.tablet ).toContain( 'align-items: center;' );
			expect( result.mobile ).not.toContain( 'align-items:' );
		} );
		it( 'alignItemsがある場合(mobile)', () => {
			const styles = {
				alignItems: {
					mobile: 'center',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'align-items:' );
			expect( result.tablet ).not.toContain( 'align-items:' );
			expect( result.mobile ).toContain( 'align-items: center;' );
		} );
	} );
	describe( 'justifyContent', () => {
		it( 'justifyContentが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'justify-content:' );
			expect( result.tablet ).not.toContain( 'justify-content:' );
			expect( result.mobile ).not.toContain( 'justify-content:' );
		} );
		it( 'justifyContentがある場合', () => {
			const styles = {
				justifyContent: 'center',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'justify-content: center;' );
			expect( result.tablet ).not.toContain( 'justify-content:' );
			expect( result.mobile ).not.toContain( 'justify-content:' );
		} );
		it( 'justifyContentがある場合(desktop)', () => {
			const styles = {
				justifyContent: {
					desktop: 'center',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'justify-content: center;' );
			expect( result.tablet ).not.toContain( 'justify-content:' );
			expect( result.mobile ).not.toContain( 'justify-content:' );
		} );
		it( 'justifyContentがある場合(tablet)', () => {
			const styles = {
				justifyContent: {
					tablet: 'center',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'justify-content:' );
			expect( result.tablet ).toContain( 'justify-content: center;' );
			expect( result.mobile ).not.toContain( 'justify-content:' );
		} );
		it( 'justifyContentがある場合(mobile)', () => {
			const styles = {
				justifyContent: {
					mobile: 'center',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'justify-content:' );
			expect( result.tablet ).not.toContain( 'justify-content:' );
			expect( result.mobile ).toContain( 'justify-content: center;' );
		} );
	} );
	describe( 'gap', () => {
		it( 'gapが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'gap:' );
			expect( result.tablet ).not.toContain( 'gap:' );
			expect( result.mobile ).not.toContain( 'gap:' );
		} );
		it( 'gapがある場合', () => {
			const styles = {
				gap: '10px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'gap: 10px;' );
			expect( result.tablet ).not.toContain( 'gap:' );
			expect( result.mobile ).not.toContain( 'gap:' );
		} );
		it( 'gapがある場合(desktop)', () => {
			const styles = {
				gap: {
					desktop: '10px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'gap: 10px;' );
			expect( result.tablet ).not.toContain( 'gap:' );
			expect( result.mobile ).not.toContain( 'gap:' );
		} );
		it( 'gapがある場合(tablet)', () => {
			const styles = {
				gap: {
					tablet: '20px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'gap:' );
			expect( result.tablet ).toContain( 'gap: 20px;' );
			expect( result.mobile ).not.toContain( 'gap:' );
		} );
		it( 'gapがある場合(mobile)', () => {
			const styles = {
				gap: {
					mobile: '30px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'gap:' );
			expect( result.tablet ).not.toContain( 'gap:' );
			expect( result.mobile ).toContain( 'gap: 30px;' );
		} );
	} );
	describe( 'position', () => {
		it( 'positionが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'position:' );
			expect( result.tablet ).not.toContain( 'position:' );
			expect( result.mobile ).not.toContain( 'position:' );
		} );
		it( 'positionがある場合', () => {
			const styles = {
				position: 'absolute',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'position: absolute;' );
			expect( result.tablet ).not.toContain( 'position:' );
			expect( result.mobile ).not.toContain( 'position:' );
		} );
	} );
	describe( 'top', () => {
		it( 'topが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'top:' );
			expect( result.tablet ).not.toContain( 'top:' );
			expect( result.mobile ).not.toContain( 'top:' );
		} );
		it( 'topがある場合', () => {
			const styles = {
				top: '10px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'top: 10px;' );
			expect( result.tablet ).not.toContain( 'top:' );
			expect( result.mobile ).not.toContain( 'top:' );
		} );
	} );
	describe( 'right', () => {
		it( 'rightが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'right:' );
			expect( result.tablet ).not.toContain( 'right:' );
			expect( result.mobile ).not.toContain( 'right:' );
		} );
		it( 'rightがある場合', () => {
			const styles = {
				right: '10px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'right: 10px;' );
			expect( result.tablet ).not.toContain( 'right:' );
			expect( result.mobile ).not.toContain( 'right:' );
		} );
	} );
	describe( 'bottom', () => {
		it( 'bottomが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'bottom:' );
			expect( result.tablet ).not.toContain( 'bottom:' );
			expect( result.mobile ).not.toContain( 'bottom:' );
		} );
		it( 'bottomがある場合', () => {
			const styles = {
				bottom: '10px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'bottom: 10px;' );
			expect( result.tablet ).not.toContain( 'bottom:' );
			expect( result.mobile ).not.toContain( 'bottom:' );
		} );
	} );
	describe( 'left', () => {
		it( 'leftが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'left:' );
			expect( result.tablet ).not.toContain( 'left:' );
			expect( result.mobile ).not.toContain( 'left:' );
		} );
		it( 'leftがある場合', () => {
			const styles = {
				left: '10px',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'left: 10px;' );
			expect( result.tablet ).not.toContain( 'left:' );
			expect( result.mobile ).not.toContain( 'left:' );
		} );
	} );
	describe( 'zIndex', () => {
		it( 'zIndexが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'z-index:' );
			expect( result.tablet ).not.toContain( 'z-index:' );
			expect( result.mobile ).not.toContain( 'z-index:' );
		} );
		it( 'zIndexがある場合', () => {
			const styles = {
				zIndex: 10,
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'z-index: 10;' );
			expect( result.tablet ).not.toContain( 'z-index:' );
			expect( result.mobile ).not.toContain( 'z-index:' );
		} );
	} );
	describe( 'fontFamily', () => {
		it( 'fontFamilyが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'font-family:' );
			expect( result.tablet ).not.toContain( 'font-family:' );
			expect( result.mobile ).not.toContain( 'font-family:' );
		} );
		it( 'fontFamilyがある場合', () => {
			const styles = {
				fontFamily: 'Arial',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'font-family: Arial;' );
			expect( result.tablet ).not.toContain( 'font-family:' );
			expect( result.mobile ).not.toContain( 'font-family:' );
		} );
	} );
	describe( 'background', () => {
		it( 'backgroundが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'background:' );
			expect( result.tablet ).not.toContain( 'background:' );
			expect( result.mobile ).not.toContain( 'background:' );
		} );
		it( 'backgroundがある場合', () => {
			const styles = {
				background: '#fff',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain( 'background: #fff;' );
			expect( result.tablet ).not.toContain( 'background:' );
			expect( result.mobile ).not.toContain( 'background:' );
		} );
	} );
	describe( 'textShadow', () => {
		it( 'textShadowが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'text-shadow:' );
			expect( result.tablet ).not.toContain( 'text-shadow:' );
			expect( result.mobile ).not.toContain( 'text-shadow:' );
		} );
		it( 'textShadowがある場合', () => {
			const styles = {
				textShadow: '2px 2px 2px #000',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain(
				'text-shadow: 2px 2px 2px #000;'
			);
			expect( result.tablet ).not.toContain( 'text-shadow:' );
			expect( result.mobile ).not.toContain( 'text-shadow:' );
		} );
	} );
	describe( 'boxShadow', () => {
		it( 'boxShadowが無い場合', () => {
			const styles = {
				fontSize: {
					desktop: '24px',
				},
			};
			const result = parseStyles( styles );
			expect( result.desktop ).not.toContain( 'box-shadow:' );
			expect( result.tablet ).not.toContain( 'box-shadow:' );
			expect( result.mobile ).not.toContain( 'box-shadow:' );
		} );
		it( 'boxShadowがある場合', () => {
			const styles = {
				boxShadow: '2px 2px 2px #000',
			};
			const result = parseStyles( styles );
			expect( result.desktop ).toContain(
				'box-shadow: 2px 2px 2px #000;'
			);
			expect( result.tablet ).not.toContain( 'box-shadow:' );
			expect( result.mobile ).not.toContain( 'box-shadow:' );
		} );
	} );
} );

/**
 * parseStylesPseudoElementsのテスト
 */
describe( 'parseStylesPseudoElements', () => {
	it( '空のスタイルオブジェクトの場合は空のオブジェクトを返すこと', () => {
		const result = parseStylesPseudoElements(
			{} as HeadingPseudoElementsStyle
		);
		expect( result ).toEqual( {} );
	} );

	it( 'enableがfalseの場合は空のオブジェクトを返すこと', () => {
		const result = parseStylesPseudoElements( {
			enable: false,
		} as HeadingPseudoElementsStyle );
		expect( result ).toEqual( {} );
	} );

	it( 'コンテンツを含む疑似要素のスタイルを正しく解析すること', () => {
		const styles: HeadingPseudoElementsStyle = {
			enable: true,
			content: 'test',
			color: '#000000',
		};
		const result = parseStylesPseudoElements( styles );
		expect( result.desktop ).toContain( 'content: "test";' );
	} );
} );

/**
 * ユーティリティ関数のテスト
 */
describe( 'ユーティリティ関数', () => {
	it( 'フォントサイズプロパティを正しく識別すること', () => {
		expect( isFontSize( 'font-size' ) ).toBe( true );
		expect( isFontSize( 'color' ) ).toBe( false );
	} );

	it( 'ボーダープロパティを正しく識別すること', () => {
		expect( isBorder( 'border' ) ).toBe( true );
		expect( isBorder( 'margin' ) ).toBe( false );
	} );

	it( 'フォントサイズスタイルを正しく解析すること', () => {
		const value = {
			fontSize: { size: 24 },
		};
		const result = parseFontSizeStyle( value );
		expect( result.desktop ).toBe( '24px' );
	} );
} );
