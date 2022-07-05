import { migrateSubHeaderFontSize } from '../sub-header';

describe( 'migrateSubHeaderFontSize', () => {
	test( 'old to new', () => {
		const size = {
			size: 18,
			unit: 'em',
		};
		expect( migrateSubHeaderFontSize( size ) ).toBe( '18em' );
	} );
	test( 'old broken', () => {
		const size = {
			unit: 'em',
		};
		expect( migrateSubHeaderFontSize( size ) ).toBeUndefined();
	} );
	test( 'old has not unit', () => {
		const size = {
			size: 24,
		};
		expect( migrateSubHeaderFontSize( size ) ).toBe( '24px' );
	} );
	test( 'new', () => {
		const size = '32em';
		expect( migrateSubHeaderFontSize( size ) ).toBe( '32em' );
	} );
} );
