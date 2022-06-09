import { getSettingPageUrl } from '../index';

const config = {
	siteUrl: 'https://example.com/',
	pluginUrl: 'https://example.com/plugin',
	menuPageUrl: 'https://example.com/menupage?page=',
};

describe( 'getSettingPageUrl', () => {
	test( 'getSettingPageUrl', () => {
		window.ystdtbPluginSettings = config;
		expect( getSettingPageUrl( 'test-menu' ) ).toBe(
			'https://example.com/menupage?page=test-menu'
		);
	} );
} );
