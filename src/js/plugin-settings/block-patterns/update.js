import { apiPost, getEndpoint } from '@aktk/api';

export function update( { data, callback, success, error } ) {
	apiPost( {
		endpoint: getEndpoint( 'update_block_pattern' ),
		data,
		callback,
		messageSuccess: success,
		messageError: error,
	} );
}
