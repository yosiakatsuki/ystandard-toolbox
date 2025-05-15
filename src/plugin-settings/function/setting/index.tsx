import { isObject } from '@aktk/block-components/utils/object';
/**
 * 設定取得.
 *
 * @param {string} section セクション名.
 * @param {any} defaultValue 初期値.
 * @return {object | Array | string | number | undefined | any} 設定.
 */
export function getPluginSetting(
	section: string | undefined = undefined,
	defaultValue: any = undefined
) {
	const settings = getPluginSettings( 'settings' ) as
		| Record< string, any >
		| undefined;

	if ( ! settings ) {
		return defaultValue;
	}
	if ( ! section ) {
		return settings;
	}
	if (
		! isObject( settings ) ||
		! Object.prototype.hasOwnProperty.call( settings, section )
	) {
		return defaultValue;
	}
	return settings[ section ];
}

/**
 * プラグイン設定 セクション取得
 *
 * @param {string} name 設定名.
 * @return {object | Array | string | number | undefined | any} 設定.
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
