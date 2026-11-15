/**
 * Block dependencies.
 */
import type { FaqItemBlockAttributes } from '../types';
import {
	getItemClasses,
	getItemStyles,
	getAccordionArrowMargin,
	getAccordionArrowStyles,
	getLabelStyles,
	getLabelTextColor,
	getLabelTypography,
	updateAccordionArrowMargin,
	updateLabelTextColor,
	updateLabelTypography,
} from '../utils';

const DEFAULT_ATTRIBUTES: FaqItemBlockAttributes = {
	faqType: 'q',
	faqBorderType: '',
	labelPosition: 'center',
};

describe( 'FAQアイテムの装飾クラス', () => {
	it.each( [ 'q', 'a' ] as const )(
		'%sの辺別枠線からhas-borderを生成する',
		( faqType ) => {
			expect(
				getItemClasses( {
					faqType,
					style: { border: { bottom: { width: '2px' } } },
				} )
			).toBe( `ystdtb-faq-item is-faq--${ faqType } has-border` );
		}
	);

	it( '角丸とラベルの枠線はItem本体の枠線として扱わない', () => {
		expect(
			getItemClasses( {
				faqType: 'q',
				style: {
					border: { radius: '8px' },
					ystdtb: {
						faqItem: { label: { border: { width: '2px' } } },
					},
				},
			} )
		).toBe( 'ystdtb-faq-item is-faq--q' );
	} );
} );

describe( 'FAQアイテム開閉ボタン余白', () => {
	it( 'margin更新時に開閉ボタンの他設定を保持する', () => {
		const style = updateAccordionArrowMargin(
			{
				ystdtb: {
					faqItem: {
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
				bottom: 'var:preset|spacing|40',
				left: '4px',
			}
		);

		expect(
			getAccordionArrowMargin( {
				...DEFAULT_ATTRIBUTES,
				style,
			} )
		).toEqual( {
			top: 'var:preset|spacing|20',
			right: '8px',
			bottom: 'var:preset|spacing|40',
			left: '4px',
		} );
		expect( style?.ystdtb?.faqItem?.arrow?.color?.text ).toBe( '#222222' );
	} );

	it( '保存用styleへプリセットとカスタム値を変換する', () => {
		expect(
			getAccordionArrowStyles( {
				...DEFAULT_ATTRIBUTES,
				style: {
					ystdtb: {
						faqItem: {
							arrow: {
								color: { text: '#222222' },
								spacing: {
									margin: {
										top: 'var:preset|spacing|20',
										right: '8px',
										bottom: 'var:preset|spacing|40',
										left: '4px',
									},
								},
							},
						},
					},
				},
			} )
		).toEqual( {
			color: '#222222',
			marginTop: 'var(--wp--preset--spacing--20)',
			marginRight: '8px',
			marginBottom: 'var(--wp--preset--spacing--40)',
			marginLeft: '4px',
		} );
	} );

	it( 'margin解除時に空階層を削除する', () => {
		expect(
			updateAccordionArrowMargin(
				{
					ystdtb: {
						faqItem: {
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
			)
		).toBeUndefined();
	} );
} );

describe( 'FAQラベル文字スタイル', () => {
	it( 'プリセット文字色を更新してCSS変数へ変換する', () => {
		const style = updateLabelTextColor(
			{
				ystdtb: {
					faqItem: {
						arrow: { spacing: { margin: { top: '8px' } } },
					},
				},
			},
			'var:preset|color|ys-red'
		);
		const attributes = { ...DEFAULT_ATTRIBUTES, style };

		expect( getLabelTextColor( attributes ) ).toBe(
			'var:preset|color|ys-red'
		);
		expect( getLabelStyles( attributes ).color ).toBe(
			'var(--wp--preset--color--ys-red)'
		);
		expect( style?.ystdtb?.faqItem?.arrow?.spacing?.margin?.top ).toBe(
			'8px'
		);
	} );

	it( '外観を更新して他の設定を保持する', () => {
		const style = updateLabelTypography(
			{
				ystdtb: {
					faqItem: {
						arrow: { spacing: { margin: { top: '8px' } } },
					},
				},
			},
			{ fontStyle: 'italic', fontWeight: '600' }
		);

		expect(
			getLabelTypography( { ...DEFAULT_ATTRIBUTES, style } )
		).toEqual( { fontStyle: 'italic', fontWeight: '600' } );
		expect( style?.ystdtb?.faqItem?.arrow?.spacing?.margin?.top ).toBe(
			'8px'
		);
	} );

	it( '文字設定をラベルのインラインスタイルへ変換する', () => {
		expect(
			getLabelStyles( {
				...DEFAULT_ATTRIBUTES,
				style: {
					ystdtb: {
						faqItem: {
							label: {
								typography: {
									fontFamily:
										'var:preset|font-family|ys-gothic',
									fontStyle: 'italic',
									fontWeight: '600',
									lineHeight: '1.4',
									textTransform: 'lowercase',
								},
							},
						},
					},
				},
			} )
		).toMatchObject( {
			fontFamily: 'var(--wp--preset--font-family--ys-gothic)',
			fontStyle: 'italic',
			fontWeight: '600',
			lineHeight: '1.4',
			textTransform: 'lowercase',
		} );
	} );

	it( '外観解除時に空階層を削除する', () => {
		expect(
			updateLabelTypography(
				{
					ystdtb: {
						faqItem: {
							label: {
								typography: { fontWeight: '400' },
							},
						},
					},
				},
				undefined
			)
		).toBeUndefined();
	} );
} );

describe( 'FAQアイテムの間隔', () => {
	it( '通常とモバイルの0をcalcで計算できる長さとして出力する', () => {
		const styles = getItemStyles( {
			faqType: 'q',
			style: {
				ystdtb: {
					faqItem: {
						item: {
							spacing: { gap: '0' },
							responsive: { spacing: { gap: { mobile: '0' } } },
						},
					},
				},
			},
		} );
		expect( styles[ '--ystdtb--faq-item--label-gap' ] ).toBe( '0px' );
		expect( styles[ '--ystdtb--mobile--faq-item--label-gap' ] ).toBe(
			'0px'
		);
	} );
} );
