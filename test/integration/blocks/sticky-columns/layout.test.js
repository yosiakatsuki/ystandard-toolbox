/* WordPress Dependencies */
import { createBlock, parse, serialize } from '@wordpress/blocks';

/* Plugin Dependencies */
import { registerStickyColumnsTestBlocks } from '../../helpers/register-blocks';
import { getBlockFixtureHTML, writeBlockFixtureHTML } from '../../fixtures';

registerStickyColumnsTestBlocks();

/**
 * 装飾の異なる2カラムを用意し、内容の入れ替えがないことも確認する。
 * @param attributes 親の表示順・追従設定。
 */
function createColumns( attributes ) {
	return createBlock( 'ystdtb/sticky-columns', attributes, [
		createBlock( 'ystdtb/sticky-columns-item', {
			style: { color: { background: '#112233' } },
		} ),
		createBlock( 'ystdtb/sticky-columns-item', {
			style: { color: { background: '#445566' } },
		} ),
	] );
}

describe( '追従カラムの表示順と追従対象の保存', () => {
	it( '初期値は通常順・カラム1追従で、既定値の属性を二重保存しない', () => {
		const block = createColumns( {} );
		expect( block.attributes.reverse ).toBe( false );
		expect( block.attributes.stickyColumn ).toBe( 'first' );
		const html = serialize( block );
		expect( html ).toContain( 'ystdtb-sticky-columns has-sticky-first' );
		expect( html ).not.toContain( '"reverse"' );
		expect( html ).not.toContain( '"stickyColumn"' );
		expect( html ).not.toContain( '--ystdtb--columns--sticky-offset' );
	} );

	it.each( [
		[ false, 'first' ],
		[ false, 'second' ],
		[ false, 'none' ],
		[ true, 'first' ],
		[ true, 'second' ],
		[ true, 'none' ],
	] )(
		'逆順=%s・追従=%sを再読込しても子の順序と装飾を保つ',
		( reverse, stickyColumn ) => {
			const original = createColumns( { reverse, stickyColumn } );
			const html = serialize( original );
			const [ parsed ] = parse( html );
			expect( parsed.isValid ).toBe( true );
			expect( parsed.attributes ).toEqual( original.attributes );
			expect(
				parsed.innerBlocks.map( ( block ) => block.attributes )
			).toEqual(
				original.innerBlocks.map( ( block ) => block.attributes )
			);
			expect(
				parsed.innerBlocks.every( ( block ) => block.isValid )
			).toBe( true );
			const container = document.createElement( 'div' );
			container.innerHTML = html;
			const parent = container.firstElementChild;
			expect( parent.children ).toHaveLength( 2 );
			expect( parent.classList.contains( 'is-reversed' ) ).toBe(
				reverse
			);
			expect( parent.classList.contains( 'has-sticky-first' ) ).toBe(
				stickyColumn === 'first'
			);
			expect( parent.classList.contains( 'has-sticky-second' ) ).toBe(
				stickyColumn === 'second'
			);
			expect( parent.children[ 0 ].style.backgroundColor ).toBe(
				'rgb(17, 34, 51)'
			);
			expect( parent.children[ 1 ].style.backgroundColor ).toBe(
				'rgb(68, 85, 102)'
			);
			expect( html ).not.toContain( 'wp-block-ystdtb-sticky-columns' );
			expect( serialize( parsed ) ).toBe( html );
		}
	);

	it( '追従位置0pxは既定値に戻さず保存する', () => {
		const style = { ystdtb: { stickyColumns: { stickyOffset: '0px' } } };
		const html = serialize( createColumns( { style } ) );
		expect( html ).toContain( '--ystdtb--columns--sticky-offset:0px' );
		const [ parsed ] = parse( html );
		expect( parsed.isValid ).toBe( true );
		expect( parsed.attributes.style ).toEqual( style );
		expect( serialize( parsed ) ).toBe( html );
	} );

	it( '逆順・カラム2追従と、内側の通常順・追従なしを独立して保存する', () => {
		const nested = createColumns( { stickyColumn: 'none' } );
		const outer = createColumns( {
			reverse: true,
			stickyColumn: 'second',
		} );
		outer.innerBlocks[ 0 ].innerBlocks = [ nested ];
		const html = serialize( outer );
		const basename =
			'ystdtb__sticky-columns__layout__reverse-second-nested-none';
		// 明示的なfixture生成時だけ、新しい入力HTMLを作る。
		if (
			process.env.GENERATE_MISSING_FIXTURES &&
			! getBlockFixtureHTML( basename ).file
		) {
			writeBlockFixtureHTML( basename, html + '\n' );
		}
		expect( html ).toBe( getBlockFixtureHTML( basename ).file );
		const [ parsed ] = parse( html );
		expect( parsed.isValid ).toBe( true );
		expect( parsed.innerBlocks[ 0 ].innerBlocks[ 0 ].isValid ).toBe( true );
		expect( parsed.attributes.stickyColumn ).toBe( 'second' );
		expect( parsed.innerBlocks[ 0 ].innerBlocks[ 0 ].attributes ).toEqual( {
			collapseAt: 'mobile',
			reverse: false,
			stickyColumn: 'none',
		} );
	} );
	it.each( [ 'mobile', 'tablet', 'container' ] )(
		'条件%sを選んでコンテナサイズ未指定のまま保存・再読込できる',
		( mode ) => {
			const html = serialize( createColumns( { collapseAt: mode } ) );
			expect( html ).not.toContain( 'containerSize' );
			const [ parsed ] = parse( html );
			expect( parsed.isValid ).toBe( true );
			expect( parsed.attributes.collapseAt ).toBe( mode );
			expect( parsed.attributes.containerSize ).toBeUndefined();
			expect( serialize( parsed ) ).toBe( html );
		}
	);

	it( '切替条件と子の通常値・端末別寸法を再保存できる', () => {
		const style = {
			dimensions: { width: '45%', minHeight: '10rem' },
			ystdtb: {
				stickyColumnsItem: {
					responsive: {
						width: { tablet: '200px' },
						minHeight: { mobile: '0px' },
					},
				},
			},
		};
		const block = createBlock(
			'ystdtb/sticky-columns',
			{
				collapseAt: 'container',
				containerSize: '48.5rem',
				style: {
					ystdtb: { stickyColumns: { stickyOffset: '3.5rem' } },
				},
			},
			[
				createBlock( 'ystdtb/sticky-columns-item', { style } ),
				createBlock( 'ystdtb/sticky-columns-item' ),
			]
		);
		const html = serialize( block );
		const basename =
			'ystdtb__sticky-columns__dimensions__container-responsive';
		const fixture = getBlockFixtureHTML( basename );
		// この寸法設定の保存形式をfixture生成時だけ記録する。
		if ( process.env.GENERATE_MISSING_FIXTURES && ! fixture.file ) {
			writeBlockFixtureHTML( basename, html + '\n' );
		}
		expect( html ).toBe( getBlockFixtureHTML( basename ).file );
		const [ parsed ] = parse( html );
		expect( parsed.attributes.containerSize ).toBe( '48.5rem' );
		expect(
			parsed.attributes.style.ystdtb.stickyColumns.stickyOffset
		).toBe( '3.5rem' );
		expect( parsed.innerBlocks[ 0 ].attributes.style ).toEqual( style );
		expect( parsed.innerBlocks[ 0 ].isValid ).toBe( true );
		expect( html ).toContain( 'min-height:10rem' );
		expect( html ).toContain( '--ystdtb--mobile--columns--min-height:0px' );
		expect( serialize( parsed ) ).toBe( html );
	} );
} );
