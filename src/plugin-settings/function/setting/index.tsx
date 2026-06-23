/**
 * プラグイン設定 セクション取得
 *
 * @param {string} name 設定名.
 * @return {object | Array | string | number | undefined | any} 設定.
 * @deprecated
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

/**
 *
 * @deprecated
 */
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
