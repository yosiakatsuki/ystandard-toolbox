import type { FaqBlockAttributes } from '../types';
import {
	getFaqBorderType,
	getFaqClassNames,
	getResponsiveTypography,
	getResponsiveTypographyStyles,
	hasFaqBorder,
	updateResponsiveFontSize,
	updateResponsiveTextAlign,
} from '../utils';

const DEFAULT_ATTRIBUTES: FaqBlockAttributes = {
	isAccordion: false,
};

describe( 'FAQ枠線', () => {
	it( '全周枠線に既存の余白と位置クラスを付与する', () => {
		const classNames = getFaqClassNames( {
			...DEFAULT_ATTRIBUTES,
			style: {
				border: {
					color: '#cbd5e1',
					style: 'solid',
					width: '1px',
				},
			},
		} );

		expect( classNames ).toContain( 'has-border' );
		expect( classNames ).toContain( 'has-padding' );
		expect( classNames ).toContain( 'border-type--all' );
	} );

	it( '下枠線では内側余白を追加しない', () => {
		const classNames = getFaqClassNames( {
			...DEFAULT_ATTRIBUTES,
			style: {
				border: {
					bottom: {
						color: '#cbd5e1',
						style: 'solid',
						width: '1px',
					},
				},
			},
		} );

		expect( classNames ).toContain( 'has-border' );
		expect( classNames ).toContain( 'border-type--bottom' );
		expect( classNames ).not.toContain( 'has-padding' );
	} );

	it( '四辺の個別指定を全周枠線として扱う', () => {
		const border = {
			top: { width: '1px' },
			right: { width: '1px' },
			bottom: { width: '1px' },
			left: { width: '1px' },
		};

		expect( getFaqBorderType( border ) ).toBe( 'all' );
		expect( hasFaqBorder( border ) ).toBe( true );
	} );

	it( '角丸だけでは枠線ありとして扱わない', () => {
		const border = { radius: '8px' };

		expect( getFaqBorderType( border ) ).toBe( '' );
		expect( hasFaqBorder( border ) ).toBe( false );
	} );
} );

describe( 'FAQ背景', () => {
	it( 'プリセットグラデーション設定時に内側余白を追加する', () => {
		expect(
			getFaqClassNames( {
				...DEFAULT_ATTRIBUTES,
				gradient: 'midnight',
			} )
		).toContain( 'has-padding' );
	} );

	it( 'カスタムグラデーション設定時に内側余白を追加する', () => {
		expect(
			getFaqClassNames( {
				...DEFAULT_ATTRIBUTES,
				style: {
					color: {
						gradient:
							'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
					},
				},
			} )
		).toContain( 'has-padding' );
	} );
} );

describe( 'FAQレスポンシブタイポグラフィ', () => {
	it( 'フォントサイズ更新時にコアのタイポグラフィ設定を保持する', () => {
		const style = updateResponsiveFontSize(
			{
				typography: {
					lineHeight: 1.8,
				},
			},
			{
				desktop: '32px',
				mobile: '18px',
			}
		);

		expect( style ).toEqual( {
			typography: {
				lineHeight: 1.8,
			},
			ystdtb: {
				faq: {
					responsive: {
						typography: {
							fontSize: {
								desktop: '32px',
								mobile: '18px',
							},
						},
					},
				},
			},
		} );
	} );

	it( '文字揃えを解除してもフォントサイズを保持する', () => {
		const style = updateResponsiveTextAlign(
			{
				ystdtb: {
					faq: {
						responsive: {
							typography: {
								fontSize: {
									tablet: '24px',
								},
								textAlign: {
									tablet: 'center',
								},
							},
						},
					},
				},
			},
			undefined
		);

		expect(
			getResponsiveTypography( {
				...DEFAULT_ATTRIBUTES,
				style,
			} )
		).toEqual( {
			fontSize: {
				tablet: '24px',
			},
		} );
	} );

	it( '設定済みデバイスだけCSSカスタムプロパティへ変換する', () => {
		expect(
			getResponsiveTypographyStyles( {
				...DEFAULT_ATTRIBUTES,
				style: {
					ystdtb: {
						faq: {
							responsive: {
								typography: {
									fontSize: {
										desktop: '32px',
										mobile: '18px',
									},
									textAlign: {
										tablet: 'center',
									},
								},
							},
						},
					},
				},
			} )
		).toEqual( {
			'--ystdtb--desktop--faq--font-size': '32px',
			'--ystdtb--tablet--faq--text-align': 'center',
			'--ystdtb--mobile--faq--font-size': '18px',
		} );
	} );
} );
