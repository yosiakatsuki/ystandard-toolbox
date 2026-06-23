import {
	getResponsivePaddingStyle,
	getResponsiveMarginStyle,
	getResponsiveGapStyle,
} from '../index';

describe( 'getResponsivePaddingStyle', () => {
	test( 'getResponsivePaddingStyle - only desktop', () => {
		expect(
			getResponsivePaddingStyle( {
				desktop: {
					top: '10px',
					right: '2em',
					bottom: '3vw',
					left: '4ch',
				},
			} )
		).toEqual( {
			padding: '10px 2em 3vw 4ch',
		} );
	} );
	test( 'getResponsivePaddingStyle - responsive', () => {
		expect(
			getResponsivePaddingStyle( {
				desktop: {
					top: '10px',
					right: '2em',
					bottom: '3vw',
					left: '4ch',
				},
				tablet: {
					top: '10px',
					right: '2em',
				},
				mobile: {
					top: '10px',
					right: '2em',
					bottom: '3vw',
					left: '2em',
				},
			} )
		).toEqual( {
			'--ystdtb-padding-desktop': '10px 2em 3vw 4ch',
			'--ystdtb-padding-top-tablet': '10px',
			'--ystdtb-padding-right-tablet': '2em',
			'--ystdtb-padding-mobile': '10px 2em 3vw',
		} );
	} );
} );
describe( 'getResponsiveMarginStyle', () => {
	test( 'getResponsiveMarginStyle - only desktop', () => {
		expect(
			getResponsiveMarginStyle( {
				desktop: {
					top: '10px',
					right: '2em',
					bottom: '3vw',
					left: '4ch',
				},
			} )
		).toEqual( {
			margin: '10px 2em 3vw 4ch',
		} );
	} );
	test( 'getResponsiveMarginStyle - responsive', () => {
		expect(
			getResponsiveMarginStyle( {
				desktop: {
					top: '10px',
					right: '2em',
					bottom: '3vw',
					left: '4ch',
				},
				tablet: {
					top: '10px',
					right: '2em',
				},
				mobile: {
					top: '10px',
					right: '2em',
					bottom: '3vw',
					left: '2em',
				},
			} )
		).toEqual( {
			'--ystdtb-margin-desktop': '10px 2em 3vw 4ch',
			'--ystdtb-margin-top-tablet': '10px',
			'--ystdtb-margin-right-tablet': '2em',
			'--ystdtb-margin-mobile': '10px 2em 3vw',
		} );
	} );
} );
describe( 'getResponsiveGapStyle', () => {
	test( 'getResponsiveGapStyle - only desktop', () => {
		expect(
			getResponsiveGapStyle( {
				desktop: {
					top: '10px',
					right: '10px',
				},
			} )
		).toEqual( {
			gap: '10px',
		} );
	} );
	test( 'getResponsiveGapStyle - only desktop - row - col', () => {
		expect(
			getResponsiveGapStyle( {
				desktop: {
					top: '10px',
					right: '20px',
				},
			} )
		).toEqual( {
			rowGap: '10px',
			columnGap: '20px',
		} );
	} );
	test( 'getResponsiveGapStyle - responsive', () => {
		expect(
			getResponsiveGapStyle( {
				desktop: {
					top: '10px',
					right: '20px',
				},
				tablet: {
					top: '10px',
					right: '10px',
				},
				mobile: {
					top: '40px',
					right: '40px',
				},
			} )
		).toEqual( {
			'--ystdtb-row-gap-desktop': '10px',
			'--ystdtb-column-gap-desktop': '20px',
			'--ystdtb-gap-tablet': '10px',
			'--ystdtb-gap-mobile': '40px',
		} );
	} );
} );
