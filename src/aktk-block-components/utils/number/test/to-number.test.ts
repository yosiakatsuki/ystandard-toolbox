import { toNumber } from '../index';

describe( 'toNumber', () => {
	it( '数値型がそのまま返る', () => {
		expect( toNumber( 42 ) ).toBe( 42 );
	} );

	it( '小数の数値型がそのまま返る', () => {
		expect( toNumber( 3.14 ) ).toBe( 3.14 );
	} );

	it( '数値文字列が変換される', () => {
		expect( toNumber( '3.14' ) ).toBe( 3.14 );
	} );

	it( '整数文字列が変換される', () => {
		expect( toNumber( '10' ) ).toBe( 10 );
	} );

	it( '非数値文字列でデフォルト値が返る', () => {
		expect( toNumber( 'abc', 0 ) ).toBe( 0 );
	} );

	it( 'nullでデフォルト値が返る', () => {
		expect( toNumber( null, 0 ) ).toBe( 0 );
	} );

	it( 'undefinedでデフォルト値が返る', () => {
		expect( toNumber( undefined, 0 ) ).toBe( 0 );
	} );

	it( '空文字でデフォルト値が返る', () => {
		expect( toNumber( '', 0 ) ).toBe( 0 );
	} );

	it( 'デフォルト値未指定時にundefinedが返る', () => {
		expect( toNumber( 'abc' ) ).toBeUndefined();
	} );

	it( 'boolean型は数値に変換できずデフォルト値が返る', () => {
		expect( toNumber( true, 0 ) ).toBe( 0 );
		expect( toNumber( false, 0 ) ).toBe( 0 );
	} );

	it( 'boolean型でデフォルト値未指定時にundefinedが返る', () => {
		expect( toNumber( true ) ).toBeUndefined();
		expect( toNumber( false ) ).toBeUndefined();
	} );
} );
