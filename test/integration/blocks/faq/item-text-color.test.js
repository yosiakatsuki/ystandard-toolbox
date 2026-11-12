/* WordPress Dependencies */
import { createBlock, getBlockType, parse, serialize } from '@wordpress/blocks';

/* Block Dependencies */
import { registerFaqTestBlocks } from '../../helpers/register-blocks';
import { migrateColors } from '../../../../src/blocks/block-library/faq-item/deprecated/2.3.0/migrate';

registerFaqTestBlocks();

describe( 'FAQ Item全体の標準背景設定', () => {
	it( '色設定の適用先を文字列セレクターとして登録する', () => {
		const colorSelectors =
			getBlockType( 'ystdtb/faq-item' ).selectors.color;
		expect( colorSelectors ).toEqual( {
			root: '.ystdtb-faq-item',
			text: '.ystdtb-faq-item__contents',
		} );
	} );

	it.each( [
		{ backgroundColor: 'ys-light-green' },
		{ style: { color: { background: '#eeeeee' } } },
		{ gradient: 'midnight' },
		{
			style: {
				color: {
					gradient: 'linear-gradient(135deg,#ff0000 0%,#0000ff 100%)',
				},
			},
		},
	] )(
		'背景はItem全体に出力し、文字色を本文に限定する: %j',
		( background ) => {
			const container = renderItem( {
				...background,
				textColor: 'ys-purple',
			} );
			const item = container.querySelector( '.ystdtb-faq-item' );
			expect( item.classList.contains( 'has-background' ) ).toBe( true );
			expect( item.classList.contains( 'has-text-color' ) ).toBe( false );
			expect(
				container.querySelectorAll( '.has-background' )
			).toHaveLength( 1 );
			expect(
				container
					.querySelector( '.has-text-color' )
					.classList.contains( 'ystdtb-faq-item__contents' )
			).toBe( true );
		}
	);

	it( '背景をリセットしても本文文字色を保持する', () => {
		const container = renderItem( { textColor: 'ys-purple' } );
		expect( container.querySelector( '.has-background' ) ).toBeNull();
		expect(
			container
				.querySelector( '.ystdtb-faq-item__contents' )
				.classList.contains( 'has-ys-purple-color' )
		).toBe( true );
	} );

	it( '旧文字色と背景色を同時に移し、開閉ボタンの設定を保持する', () => {
		const style = {
			ystdtb: {
				faqItem: { arrow: { spacing: { margin: { top: '8px' } } } },
			},
		};
		expect(
			migrateColors( {
				customFaqTextColor: '#222222',
				customFaqBackgroundColor: '#eeeeee',
				style,
			} )
		).toEqual( {
			style: {
				...style,
				color: { text: '#222222', background: '#eeeeee' },
			},
		} );
	} );

	it( '旧背景はカスタム色よりプリセットを優先する', () => {
		expect(
			migrateColors( {
				faqBackgroundColor: 'ys-light-green',
				customFaqBackgroundColor: '#eeeeee',
			} )
		).toEqual( { backgroundColor: 'ys-light-green' } );
	} );
} );

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
			style: {
				...color.style,
				ystdtb: {
					faqItem: {
						label: { color: { text: '#aa0000' } },
						arrow: { color: { text: '#00aa00' } },
					},
				},
			},
			backgroundColor: 'ys-light-gray',
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
		expect(
			item.classList.contains( 'has-ys-light-gray-background-color' )
		).toBe( true );
	} );

	it( '文字色をリセットすると本文の色指定だけがなくなる', () => {
		const container = renderItem( {
			textColor: undefined,
			style: {
				color: { text: undefined },
				ystdtb: {
					faqItem: {
						label: { color: { text: '#aa0000' } },
					},
				},
			},
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
		const migrated = migrateColors( {
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
