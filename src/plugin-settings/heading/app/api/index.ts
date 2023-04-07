import { apiGet, getEndpoint } from '@aktk/api';

export async function getLevelList() {
	return await apiGet( {
		endpoint: getEndpoint( 'get_heading_level' ),
	} );
}
export async function getHeadingStyles() {
	return await apiGet( {
		endpoint: getEndpoint( 'get_heading_styles' ),
	} );
}
