import { getAdminConfig } from '../index';

const config = {
	siteUrl: 'https://example.com/',
	pluginUrl: 'https://example.com/plugin',
	menuPageUrl: 'https://example.com/menupage',
};

describe( 'getAdminConfig', () => {
	// @ts-ignore
	test( 'no config', () => {
		expect( getAdminConfig() ).toBeUndefined();
	} );
	// @ts-ignore
	test( 'get all', () => {
		window.ystdtbAdminConfig = config;
		expect( getAdminConfig() ).toEqual( config );
	} );
	// @ts-ignore
	test( 'get siteUrl', () => {
		window.ystdtbAdminConfig = config;
		expect( getAdminConfig( 'siteUrl' ) ).toBe( 'https://example.com/' );
	} );
	// @ts-ignore
	test( 'has not key', () => {
		window.ystdtbAdminConfig = config;
		expect( getAdminConfig( 'notHasKey' ) ).toBeUndefined();
	} );
} );
