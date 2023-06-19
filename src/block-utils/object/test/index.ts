import { deleteUndefined } from '../index';
describe( 'deleteUndefined', () => {
	// @ts-ignore
	test( 'not object', () => {
		// @ts-ignore
		expect( deleteUndefined( undefined ) ).toBeUndefined();

		// @ts-ignore
		expect( deleteUndefined( null ) ).toBeNull();

		expect( deleteUndefined( [ 1, 2, 3 ] ) ).toEqual( [ 1, 2, 3 ] );
	} );
	// @ts-ignore
	test( 'object', () => {
		expect( deleteUndefined( { a: 1, b: 2, c: 3 } ) ).toEqual( {
			a: 1,
			b: 2,
			c: 3,
		} );

		expect( deleteUndefined( { a: 1, b: undefined, c: 3 } ) ).toEqual( {
			a: 1,
			c: 3,
		} );
	} );
} );
