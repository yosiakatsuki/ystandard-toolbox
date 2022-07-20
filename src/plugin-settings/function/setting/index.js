import { hasObjectKey } from '@aktk/helper/object.js';

export function getPluginSetting(
	section = undefined,
	defaultValue = undefined
) {
	const settings = getPluginSettings( 'settings' );
	if ( ! settings ) {
		return defaultValue;
	}
	if ( ! section ) {
		return settings;
	}
	if ( ! hasObjectKey( settings, section ) ) {
		return defaultValue;
	}
	return settings[ section ];
}

export function getPluginSettings( name ) {
	if ( ! window?.ystdtbPluginSettings ) {
		return undefined;
	}
	const pluginSettings = window?.ystdtbPluginSettings;
	if ( ! Object.prototype.hasOwnProperty.call( pluginSettings, name ) ) {
		return undefined;
	}
	return pluginSettings[ name ];
}

export function getCodeSetting() {
	const defaultSetting = {
		head: '',
		head_amp: '',
		body_open: '',
		body_open_amp: '',
		body_close: '',
		body_close_amp: '',
	};
	return window?.ystdtbPluginSettings?.code || defaultSetting;
}
