import { getComputedFluidTypographyValue } from '@wordpress/block-editor';

jest.mock( '@wordpress/block-editor', () => ( {
	getComputedFluidTypographyValue: jest.fn(),
} ) );

import {
	fontSizeCssValueToPickerValue,
	fontSizeValueToCssValue,
	updateResponsiveFontSize,
} from '../utils';

const mockedGetComputedFluidTypographyValue =
	getComputedFluidTypographyValue as jest.Mock;

describe( 'fontSizeValueToCssValue', () => {
	beforeEach( () => {
		mockedGetComputedFluidTypographyValue.mockReset();
		mockedGetComputedFluidTypographyValue.mockReturnValue( null );
	} );

	it( '数値をpx値へ変換する', () => {
		expect( fontSizeValueToCssValue( 32 ) ).toBe( '32px' );
	} );

	it( 'プリセットの実値を優先する', () => {
		expect(
			fontSizeValueToCssValue( 12, {
				name: '大',
				slug: 'large',
				size: 36,
			} )
		).toBe( '36px' );
	} );

	it( '流体プリセットはコアが計算したclamp値を返す', () => {
		const fluidValue = 'clamp(1rem, 2vw, 1.125rem)';
		mockedGetComputedFluidTypographyValue.mockReturnValue( fluidValue );

		expect(
			fontSizeValueToCssValue(
				'1.141rem',
				{
					slug: 'ys-18-16',
					size: '1.141rem',
					fluid: {
						min: '1rem',
						max: '1.125rem',
					},
				},
				{ fluid: true }
			)
		).toBe( fluidValue );
	} );
} );

describe( 'fontSizeCssValueToPickerValue', () => {
	beforeEach( () => {
		mockedGetComputedFluidTypographyValue.mockReset();
		mockedGetComputedFluidTypographyValue.mockReturnValue( null );
	} );

	it( 'プリセットに一致するCSS値を選択用の値へ戻す', () => {
		expect(
			fontSizeCssValueToPickerValue( '32px', [
				{
					slug: 'large',
					size: 32,
				},
			] )
		).toBe( 32 );
	} );
} );

describe( 'updateResponsiveFontSize', () => {
	it( '指定デバイスだけを更新する', () => {
		expect(
			updateResponsiveFontSize(
				{ desktop: '32px', mobile: '16px' },
				'tablet',
				24
			)
		).toEqual( {
			desktop: '32px',
			tablet: '24px',
			mobile: '16px',
		} );
	} );

	it( 'リセットしたデバイスのキーを削除する', () => {
		expect(
			updateResponsiveFontSize(
				{ desktop: '32px', mobile: '16px' },
				'desktop',
				undefined
			)
		).toEqual( {
			mobile: '16px',
		} );
	} );
} );
