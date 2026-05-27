/**
 * 設定値を取得する.
 *
 * @param {string | undefined} name         設定名.
 * @param {any}                defaultValue 初期値.
 * @deprecated use utils/config
 */
export function getAdminConfig(
	name: string | undefined = undefined,
	defaultValue: any = undefined
) {
	if ( ! name || ! window?.ystdtbAdminConfig ) {
		return window?.ystdtbAdminConfig;
	}
	if ( ! window.ystdtbAdminConfig.hasOwnProperty( name ) ) {
		return defaultValue;
	}
	return window.ystdtbAdminConfig[ name ];
}

/**
 * エディターカラー設定を取得する.
 *
 * @param {'default' | 'theme' | 'custom' | undefined} origin 取得元.
 * @deprecated use utils/config
 */
export function getEditorColors(
	origin: 'default' | 'theme' | 'custom' | undefined = undefined
) {
	const colors = getAdminConfig( 'editorColors', {} );
	if ( ! origin ) {
		return colors;
	}
	return colors?.[ origin ] || [];
}
