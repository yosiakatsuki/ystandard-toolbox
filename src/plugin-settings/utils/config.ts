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

/**
 * 設定からエディターのフォントサイズ設定を取得
 *
 * @returns
 */
export function getEditorFontSizes() {
	return getAdminConfig( 'editorFontSizes' );
}

/**
 * 設定からエディターの余白サイズ設定を取得
 *
 * @returns
 */
export function getEditorSpacingSizes() {
	return getAdminConfig( 'editorSpacingSizes' );
}

/**
 * プラグインのアセットURLを取得
 *
 * @returns
 */
export function getPluginAssetsUrl(): string {
	const pluginUrl = getAdminConfig( 'pluginUrl' );
	return `${ pluginUrl }/assets/settings`;
}
