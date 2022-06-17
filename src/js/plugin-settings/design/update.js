import { apiPost, getEndpoint } from '@aktk/api';

export function update( { data, callback, success, error } ) {
	apiPost( {
		endpoint: getEndpoint( 'update_plugin_settings_all' ),
		data,
		callback,
		messageSuccess: success,
		messageError: error,
	} );
}
