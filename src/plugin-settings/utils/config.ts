/**
 * 設定を取得するユーティリティ関数
 *
 * @param name
 * @param defaultValue
 * @return
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
 * @return
 */
export function getEditorColors() {
	return getAdminConfig( 'editorColors' );
}

/**
 * 設定からエディターのフォントサイズ設定を取得
 *
 * @return
 */
export function getEditorFontSizes() {
	return getAdminConfig( 'editorFontSizes' );
}

/**
 * 設定からエディターのフォントファミリー設定を取得
 *
 * @param origin 取得元
 * @return
 */
export function getEditorFontFamilies(
	origin: 'default' | 'theme' | 'custom' | undefined = undefined
) {
	const fontFamilies = getAdminConfig( 'editorFontFamilies', {} );
	if ( ! origin ) {
		return fontFamilies;
	}
	return fontFamilies?.[ origin ] || [];
}

/**
 * 設定からエディターの余白サイズ設定を取得
 *
 * @return
 */
export function getEditorSpacingSizes() {
	return getAdminConfig( 'editorSpacingSizes' );
}

/**
 * プラグインのアセットURLを取得
 *
 * @return
 */
export function getPluginAssetsUrl(): string {
	const pluginUrl = getAdminConfig( 'pluginUrl' );
	return `${ pluginUrl }/assets/settings`;
}
