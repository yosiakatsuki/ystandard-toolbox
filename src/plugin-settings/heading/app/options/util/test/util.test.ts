import { isResponsiveHeadingOption } from '../index';

describe( 'isResponsiveHeadingOption', () => {
	test( 'オブジェクト以外の値に対して false を返す', () => {
		expect( isResponsiveHeadingOption( null ) ).toBe( false );
		expect( isResponsiveHeadingOption( undefined ) ).toBe( false );
		expect( isResponsiveHeadingOption( 123 ) ).toBe( false );
		expect( isResponsiveHeadingOption( 'string' ) ).toBe( false );
		expect( isResponsiveHeadingOption( [] ) ).toBe( false );
	} );
	test( '空のオブジェクトに対して false を返す', () => {
		expect( isResponsiveHeadingOption( {} ) ).toBe( false );
	} );
	test( 'レスポンシブキーを持つオブジェクトに対して true を返す', () => {
		expect( isResponsiveHeadingOption( { tablet: 'value' } ) ).toBe( true );
		expect( isResponsiveHeadingOption( { mobile: 'value' } ) ).toBe( true );
		expect(
			isResponsiveHeadingOption( {
				desktop: 'value',
				tablet: 'value',
				mobile: 'value',
			} )
		).toBe( true );
	} );
	test( 'desktopのみを持っているオブジェクトは false を返す', () => {
		expect( isResponsiveHeadingOption( { desktop: 'value' } ) ).toBe(
			false
		);
	} );
} );
