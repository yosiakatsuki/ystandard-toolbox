import type { FaqBlockAttributes } from '../types';
import {
	getAccordionArrowMargin,
	getFaqClassNames,
	getResponsiveSpacing,
	getResponsiveSpacingStyles,
	getResponsiveTypographyStyles,
	updateAccordionArrowMargin,
	updateResponsiveFontSize,
	updateResponsiveSpacing,
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
										tablet: '24px',
										mobile: '18px',
									},
								},
							},
						},
					},
				},
			} )
		).toEqual( {
			'--ystdtb--desktop--faq--font-size': '32px',
			'--ystdtb--tablet--faq--font-size': '24px',
			'--ystdtb--mobile--faq--font-size': '18px',
		} );
	} );
} );

describe( 'FAQレスポンシブ余白', () => {
	it( '余白更新時にレスポンシブフォントサイズを保持する', () => {
		const style = updateResponsiveSpacing(
			{
				ystdtb: {
					faq: {
						responsive: {
							typography: {
								fontSize: {
									tablet: '24px',
								},
							},
						},
					},
				},
			},
			{
				margin: {
					desktop: {
						top: 'var:preset|spacing|40',
						bottom: '16px',
					},
				},
				padding: {
					mobile: {
						top: '8px',
						right: '12px',
						bottom: '8px',
						left: '12px',
					},
				},
			}
		);

		expect(
			getResponsiveSpacing( {
				...DEFAULT_ATTRIBUTES,
				style,
			} )
		).toEqual( {
			margin: {
				desktop: {
					top: 'var:preset|spacing|40',
					bottom: '16px',
				},
			},
			padding: {
				mobile: {
					top: '8px',
					right: '12px',
					bottom: '8px',
					left: '12px',
				},
			},
		} );
		expect(
			style?.ystdtb?.faq?.responsive?.typography?.fontSize?.tablet
		).toBe( '24px' );
	} );

	it( '許可した方向だけCSSカスタムプロパティへ変換する', () => {
		expect(
			getResponsiveSpacingStyles( {
				...DEFAULT_ATTRIBUTES,
				style: {
					ystdtb: {
						faq: {
							responsive: {
								spacing: {
									margin: {
										desktop: {
											top: 'var:preset|spacing|40',
											right: '999px',
											bottom: '16px',
										},
									},
									padding: {
										mobile: {
											top: '8px',
											right: '12px',
											bottom: '8px',
											left: '12px',
										},
									},
								},
							},
						},
					},
				},
			} )
		).toEqual( {
			'--ystdtb--desktop--faq--margin-top':
				'var(--wp--preset--spacing--40)',
			'--ystdtb--desktop--faq--margin-bottom': '16px',
			'--ystdtb--mobile--faq--padding-top': '8px',
			'--ystdtb--mobile--faq--padding-right': '12px',
			'--ystdtb--mobile--faq--padding-bottom': '8px',
			'--ystdtb--mobile--faq--padding-left': '12px',
		} );
	} );

	it( '余白解除時にレスポンシブ余白の空階層を削除する', () => {
		const style = updateResponsiveSpacing(
			{
				ystdtb: {
					faq: {
						responsive: {
							spacing: {
								margin: {
									desktop: { top: '16px' },
								},
							},
						},
					},
				},
			},
			undefined
		);

		expect( style ).toBeUndefined();
	} );
} );
