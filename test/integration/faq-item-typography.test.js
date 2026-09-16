/* WordPress Dependencies */
import { createBlock, getBlockType, parse, serialize } from '@wordpress/blocks';

/* Block Dependencies */
import { registerFaqTestBlocks } from './helpers/register-blocks';

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
} );
