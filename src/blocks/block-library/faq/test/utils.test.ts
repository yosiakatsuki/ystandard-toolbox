import type { FaqBlockAttributes } from '../types';
import {
	getAccordionArrowMargin,
	getFaqClassNames,
	getResponsiveTypography,
	getResponsiveTypographyStyles,
	updateAccordionArrowMargin,
	updateResponsiveFontSize,
	updateResponsiveTextAlign,
} from '../utils';

const DEFAULT_ATTRIBUTES: FaqBlockAttributes = {
	isAccordion: false,
};

describe( 'FAQクラス名', () => {
	it( '標準スタイル設定から旧クラスを生成しない', () => {
		const classNames = getFaqClassNames( {
			...DEFAULT_ATTRIBUTES,
			backgroundColor: 'ys-light-orange',
			gradient: 'midnight',
			style: {
				border: {
					color: '#cbd5e1',
					style: 'solid',
					width: '1px',
				},
			},
		} );

		expect( classNames ).toBe( 'ystdtb-faq' );
	} );

	it( '開閉式のクラスだけを独自に付与する', () => {
		expect(
			getFaqClassNames( {
				...DEFAULT_ATTRIBUTES,
				isAccordion: true,
			} )
		).toBe( 'ystdtb-faq is-accordion' );
	} );
} );

describe( 'FAQ開閉ボタン余白', () => {
	it( 'margin更新時に他のstyle設定を保持する', () => {
		const style = updateAccordionArrowMargin(
			{
				typography: {
					lineHeight: 1.8,
				},
				ystdtb: {
					faq: {
						arrow: {
							color: {
								text: '#222222',
							},
						},
					},
				},
			},
			{
				top: 'var:preset|spacing|20',
				right: '8px',
				bottom: 'var:preset|spacing|20',
				left: '8px',
			}
		);

		expect( style ).toEqual( {
			typography: {
				lineHeight: 1.8,
			},
			ystdtb: {
				faq: {
					arrow: {
						color: {
							text: '#222222',
						},
						spacing: {
							margin: {
								top: 'var:preset|spacing|20',
								right: '8px',
								bottom: 'var:preset|spacing|20',
								left: '8px',
							},
						},
					},
				},
			},
		} );
	} );

	it( 'margin解除時に空階層を削除する', () => {
		const style = updateAccordionArrowMargin(
			{
				ystdtb: {
					faq: {
						arrow: {
							spacing: {
								margin: {
									top: '1rem',
								},
							},
						},
					},
				},
			},
			undefined
		);

		expect( style ).toBeUndefined();
		expect(
			getAccordionArrowMargin( {
				...DEFAULT_ATTRIBUTES,
				style,
			} )
		).toBeUndefined();
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
