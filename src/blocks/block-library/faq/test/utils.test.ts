import type { FaqBlockAttributes } from '../types';
import {
	getFaqClassNames,
	getResponsiveTypography,
	getResponsiveTypographyStyles,
	updateResponsiveFontSize,
	updateResponsiveTextAlign,
} from '../utils';

const DEFAULT_ATTRIBUTES: FaqBlockAttributes = {
	isAccordion: false,
	borderType: '',
	borderSize: 0,
};

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
