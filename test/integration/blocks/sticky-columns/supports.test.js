/* WordPress Dependencies */
import { createBlock, parse, serialize } from '@wordpress/blocks';

/* Plugin Dependencies */
import { registerStickyColumnsTestBlocks } from '../../helpers/register-blocks';
import { getBlockFixtureHTML, writeBlockFixtureHTML } from '../../fixtures';

registerStickyColumnsTestBlocks();

const parentStyle = {
	color: { text: '#123456', background: '#eef2f6' },
	typography: { fontSize: '20px', lineHeight: '1.8' },
	spacing: {
		padding: { top: '24px', right: '16px', bottom: '24px', left: '16px' },
		margin: { top: '32px', bottom: '16px' },
	},
	border: { color: '#445566', style: 'solid', width: '2px', radius: '8px' },
	shadow: '0 2px 8px #00000033',
};

const childStyle = {
	color: {
		text: '#ffffff',
		gradient: 'linear-gradient(135deg,rgb(0,0,0) 0%,rgb(100,100,100) 100%)',
	},
	typography: { fontSize: '16px', lineHeight: '1.6' },
	spacing: {
		padding: { top: '0px', right: '12px', bottom: '20px', left: '12px' },
		margin: { top: '0px', bottom: '8px' },
	},
	border: { color: '#334455', style: 'dashed', width: '1px', radius: '4px' },
	shadow: '0 1px 4px #00000022',
};

/**
 * 装飾付きの親と、装飾あり・なしの子を組み合わせる。
 */
function createDecoratedColumns() {
	return createBlock( 'ystdtb/sticky-columns', { style: parentStyle }, [
		createBlock( 'ystdtb/sticky-columns-item', { style: childStyle } ),
		createBlock( 'ystdtb/sticky-columns-item' ),
	] );
}

describe( '追従カラムの標準装飾Supports', () => {
	it( '親子の外枠へ装飾を保存し、再読込しても設定を維持する', () => {
		const html = serialize( createDecoratedColumns() );
		const basename = 'ystdtb__sticky-columns__supports__decoration';
		const fixture = getBlockFixtureHTML( basename );

		// 明示的なfixture生成時だけ、新しい入力HTMLを用意する。
		if ( process.env.GENERATE_MISSING_FIXTURES && ! fixture.file ) {
			writeBlockFixtureHTML( basename, html + '\n' );
		}
		expect( html ).toBe( getBlockFixtureHTML( basename ).file );
		const [ block ] = parse( html );
		expect( block.isValid ).toBe( true );
		expect( block.attributes.style ).toEqual( parentStyle );
		expect( block.innerBlocks[ 0 ].isValid ).toBe( true );
		expect( block.innerBlocks[ 0 ].attributes.style ).toEqual( childStyle );
		expect( block.innerBlocks[ 1 ].attributes.style ).toBeUndefined();

		const container = document.createElement( 'div' );
		container.innerHTML = html;
		const parent = container.querySelector( '.ystdtb-sticky-columns' );
		const [ first, second ] = parent.children;
		expect( parent.children ).toHaveLength( 2 );
		expect( parent.style.fontSize ).toBe( '20px' );
		expect( parent.style.lineHeight ).toBe( '1.8' );
		expect( parent.style.color ).toBe( 'rgb(18, 52, 86)' );
		expect( parent.style.backgroundColor ).toBe( 'rgb(238, 242, 246)' );
		expect( parent.style.padding ).toBe( '24px 16px' );
		expect( parent.style.marginTop ).toBe( '32px' );
		expect( parent.style.marginBottom ).toBe( '16px' );
		expect( parent.style.marginLeft ).toBe( '' );
		expect( parent.style.borderWidth ).toBe( '2px' );
		expect( parent.style.borderStyle ).toBe( 'solid' );
		expect( parent.style.borderColor ).toBe( 'rgb(68, 85, 102)' );
		expect( parent.style.borderRadius ).toBe( '8px' );
		expect( parent.style.boxShadow ).toBe( parentStyle.shadow );
		expect( first.style.background ).toContain( 'linear-gradient' );
		expect( first.style.paddingTop ).toBe( '0px' );
		expect( first.style.marginTop ).toBe( '0px' );
		expect( first.style.borderStyle ).toBe( 'dashed' );
		expect( first.style.boxShadow ).toBe( childStyle.shadow );
		expect( second.getAttribute( 'style' ) ).toBeNull();
		expect( html ).not.toContain( 'wp-block-ystdtb-sticky-columns' );
		expect( html ).not.toContain( 'sticky-columns-item__content' );
	} );

	it( '親の装飾を解除しても、子の装飾と構造を維持する', () => {
		const original = createDecoratedColumns();
		const cleared = createBlock(
			'ystdtb/sticky-columns',
			{},
			original.innerBlocks
		);
		const html = serialize( cleared );
		const [ block ] = parse( html );
		expect( block.isValid ).toBe( true );
		expect( block.attributes.style ).toBeUndefined();
		expect( block.innerBlocks ).toHaveLength( 2 );
		expect( block.innerBlocks[ 0 ].attributes.style ).toEqual( childStyle );
		expect( block.innerBlocks[ 1 ].attributes.style ).toBeUndefined();
	} );
} );
