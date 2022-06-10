import { hasObjectKey } from '@aktk/helper/object.js';

export function getPluginSetting( name = undefined, defaultValue = undefined ) {
	if ( ! window?.ystdtbPluginSettings ) {
		return defaultValue;
	}
	if ( ! name ) {
		return window?.ystdtbPluginSettings?.settings;
	}
	const settings = window?.ystdtbPluginSettings?.settings;
	if ( ! hasObjectKey( settings, name ) ) {
		return defaultValue;
	}
	return settings[ name ];
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
