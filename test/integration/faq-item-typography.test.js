/* WordPress Dependencies */
import { createBlock, getBlockType, parse, serialize } from '@wordpress/blocks';

/* Block Dependencies */
import { registerFaqTestBlocks } from './helpers/register-blocks';
import { migrateFaqItemAttributes } from '../../src/blocks/block-library/faq-item/deprecated/2.3.0/migrate';

registerFaqTestBlocks();

/**
 * 保存HTMLをDOMとして読み取り、文字サイズの適用先を検証する.
 *
 * @param attributes FAQ Itemの属性.
 */
function renderItem( attributes ) {
	const html = serialize( createBlock( 'ystdtb/faq-item', attributes ) );
	const container = document.createElement( 'div' );
	container.innerHTML = html;
	expect( parse( html )[ 0 ].isValid ).toBe( true );
	return container;
}

describe( 'FAQ Itemの文字サイズ', () => {
	it( 'コアタイポグラフィの適用先をFAQコンテンツとして登録する', () => {
		expect( getBlockType( 'ystdtb/faq-item' ).selectors.typography ).toBe(
			'.ystdtb-faq-item__contents'
		);
	} );

	it( 'コアのプリセット文字サイズをFAQコンテンツだけに保存する', () => {
		const container = renderItem( { fontSize: 'large' } );
		const item = container.querySelector( '.ystdtb-faq-item' );
		const label = container.querySelector( '.ystdtb-faq-item__label' );
		const contents = container.querySelector(
			'.ystdtb-faq-item__contents'
		);

		expect( contents.classList.contains( 'has-large-font-size' ) ).toBe(
			true
		);
		expect( item.classList.contains( 'has-large-font-size' ) ).toBe(
			false
		);
		expect( label.classList.contains( 'has-large-font-size' ) ).toBe(
			false
		);
	} );

	it( 'コアのカスタム文字サイズをFAQコンテンツだけに保存する', () => {
		const container = renderItem( {
			style: { typography: { fontSize: '24px' } },
		} );
		const item = container.querySelector( '.ystdtb-faq-item' );
		const label = container.querySelector( '.ystdtb-faq-item__label' );
		const contents = container.querySelector(
			'.ystdtb-faq-item__contents'
		);

		expect( contents.style.fontSize ).toBe( '24px' );
		expect( item.style.fontSize ).toBe( '' );
		expect( label.style.fontSize ).toBe( '' );
	} );

	it( '専用のプリセット文字サイズをFAQラベルだけに保存する', () => {
		const container = renderItem( { labelSize: 'large' } );
		const label = container.querySelector( '.ystdtb-faq-item__label' );
		const contents = container.querySelector(
			'.ystdtb-faq-item__contents'
		);

		expect( label.classList.contains( 'has-large-font-size' ) ).toBe(
			true
		);
		expect( contents.classList.contains( 'has-large-font-size' ) ).toBe(
			false
		);
	} );

	it( '専用のカスタム文字サイズをFAQラベルだけに保存する', () => {
		const container = renderItem( { customLabelSize: '1.5em' } );
		const label = container.querySelector( '.ystdtb-faq-item__label' );
		const contents = container.querySelector(
			'.ystdtb-faq-item__contents'
		);

		expect( label.style.fontSize ).toBe( '1.5em' );
		expect( contents.style.fontSize ).toBe( '' );
	} );

	it.each( [
		[ 'var:preset|color|ys-red', 'var(--wp--preset--color--ys-red)' ],
		[ '#0f766e', '#0f766e' ],
	] )( '専用の文字色%sをFAQラベルだけに保存する', ( color, css ) => {
		const container = renderItem( {
			style: {
				ystdtb: {
					faqItem: {
						label: { color: { text: color } },
					},
				},
			},
		} );
		const label = container.querySelector( '.ystdtb-faq-item__label' );
		const contents = container.querySelector(
			'.ystdtb-faq-item__contents'
		);

		expect( label.getAttribute( 'style' ) ).toContain( `color:${ css }` );
		expect( contents.style.color ).toBe( '' );
	} );

	it( '専用の外観をFAQラベルだけに保存する', () => {
		const container = renderItem( {
			style: {
				ystdtb: {
					faqItem: {
						label: {
							typography: {
								fontStyle: 'italic',
								fontWeight: '600',
							},
						},
					},
				},
			},
		} );
		const label = container.querySelector( '.ystdtb-faq-item__label' );
		const contents = container.querySelector(
			'.ystdtb-faq-item__contents'
		);

		expect( label.style.fontStyle ).toBe( 'italic' );
		expect( label.style.fontWeight ).toBe( '600' );
		expect( contents.style.fontStyle ).toBe( '' );
		expect( contents.style.fontWeight ).toBe( '' );
	} );

	it( '旧太字解除を標準ウェイトへ移し、他の設定を保持する', () => {
		const migrated = migrateFaqItemAttributes( {
			labelBold: false,
			style: {
				ystdtb: {
					faqItem: {
						arrow: { spacing: { margin: { top: '8px' } } },
					},
				},
			},
		} );

		expect( migrated.style.ystdtb.faqItem.label.typography ).toEqual( {
			fontStyle: 'normal',
			fontWeight: '400',
		} );
		expect( migrated.style.ystdtb.faqItem.arrow.spacing.margin.top ).toBe(
			'8px'
		);
		expect( migrated ).not.toHaveProperty( 'labelBold' );
	} );

	it( '旧ラベル文字色を移し、プリセット色を優先する', () => {
		const migrated = migrateFaqItemAttributes( {
			labelColor: 'ys-red',
			customLabelColor: '#0f766e',
		} );

		expect( migrated.style.ystdtb.faqItem.label.color.text ).toBe(
			'var:preset|color|ys-red'
		);
		expect( migrated ).not.toHaveProperty( 'labelColor' );
		expect( migrated ).not.toHaveProperty( 'customLabelColor' );
	} );

	it( '旧既定値の太字はカスタム外観を追加せずに保持する', () => {
		expect( migrateFaqItemAttributes( { labelBold: true } ) ).toEqual( {
			labelBold: true,
		} );
	} );
} );
