import { getAdminConfig } from '../config';

export function getSettingPageUrl( name ) {
	const pageUrl = getAdminConfig( 'adminUrl' );
	return `${ pageUrl }${ name }`;
}