/**
 * Block dependencies.
 */
import type { FaqItemBlockAttributes } from '../types';
import {
	getAccordionArrowMargin,
	getAccordionArrowStyles,
	updateAccordionArrowMargin,
} from '../utils';

const DEFAULT_ATTRIBUTES: FaqItemBlockAttributes = {
	faqType: 'q',
	faqBorderType: '',
	labelPosition: 'center',
	labelBold: true,
};

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
				customAccordionArrowColor: '#222222',
				style: {
					ystdtb: {
						faqItem: {
							arrow: {
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
