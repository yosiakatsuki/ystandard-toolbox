/**
 * WordPress
 */
// @ts-ignore
import apiFetch from '@wordpress/api-fetch';

export interface ApiPostProps {
	endpoint: string;
	data?: object;
	callback?: ( response: ApiPostCallbackProps ) => void;
	messageSuccess?: ( massage?: string | undefined ) => void;
	messageError?: ( massage?: string | undefined ) => void;
}

export interface ApiPostCallbackProps {
	status: string;
	data?: object;
	response?: any;
	error?: any;
}

const NAMESPACE = 'ystdtb-api/v1';
export const SUCCESS = 'success';
export const ERROR = 'error';

// @ts-ignore
function getResponseData( response ) {
	if ( response?.data && 'string' === typeof response?.data ) {
		try {
			return JSON.parse( response.data );
		} catch ( e ) {
			/* eslint-disable no-console */
			console.error( 'レスポンスの解析中にエラーが発生しました' );
			// @ts-ignore
			console.log( e.message );
			/* eslint-enable */
		}
	}

	return undefined;
}

export function isSuccess( status: string ) {
	return SUCCESS === status;
}

export function getEndpoint( route: string ) {
	return `${ NAMESPACE }/${ route }`;
}

export async function apiPost( props: ApiPostProps ) {
	const { endpoint, data, callback, messageSuccess, messageError } = props;
	const options = {
		path: endpoint,
		method: 'POST',
		data,
	};
	await apiFetch( options )
		// @ts-ignore
		.then( ( response ) => {
			// @ts-ignore
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
		// @ts-ignore
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

export interface ApiGetProps {
	endpoint: string;
	data?: object;
	callback?: ( response: ApiPostCallbackProps ) => void;
}

export async function apiGet( props: ApiGetProps ) {
	const { endpoint, callback } = props;
	const options = {
		path: endpoint,
	};
	return await apiFetch( options )
		// @ts-ignore
		.then( ( result ) => {
			if ( 'function' === typeof callback ) {
				callback( {
					status: SUCCESS,
					data: result,
				} );
			}
			return result;
		} )
		// @ts-ignore
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
