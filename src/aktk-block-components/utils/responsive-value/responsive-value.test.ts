import { isResponsiveValue, parseResponsiveValue, getFlatValue } from './index';

describe( 'isResponsiveValue', () => {
	test( 'オブジェクト以外の値に対して false を返す', () => {
		expect( isResponsiveValue( null ) ).toBe( false );
		expect( isResponsiveValue( undefined ) ).toBe( false );
		expect( isResponsiveValue( 123 ) ).toBe( false );
		expect( isResponsiveValue( 'string' ) ).toBe( false );
		expect( isResponsiveValue( [] ) ).toBe( false );
	} );

	test( '空のオブジェクトに対して false を返す', () => {
		expect( isResponsiveValue( {} ) ).toBe( false );
	} );

	test( 'レスポンシブキーを持つオブジェクトに対して true を返す', () => {
		expect( isResponsiveValue( { desktop: 'value' } ) ).toBe( true );
		expect( isResponsiveValue( { tablet: 'value' } ) ).toBe( true );
		expect( isResponsiveValue( { mobile: 'value' } ) ).toBe( true );
		expect(
			isResponsiveValue( {
				desktop: 'value',
				tablet: 'value',
				mobile: 'value',
			} )
		).toBe( true );
	} );

	test( 'レスポンシブキーを持たないオブジェクトに対して false を返す', () => {
		expect( isResponsiveValue( { nonResponsiveKey: 'value' } ) ).toBe(
			false
		);
	} );
} );

describe( 'parseResponsiveValue', () => {
	test( 'オブジェクト以外の値に対して、元の値を返す', () => {
		// @ts-ignore
		expect( parseResponsiveValue( null ) ).toBe( null );
		expect( parseResponsiveValue( undefined ) ).toBe( undefined );
		expect( parseResponsiveValue( 123 ) ).toBe( 123 );
		expect( parseResponsiveValue( 'string' ) ).toBe( 'string' );
	} );

	test( 'レスポンシブキーを持つオブジェクトに対して、そのキーに対応する値を含むオブジェクトを返す', () => {
		expect(
			parseResponsiveValue( { desktop: 'd', tablet: 't', mobile: 'm' } )
		).toEqual( { desktop: 'd', tablet: 't', mobile: 'm' } );
		expect( parseResponsiveValue( { desktop: 'd' } ) ).toEqual( {
			desktop: 'd',
		} );
		expect( parseResponsiveValue( { tablet: 't' } ) ).toEqual( {
			tablet: 't',
		} );
		expect( parseResponsiveValue( { mobile: 'm' } ) ).toEqual( {
			mobile: 'm',
		} );
	} );

	test( 'レスポンシブキーを持たないオブジェクトに対して undefined を返す', () => {
		expect( parseResponsiveValue( {} ) ).toBe( undefined );
		// @ts-ignore
		expect( parseResponsiveValue( { nonResponsiveKey: 'value' } ) ).toBe(
			undefined
		);
	} );

	test( '空のプロパティを削除して返す', () => {
		expect(
			parseResponsiveValue( {
				desktop: 'd',
				tablet: undefined,
				// @ts-ignore
				mobile: null,
			} )
		).toEqual( { desktop: 'd' } );
		expect(
			parseResponsiveValue( {
				desktop: undefined,
				tablet: undefined,
				mobile: undefined,
			} )
		).toBe( undefined );
	} );
} );

describe( 'getFlatValue', () => {
	test( 'レスポンシブ形式の値が与えられた場合、デスクトップの値を返す', () => {
		const responsiveValue = { desktop: 'd', tablet: 't', mobile: 'm' };
		const defaultValue = 'default';
		expect( getFlatValue( responsiveValue, defaultValue ) ).toBe( 'd' );
	} );

	test( 'レスポンシブ形式の値が与えられ、デスクトップの値が存在しない場合、デフォルト値を返す', () => {
		const responsiveValue = { tablet: 't', mobile: 'm' };
		const defaultValue = 'default';
		expect( getFlatValue( responsiveValue, defaultValue ) ).toBe(
			defaultValue
		);
	} );

	test( 'レスポンシブ形式ではない値が与えられた場合、その値をそのまま返す', () => {
		const nonResponsiveValue = 'non-responsive';
		const defaultValue = 'default';
		expect( getFlatValue( nonResponsiveValue, defaultValue ) ).toBe(
			nonResponsiveValue
		);
	} );
} );
