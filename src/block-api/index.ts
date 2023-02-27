/**
 * WordPress
 */
import apiFetch from '@wordpress/api-fetch';

const NAMESPACE = 'ystdtb-api/v1';
export const SUCCESS = 'success';
export const ERROR = 'error';

function getResponseData( response ) {
	if ( response?.data && 'string' === typeof response?.data ) {
		try {
			return JSON.parse( response.data );
		} catch ( e ) {
			/* eslint-disable no-console */
			console.error( 'レスポンスの解析中にエラーが発生しました' );
			console.log( e.message );
			/* eslint-enable */
		}
	}

	return undefined;
}

export function isSuccess( status ) {
	return SUCCESS === status;
}

export function getEndpoint( route ) {
	return `${ NAMESPACE }/${ route }`;
}

export function apiPost( props ) {
	const { endpoint, data, callback, messageSuccess, messageError } = props;
	const options = {
		path: endpoint,
		method: 'POST',
		data,
	};
	apiFetch( options )
		.then( ( response ) => {
			if ( isSuccess( response.status ) ) {
				if ( 'function' === typeof messageSuccess ) {
					messageSuccess();
				}
				if ( 'function' === typeof callback ) {
					callback( {
						status: SUCCESS,
						data: getResponseData( response ),
						response,
					} );
				}
			} else {
				/* eslint-disable no-console */
				console.error( '設定の更新に失敗しました。' );
				console.log( response );
				/* eslint-enable */
				if ( 'function' === typeof messageError ) {
					messageError();
				}
				if ( 'function' === typeof callback ) {
					callback( {
						status: ERROR,
						data: getResponseData( response ),
						response,
					} );
				}
			}
		} )
		.catch( ( error ) => {
			/* eslint-disable no-console */
			console.error( 'エラーが発生しました。' );
			console.log( error );
			/* eslint-enable */
			if ( 'function' === typeof messageError ) {
				messageError();
			}
			if ( 'function' === typeof callback ) {
				callback( {
					status: ERROR,
					error,
				} );
			}
		} );
}

export function apiGet( props ) {
	const { endpoint, callback } = props;
	const options = {
		path: endpoint,
	};
	apiFetch( options )
		.then( ( result ) => {
			if ( 'function' === typeof callback ) {
				callback( {
					status: SUCCESS,
					data: result,
				} );
			} else {
				return result;
			}
		} )
		.catch( ( error ) => {
			/* eslint-disable no-console */
			console.error( 'エラーが発生しました。' );
			console.log( error );
			/* eslint-enable */
			if ( 'function' === typeof callback ) {
				callback( {
					status: ERROR,
					error,
				} );
			}
		} );
}
