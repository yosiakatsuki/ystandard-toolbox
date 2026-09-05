/* WordPress Dependencies */
import { createBlock, parse, serialize } from '@wordpress/blocks';

/* Block Dependencies */
import { registerFaqTestBlocks } from './helpers/register-blocks';
import { migrateTextColor } from '../../src/blocks/block-library/faq-item/deprecated/2.3.0/migrate';

registerFaqTestBlocks();

/**
 * 保存HTMLをDOMとして読み取り、文字色の適用先を検証する.
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

describe( 'FAQ Itemの標準本文文字色', () => {
	it.each( [
		{ textColor: 'ys-purple' },
		{ style: { color: { text: '#1e3a8a' } } },
	] )( '文字色を本文にだけ保存する: %j', ( color ) => {
		const container = renderItem( {
			...color,
			customLabelColor: '#aa0000',
			customAccordionArrowColor: '#00aa00',
			customFaqBackgroundColor: '#eeeeee',
		} );
		const item = container.querySelector( '.ystdtb-faq-item' );
		const contents = container.querySelector(
			'.ystdtb-faq-item__contents'
		);
		expect( item.style.color ).toBe( '' );
		expect( item.classList.contains( 'has-text-color' ) ).toBe( false );
		expect( item.classList.contains( 'has-ys-purple-color' ) ).toBe(
			false
		);
		expect( contents.classList.contains( 'has-text-color' ) ).toBe( true );
		expect( contents.classList.contains( 'has-ys-purple-color' ) ).toBe(
			!! color.textColor
		);
		expect( contents.style.color ).toBe(
			color.textColor ? '' : 'rgb(30, 58, 138)'
		);
		expect(
			container.querySelector( '.ystdtb-faq-item__label' ).style.color
		).toBe( 'rgb(170, 0, 0)' );
		expect(
			container.querySelector( '.ystdtb-faq-item__arrow' ).style.color
		).toBe( 'rgb(0, 170, 0)' );
		expect( item.style.backgroundColor ).toBe( 'rgb(238, 238, 238)' );
	} );

	it( '文字色をリセットすると本文の色指定だけがなくなる', () => {
		const container = renderItem( {
			textColor: undefined,
			style: { color: { text: undefined } },
			customLabelColor: '#aa0000',
		} );
		const contents = container.querySelector(
			'.ystdtb-faq-item__contents'
		);
		expect( contents.style.color ).toBe( '' );
		expect( contents.classList.contains( 'has-text-color' ) ).toBe( false );
		expect(
			container.querySelector( '.ystdtb-faq-item__label' ).style.color
		).toBe( 'rgb(170, 0, 0)' );
	} );

	it( '旧色の移行で他のstyleやラベル設定を失わない', () => {
		const style = {
			ystdtb: {
				faqItem: { arrow: { spacing: { margin: { top: '8px' } } } },
			},
		};
		const migrated = migrateTextColor( {
			faqTextColor: 'ys-purple',
			customFaqTextColor: '#1e3a8a',
			labelColor: 'ys-red',
			style,
		} );
		expect( migrated ).toEqual( {
			textColor: 'ys-purple',
			labelColor: 'ys-red',
			style: { ...style, color: { text: '#1e3a8a' } },
		} );
		expect( style ).not.toHaveProperty( 'color' );
	} );
} );
