import { getPluginSettings } from '@aktk/plugin-settings/function/setting';
import type { HeadingOption, HeadingStyle } from '../types';
import { apiPost, getEndpoint, SUCCESS } from '@aktk/api';
import {
	notifyError,
	notifySuccess,
} from '@aktk/block-components/components/toast-message';

export function getHeadingOptions() {
	return {
		design: getPluginSettings( 'heading_design' ),
		level: getPluginSettings( 'heading_level' ),
		isCompatible: getPluginSettings( 'heading_is_compatible' ),
		breakpoints: getPluginSettings( 'heading_breakpoints' ),
	};
}

export function getNewOption( slug: string, label: string ): HeadingOption {
	return {
		slug,
		label,
		enable: true,
		enableParagraph: false,
		style: {} as HeadingStyle,
	};
}

export function updateStyleOption(
	styles: HeadingOption,
	onSuccess: () => void | undefined,
	onError: () => void | undefined
) {
	apiPost( {
		endpoint: getEndpoint( 'add_heading_style' ),
		data: { style: styles },
		callback: ( response ) => {
			if ( SUCCESS === response.status ) {
				if ( onSuccess ) {
					onSuccess();
				}
			} else if ( onError ) {
				onError();
			}
		},
		// @ts-ignore
		messageSuccess: notifySuccess,
		// @ts-ignore
		messageError: notifyError,
	} );
}
