import { getCustomSpacingValueFromPreset } from '../util';

describe( 'getCustomSpacingValueFromPreset', () => {
	const spacingSizes = [
		{ name: '小', slug: '40', size: '1rem' },
		{ name: '中', slug: '50', size: '1.5rem' },
	];

	it( '0は0として保持する', () => {
		expect( getCustomSpacingValueFromPreset( '0', spacingSizes ) ).toBe(
			'0'
		);
	} );

	it( 'プリセット値は実値へ変換する', () => {
		expect(
			getCustomSpacingValueFromPreset(
				'var:preset|spacing|40',
				spacingSizes
			)
		).toBe( '1rem' );
	} );

	it( 'カスタム値はそのまま返す', () => {
		expect( getCustomSpacingValueFromPreset( '12px', spacingSizes ) ).toBe(
			'12px'
		);
	} );

	it( '該当しないプリセットはundefinedにする', () => {
		expect(
			getCustomSpacingValueFromPreset(
				'var:preset|spacing|unknown',
				spacingSizes
			)
		).toBeUndefined();
	} );
} );
