/**
 * 設定を取得するユーティリティ関数
 *
 * @param name
 * @param defaultValue
 * @returns
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
 * 設定からエディターのカラー設定を取得
 *
 * @returns
 */
export function getEditorColors() {
	return getAdminConfig( 'editorColors' );
}
