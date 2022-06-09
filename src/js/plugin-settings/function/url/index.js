import { getAdminConfig } from '../config';

export function getSettingPageUrl( name ) {
	const pageUrl = getAdminConfig( 'menuPageUrl' );
	return `${ pageUrl }${ name }`;
}
