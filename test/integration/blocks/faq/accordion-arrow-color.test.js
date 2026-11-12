/* External Dependencies */
import fs from 'fs';
import path from 'path';
/* WordPress Dependencies */
import {
	createBlock,
	parse,
	serialize,
	registerBlockType,
	getBlockType,
} from '@wordpress/blocks';

/* Block Dependencies */
import { registerFaqTestBlocks } from '../../helpers/register-blocks';
import { migrateAccordionArrowColor } from '../../../../src/blocks/block-library/faq/deprecated/arrow-color';
import { migrateDeprecated1341Faq } from '../../../../src/blocks/block-library/faq/deprecated/1.34.1';
import { deprecated1341 as itemDeprecated1341 } from '../../../../src/blocks/block-library/faq-item/deprecated/1.34.1';

registerFaqTestBlocks();
// 本文の保持を検証するため、段落の最小保存定義を登録する。
if ( ! getBlockType( 'core/paragraph' ) ) {
	registerBlockType( 'core/paragraph', {
		title: '段落',
		supports: { className: false },
		category: 'text',
		attributes: {
			content: { type: 'string', source: 'html', selector: 'p' },
		},
		save: ( { attributes } ) => <p>{ attributes.content }</p>,
	} );
}

describe( 'FAQ開閉ボタン色', () => {
	it.each( [ 'var:preset|color|ys-red', '#123456', undefined ] )(
		'新形式の色%pを保存・再読込できる',
		( text ) => {
			const block = createBlock(
				'ystdtb/faq',
				{
					isAccordion: true,
					style: { ystdtb: { faq: { arrow: { color: { text } } } } },
				},
				[
					createBlock(
						'ystdtb/faq-item',
						{
							faqType: 'q',
							style: {
								ystdtb: {
									faqItem: {
										arrow: {
											color: { text },
											spacing: {
												margin: { left: '8px' },
											},
										},
									},
								},
							},
						},
						[ createBlock( 'core/paragraph', { content: '質問' } ) ]
					),
					createBlock(
						'ystdtb/faq-item',
						{
							faqType: 'a',
							style: {
								ystdtb: {
									faqItem: { arrow: { color: { text } } },
								},
							},
						},
						[ createBlock( 'core/paragraph', { content: '回答' } ) ]
					),
				]
			);
			const html = serialize( block );
			const parsed = parse( html )[ 0 ];
			expect( parsed.isValid ).toBe( true );
			expect( parsed.innerBlocks.every( ( item ) => item.isValid ) ).toBe(
				true
			);
			expect( serialize( parsed ) ).toBe( html );
			expect( html ).not.toMatch(
				/(?:customAccordionArrowColor|accordionArrowColor)/
			);
			expect(
				html.match( /class="ystdtb-faq-item__arrow/g )
			).toHaveLength( 1 );
			expect( html ).toContain( 'margin-left:8px' );
			// 未指定なら色指定を出力せず、指定時は対応するCSS値を出力する。
			const cssColor =
				text === 'var:preset|color|ys-red'
					? 'var(--wp--preset--color--ys-red)'
					: text;
			expect( html ).toContain(
				text
					? `color:${ cssColor }`
					: 'class="ystdtb-faq-item__arrow" style="margin-left:8px"'
			);
		}
	);
	it.each( [ 'faq', 'faqItem' ] )(
		'%sの移行は新設定と他のスタイルを保持する',
		( element ) => {
			const style = {
				color: { background: '#eeeeee' },
				ystdtb: {
					[ element ]: {
						arrow: {
							color: { text: '#abcdef' },
							spacing: { margin: { top: '2px' } },
						},
					},
				},
			};
			expect(
				migrateAccordionArrowColor(
					{
						accordionArrowColor: 'ys-red',
						customAccordionArrowColor: '#123456',
						style,
					},
					element
				)
			).toEqual( { style } );
			expect(
				migrateAccordionArrowColor(
					{
						accordionArrowColor: 'ys-red',
						customAccordionArrowColor: '#123456',
					},
					element
				).style.ystdtb[ element ].arrow.color.text
			).toBe( 'var:preset|color|ys-red' );
			expect(
				migrateAccordionArrowColor(
					{ customAccordionArrowColor: '#123456' },
					element
				).style.ystdtb[ element ].arrow.color.text
			).toBe( '#123456' );
			expect(
				migrateAccordionArrowColor(
					{ accordionArrowColor: '', customAccordionArrowColor: '' },
					element
				)
			).toEqual( {} );
		}
	);
} );

describe( 'v2.3.0サイトの保存HTMLからの移行', () => {
	beforeAll( () => {
		// 実サイトの保存アイコンをテスト環境にも登録する。
		const html = fs.readFileSync(
			path.join( __dirname, 'fixtures/v2.3.0-arrow-color.html' ),
			'utf8'
		);
		window.ystdtbIconList.push( {
			name: 'chevron-down',
			icon: html.match( /<svg[\s\S]*?<\/svg>/ )[ 0 ],
		} );
	} );
	it( '親子の色・本文を保って移行し、再保存後も有効なブロックになる', () => {
		const html = fs.readFileSync(
			path.join( __dirname, 'fixtures/v2.3.0-arrow-color.html' ),
			'utf8'
		);
		const blocks = parse( html );
		const expected = [
			'var:preset|color|ys-red',
			'#123456',
			'var:preset|color|ys-blue',
		];
		expect( blocks ).toHaveLength( 3 );
		blocks.forEach( ( block, index ) => {
			expect( block.isValid ).toBe( true );
			expect( block.attributes.style.ystdtb.faq.arrow.color.text ).toBe(
				expected[ index ]
			);
			expect( block.innerBlocks ).toHaveLength( 2 );
			block.innerBlocks.forEach( ( item ) => {
				expect( item.isValid ).toBe( true );
				expect(
					item.attributes.style.ystdtb.faqItem.arrow.color.text
				).toBe( expected[ index ] );
				expect( item.innerBlocks[ 0 ].attributes.content ).toContain(
					'互換性確認'
				);
			} );
		} );
		expect( blocks[ 1 ].attributes.style.color.background ).toBe(
			'#fff7ed'
		);
		expect( blocks[ 1 ].attributes.style.border.width ).toBe( '2px' );
		const saved = serialize( blocks );
		expect( saved ).not.toMatch(
			/(?:customAccordionArrowColor|accordionArrowColor)/
		);
		const reloaded = parse( saved );
		expect( serialize( reloaded ) ).toBe( saved );
		expect(
			reloaded.every(
				( b ) => b.isValid && b.innerBlocks.every( ( c ) => c.isValid )
			)
		).toBe( true );
		// 旧HTMLのdeprecated判定で発生するログだけを確認後にクリアする。
		/* eslint-disable no-console */
		console.warn.mockClear();
		console.error.mockClear();
		console.info.mockClear();
		/* eslint-enable no-console */
	} );
} );

describe( 'v1形式の開閉ボタン色', () => {
	it( '親の数値枠線と色を現行形式へ直接移行する', () => {
		const value = migrateDeprecated1341Faq( {
			isAccordion: true,
			borderType: 'all',
			borderSize: 2,
			customAccordionArrowColor: '#123456',
		} );
		expect( value.style.border.width ).toBe( '2px' );
		expect( value.style.ystdtb.faq.arrow.color.text ).toBe( '#123456' );
		expect( value ).not.toHaveProperty( 'customAccordionArrowColor' );
	} );
	it( '子の数値属性を補正し、色を現行形式へ直接移行する', () => {
		const value = itemDeprecated1341[ 0 ].migrate( {
			faqType: 'q',
			labelBorderSize: 2,
			labelBorderRadius: 4,
			accordionArrowColor: 'ys-red',
			customAccordionArrowColor: '#123456',
		} );
		expect( value.labelBorderSize ).toBe( '2px' );
		expect( value.labelBorderRadius ).toBe( '4px' );
		expect( value.style.ystdtb.faqItem.arrow.color.text ).toBe(
			'var:preset|color|ys-red'
		);
		expect( value ).not.toHaveProperty( 'accordionArrowColor' );
		expect( value ).not.toHaveProperty( 'customAccordionArrowColor' );
	} );
} );
