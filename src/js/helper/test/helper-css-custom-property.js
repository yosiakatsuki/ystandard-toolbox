import {
	getPropertyName,
	getCustomProperties,
	getResponsiveCustomProperties,
} from '../css-custom-property';

describe( 'CSS Custom Property - getPropertyName', () => {
	test( 'getPropertyName - full', () => {
		expect(
			getPropertyName( {
				property: 'margin',
				isResponsive: true,
				suffix: 'ooo',
				device: 'desktop',
			} )
		).toBe( '--ystdtb-margin-ooo-desktop' );
	} );
	test( 'getPropertyName - no responsive', () => {
		expect(
			getPropertyName( {
				property: 'margin-top',
				isResponsive: false,
				suffix: 'ooo',
				device: 'desktop',
			} )
		).toBe( 'marginTop' );
	} );
	test( 'getPropertyName - no Suffix', () => {
		expect(
			getPropertyName( {
				property: 'margin-top',
				isResponsive: true,
				device: 'desktop',
			} )
		).toBe( '--ystdtb-margin-top-desktop' );
	} );
	test( 'getPropertyName - no device', () => {
		expect(
			getPropertyName( {
				property: 'margin-top',
				isResponsive: true,
			} )
		).toBe( '--ystdtb-margin-top' );
	} );
} );

describe( 'CSS Custom Property - getCustomProperties', () => {
	test( 'getCustomProperties', () => {
		expect(
			getCustomProperties( {
				value: {
					marginTop: '10px',
					'padding-left': '20px',
				},
				device: 'desktop',
			} )
		).toEqual( {
			'--ystdtb-margin-top-desktop': '10px',
			'--ystdtb-padding-left-desktop': '20px',
		} );
	} );
	test( 'getCustomProperties - not responsive', () => {
		expect(
			getCustomProperties( {
				value: {
					marginTop: '10px',
					'padding-left': '20px',
				},
				isResponsive: false,
				device: 'desktop',
			} )
		).toEqual( {
			marginTop: '10px',
			paddingLeft: '20px',
		} );
	} );
} );

describe( 'CSS Custom Property - getResponsiveCustomProperties', () => {
	test( 'getResponsiveCustomProperties', () => {
		expect(
			getResponsiveCustomProperties( {
				value: {
					desktop: {
						marginTop: '10px',
						'padding-left': '20px',
					},
					tablet: {
						marginLeft: '30px',
						'row-gap': '40px',
					},
					mobile: {
						marginLeft: '30px',
						'row-gap': '40px',
					},
				},
			} )
		).toEqual( {
			'--ystdtb-margin-top-desktop': '10px',
			'--ystdtb-padding-left-desktop': '20px',
			'--ystdtb-margin-left-tablet': '30px',
			'--ystdtb-row-gap-tablet': '40px',
			'--ystdtb-margin-left-mobile': '30px',
			'--ystdtb-row-gap-mobile': '40px',
		} );
	} );
	test( 'getResponsiveCustomProperties - not responsive', () => {
		expect(
			getResponsiveCustomProperties( {
				value: {
					desktop: {
						marginTop: '10px',
						'padding-left': '20px',
					},
				},
			} )
		).toEqual( {
			marginTop: '10px',
			paddingLeft: '20px',
		} );
	} );
} );
