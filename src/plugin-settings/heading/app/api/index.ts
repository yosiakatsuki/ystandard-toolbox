/**
 * Components.
 */
import {
	notifyError,
	notifySuccess,
} from '@aktk/block-components/components/toast-message';
/**
 * Plugin Settings.
 */
import type { HeadingOption } from '@aktk/plugin-settings/heading/types';
import {
	apiGet,
	getEndpoint,
	apiPost,
	SUCCESS,
	ERROR,
	ApiPostCallbackProps,
} from '@aktk/api';

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

export interface UpdateHeadingOptionProps {
	type: 'update' | 'delete';
	headingOption: HeadingOption;
	onSuccess?: ( response?: ApiPostCallbackProps ) => void;
	onError?: ( response?: ApiPostCallbackProps ) => void;
}

export async function updateHeadingStyles( props: UpdateHeadingOptionProps ) {
	await apiPost( {
		endpoint: getEndpoint( 'update_heading_style' ),
		data: {
			type: props.type,
			style: props.headingOption,
		},
		callback: ( response ) => {
			if ( SUCCESS === response.status ) {
				props?.onSuccess?.( response );
			}
			if ( ERROR === response.status ) {
				props?.onError?.( response );
			}
		},
		// @ts-ignore
		messageSuccess: notifySuccess,
		// @ts-ignore
		messageError: notifyError,
	} );
}
