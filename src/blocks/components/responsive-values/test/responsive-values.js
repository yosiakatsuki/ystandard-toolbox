import { getResponsiveWidthStyle, getResponsiveHeightStyle } from '../index';
describe( 'getResponsiveWidthStyle', () => {
	test( 'getResponsiveWidthStyle - only desktop', () => {
		expect(
			getResponsiveWidthStyle( {
				desktop: '10px',
			} )
		).toEqual( {
			width: '10px',
		} );
	} );
	test( 'getResponsiveWidthStyle - responsive', () => {
		expect(
			getResponsiveWidthStyle( {
				desktop: '10px',
				tablet: '20px',
				mobile: '30px',
			} )
		).toEqual( {
			'--ystdtb-width-desktop': '10px',
			'--ystdtb-width-tablet': '20px',
			'--ystdtb-width-mobile': '30px',
		} );
	} );
} );
describe( 'getResponsiveHeightStyle', () => {
	test( 'getResponsiveHeightStyle - only desktop', () => {
		expect(
			getResponsiveHeightStyle( {
				desktop: '10px',
			} )
		).toEqual( {
			height: '10px',
		} );
	} );
	test( 'getResponsiveHeightStyle - responsive', () => {
		expect(
			getResponsiveHeightStyle( {
				desktop: '10px',
				tablet: '20px',
				mobile: '30px',
			} )
		).toEqual( {
			'--ystdtb-height-desktop': '10px',
			'--ystdtb-height-tablet': '20px',
			'--ystdtb-height-mobile': '30px',
		} );
	} );
} );
