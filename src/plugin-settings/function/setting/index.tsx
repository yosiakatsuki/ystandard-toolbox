import { hasObjectKey } from '@aktk/helper/object';

/**
 * 設定取得.
 *
 * @param {string} section セクション名.
 * @param {any} defaultValue 初期値.
 * @returns {object|array|string|number|undefined|any}
 */
export function getPluginSetting(
	section: string | undefined = undefined,
	defaultValue: any = undefined
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

/**
 * プラグイン設定 セクション取得
 *
 * @param {string} name 設定名.
 * @return {object|array|string|number|undefined|any}
 */
export function getPluginSettings( name: string ) {
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
	//TODO:移動させる.
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
