import { normalizeSizeValue } from '../index';

describe( 'normalizeSizeValue', () => {
	describe( '空値は undefined を返す', () => {
		it( 'undefined でundefinedが返る', () => {
			expect( normalizeSizeValue( undefined ) ).toBeUndefined();
		} );

		it( 'null でundefinedが返る', () => {
			expect( normalizeSizeValue( null ) ).toBeUndefined();
		} );

		it( '空文字列でundefinedが返る', () => {
			expect( normalizeSizeValue( '' ) ).toBeUndefined();
		} );
	} );

	describe( 'ゼロ値はすべて単位なしの "0" に正規化', () => {
		it( '数値の 0 が "0" になる', () => {
			expect( normalizeSizeValue( 0 ) ).toBe( '0' );
		} );

		it( '文字列 "0" が "0" のまま返る', () => {
			expect( normalizeSizeValue( '0' ) ).toBe( '0' );
		} );

		it( '"0px" が "0" になる', () => {
			expect( normalizeSizeValue( '0px' ) ).toBe( '0' );
		} );

		it( '"0em" が "0" になる', () => {
			expect( normalizeSizeValue( '0em' ) ).toBe( '0' );
		} );

		it( '"0rem" が "0" になる', () => {
			expect( normalizeSizeValue( '0rem' ) ).toBe( '0' );
		} );

		it( '"0.0" が "0" になる', () => {
			expect( normalizeSizeValue( '0.0' ) ).toBe( '0' );
		} );

		it( '"-0" が "0" になる（-0 === 0）', () => {
			expect( normalizeSizeValue( '-0' ) ).toBe( '0' );
		} );
	} );

	describe( '非ゼロ値はそのまま返す', () => {
		it( '数値の 10 が "10" になる', () => {
			expect( normalizeSizeValue( 10 ) ).toBe( '10' );
		} );

		it( '"1px" がそのまま返る', () => {
			expect( normalizeSizeValue( '1px' ) ).toBe( '1px' );
		} );

		it( '"0.5em" がそのまま返る', () => {
			expect( normalizeSizeValue( '0.5em' ) ).toBe( '0.5em' );
		} );

		it( '"2.5rem" がそのまま返る', () => {
			expect( normalizeSizeValue( '2.5rem' ) ).toBe( '2.5rem' );
		} );

		it( '負の値 "-1px" がそのまま返る', () => {
			expect( normalizeSizeValue( '-1px' ) ).toBe( '-1px' );
		} );
	} );

	describe( '数値化できない値はそのまま返す', () => {
		it( '"auto" がそのまま返る', () => {
			expect( normalizeSizeValue( 'auto' ) ).toBe( 'auto' );
		} );

		it( '"calc(100% - 10px)" がそのまま返る', () => {
			expect( normalizeSizeValue( 'calc(100% - 10px)' ) ).toBe(
				'calc(100% - 10px)'
			);
		} );
	} );
} );
