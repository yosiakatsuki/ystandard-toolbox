import { hasBorderWidth } from '../index';

describe( 'hasBorderWidth', () => {
	describe( '空値は false を返す', () => {
		it( 'undefined で false が返る', () => {
			expect( hasBorderWidth( undefined ) ).toBe( false );
		} );

		it( 'null で false が返る', () => {
			expect( hasBorderWidth( null ) ).toBe( false );
		} );

		it( '空文字列で false が返る', () => {
			expect( hasBorderWidth( '' ) ).toBe( false );
		} );

		it( '数値の 0 で false が返る', () => {
			expect( hasBorderWidth( 0 ) ).toBe( false );
		} );
	} );

	describe( 'ゼロ値は false を返す', () => {
		it( '"0" で false が返る', () => {
			expect( hasBorderWidth( '0' ) ).toBe( false );
		} );

		it( '"0px" で false が返る', () => {
			expect( hasBorderWidth( '0px' ) ).toBe( false );
		} );

		it( '"0em" で false が返る', () => {
			expect( hasBorderWidth( '0em' ) ).toBe( false );
		} );

		it( '"0rem" で false が返る', () => {
			expect( hasBorderWidth( '0rem' ) ).toBe( false );
		} );

		it( '"0.0" で false が返る', () => {
			expect( hasBorderWidth( '0.0' ) ).toBe( false );
		} );

		it( '"-0" で false が返る', () => {
			expect( hasBorderWidth( '-0' ) ).toBe( false );
		} );
	} );

	describe( '0 でない数値は true を返す', () => {
		it( '数値の 10 で true が返る', () => {
			expect( hasBorderWidth( 10 ) ).toBe( true );
		} );

		it( '"1px" で true が返る', () => {
			expect( hasBorderWidth( '1px' ) ).toBe( true );
		} );

		it( '"0.5em" で true が返る', () => {
			expect( hasBorderWidth( '0.5em' ) ).toBe( true );
		} );

		it( '"2.5rem" で true が返る', () => {
			expect( hasBorderWidth( '2.5rem' ) ).toBe( true );
		} );

		it( '負の値 "-1px" で true が返る', () => {
			expect( hasBorderWidth( '-1px' ) ).toBe( true );
		} );
	} );

	describe( '数値化できない文字列は true を返す（使う側で判断）', () => {
		it( '"auto" で true が返る', () => {
			expect( hasBorderWidth( 'auto' ) ).toBe( true );
		} );

		it( '"calc(100% - 10px)" で true が返る', () => {
			expect( hasBorderWidth( 'calc(100% - 10px)' ) ).toBe( true );
		} );
	} );
} );
