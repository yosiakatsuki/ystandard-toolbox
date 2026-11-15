/* WordPress Dependencies */
import { createBlock, parse, serialize } from '@wordpress/blocks';

/* Block Dependencies */
import { registerFaqTestBlocks } from '../../helpers/register-blocks';
import { migrateFaqItemAttributes } from '../../../../src/blocks/block-library/faq-item/deprecated/2.3.0/migrate';

registerFaqTestBlocks();

describe( 'FAQ Itemの標準枠線', () => {
	it.each( [
		{ color: '#123456', width: '3px', style: 'dashed', radius: '8px' },
		{
			bottom: {
				color: 'var:preset|color|ys-green',
				width: '2px',
				style: 'solid',
			},
		},
		{
			top: { width: '1px', style: 'dotted' },
			left: { width: '4px', style: 'solid' },
		},
	] )( '枠線をItem本体に保存し、再読込できる: %j', ( border ) => {
		const html = serialize(
			createBlock( 'ystdtb/faq-item', {
				faqType: 'a',
				style: { border, color: { text: '#222222' } },
			} )
		);
		const block = parse( html )[ 0 ];
		expect( block.isValid ).toBe( true );
		expect( block.attributes.style.border ).toEqual( border );
		const container = document.createElement( 'div' );
		container.innerHTML = html;
		expect(
			container
				.querySelector( '.ystdtb-faq-item' )
				.getAttribute( 'style' )
		).toContain( 'border' );
		expect(
			container.querySelector( '.ystdtb-faq-item__contents' ).style.border
		).toBe( '' );
		expect( html ).not.toContain( 'has-border-bottom' );
	} );

	it( '旧プリセットの下線を移し、他のスタイルを保持する', () => {
		const migrated = migrateFaqItemAttributes( {
			faqBorderType: 'bottom',
			faqBorderSize: '3px',
			faqBorderColor: 'ys-green',
			customFaqBorderColor: '#ff0000',
			style: {
				color: { text: '#222222' },
				ystdtb: {
					faqItem: { arrow: { spacing: { margin: { top: '8px' } } } },
				},
			},
		} );
		expect( migrated.style.border ).toEqual( {
			bottom: {
				width: '3px',
				style: 'solid',
				color: 'var:preset|color|ys-green',
			},
		} );
		expect( migrated.style.color.text ).toBe( '#222222' );
		expect( migrated.style.ystdtb.faqItem.arrow.spacing.margin.top ).toBe(
			'8px'
		);
		expect( migrated ).not.toHaveProperty( 'faqBorderColor' );
	} );

	it.each( [ '0', '0px', undefined ] )(
		'幅%pの旧下線を表示させない',
		( width ) => {
			const migrated = migrateFaqItemAttributes( {
				faqBorderType: 'bottom',
				faqBorderSize: width,
				customFaqBorderColor: '#eeeeee',
			} );
			expect( migrated ).toEqual( {} );
		}
	);

	it( '無効な旧枠線は除去し、新形式の枠線を優先する', () => {
		expect(
			migrateFaqItemAttributes( {
				faqBorderType: '',
				faqBorderSize: '3px',
			} )
		).toEqual( {} );
		const border = { width: '4px', style: 'dotted' };
		expect(
			migrateFaqItemAttributes( {
				faqBorderType: 'bottom',
				faqBorderSize: '3px',
				style: { border },
			} ).style.border
		).toEqual( border );
	} );
} );
