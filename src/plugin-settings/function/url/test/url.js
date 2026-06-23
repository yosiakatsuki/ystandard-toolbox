import { getSettingPageUrl } from '../index';

const config = {
	siteUrl: 'https://example.com/',
	pluginUrl: 'https://example.com/plugin',
	menuPageUrl: 'https://example.com/menupage?page=',
	adminUrl: 'https://example.com/wp-admin/',
};

describe( 'getSettingPageUrl', () => {
	test( 'getSettingPageUrl', () => {
		window.ystdtbAdminConfig = config;
		expect( getSettingPageUrl( 'admin.php?page=test-menu' ) ).toBe(
			'https://example.com/wp-admin/admin.php?page=test-menu'
		);
	} );
} );
