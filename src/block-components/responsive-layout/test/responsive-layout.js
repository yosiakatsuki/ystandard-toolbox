import { getResponsiveLayoutStyle } from '../index';

describe( 'getResponsiveLayoutStyle', () => {
	test( 'getResponsiveLayoutStyle - only desktop', () => {
		expect(
			getResponsiveLayoutStyle( {
				desktop: {
					orientation: 'vertical',
					justifyContent: 'center',
					alignItems: 'flex-start',
					flexWrap: 'nowrap',
				},
			} )
		).toEqual( {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'flex-start',
			flexWrap: 'nowrap',
		} );
	} );
	test( 'getResponsiveLayoutStyle - only desktop orientation', () => {
		expect(
			getResponsiveLayoutStyle( {
				desktop: {
					orientation: 'vertical',
				},
			} )
		).toEqual( {
			flexDirection: 'column',
		} );
	} );
	test( 'getResponsiveLayoutStyle - responsive', () => {
		expect(
			getResponsiveLayoutStyle( {
				desktop: {
					orientation: 'vertical',
					justifyContent: 'center',
					alignItems: 'flex-start',
					flexWrap: 'nowrap',
				},
				tablet: {
					orientation: 'horizontal',
					justifyContent: 'left',
					alignItems: 'center',
					flexWrap: 'nowrap',
				},
				mobile: {
					orientation: 'horizontal',
					justifyContent: 'right',
					alignItems: 'flex-end',
					flexWrap: 'wrap',
				},
			} )
		).toEqual( {
			'--ystdtb-flex-direction-desktop': 'column',
			'--ystdtb-justify-content-desktop': 'center',
			'--ystdtb-align-items-desktop': 'flex-start',
			'--ystdtb-flex-wrap-desktop': 'nowrap',
			'--ystdtb-flex-direction-tablet': 'row',
			'--ystdtb-justify-content-tablet': 'left',
			'--ystdtb-align-items-tablet': 'center',
			'--ystdtb-flex-wrap-tablet': 'nowrap',
			'--ystdtb-flex-direction-mobile': 'row',
			'--ystdtb-justify-content-mobile': 'right',
			'--ystdtb-align-items-mobile': 'flex-end',
			'--ystdtb-flex-wrap-mobile': 'wrap',
		} );
	} );
} );
