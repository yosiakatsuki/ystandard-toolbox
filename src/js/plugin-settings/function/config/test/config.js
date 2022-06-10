import { getAdminConfig } from '../index';

const config = {
	siteUrl: 'https://example.com/',
	pluginUrl: 'https://example.com/plugin',
	menuPageUrl: 'https://example.com/menupage',
};

describe( 'getAdminConfig', () => {
	test( 'no config', () => {
		expect( getAdminConfig() ).toBeUndefined();
	} );
	test( 'get all', () => {
		window.ystdtbAdminConfig = config;
		expect( getAdminConfig() ).toEqual( config );
	} );
	test( 'get siteUrl', () => {
		window.ystdtbAdminConfig = config;
		expect( getAdminConfig( 'siteUrl' ) ).toBe( 'https://example.com/' );
	} );
	test( 'has not key', () => {
		window.ystdtbAdminConfig = config;
		expect( getAdminConfig( 'notHasKey' ) ).toBeUndefined();
	} );
} );
