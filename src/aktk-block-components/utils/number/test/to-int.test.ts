import { toInt } from '../index';

describe( 'toInt', () => {
	it( '整数型がそのまま返る', () => {
		expect( toInt( 42 ) ).toBe( 42 );
	} );

	it( '小数を含む数値が整数に切り捨てられる', () => {
		expect( toInt( 3.14 ) ).toBe( 3 );
	} );

	it( '整数文字列が変換される', () => {
		expect( toInt( '10' ) ).toBe( 10 );
	} );

	it( '小数文字列が整数に切り捨てられる', () => {
		expect( toInt( '3.14' ) ).toBe( 3 );
	} );

	it( '非数値文字列でデフォルト値が返る', () => {
		expect( toInt( 'abc', 0 ) ).toBe( 0 );
	} );

	it( 'nullでデフォルト値が返る', () => {
		expect( toInt( null, 0 ) ).toBe( 0 );
	} );

	it( 'undefinedでデフォルト値が返る', () => {
		expect( toInt( undefined, 0 ) ).toBe( 0 );
	} );

	it( '空文字でデフォルト値が返る', () => {
		expect( toInt( '', 0 ) ).toBe( 0 );
	} );

	it( 'デフォルト値未指定時にundefinedが返る', () => {
		expect( toInt( 'abc' ) ).toBeUndefined();
	} );
} );
