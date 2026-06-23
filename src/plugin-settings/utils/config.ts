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
 * エディター設定を取得
 *
 * @return
 */
export function getEditorSettings() {
	return getAdminConfig( 'editorSettings', {} );
}

/**
 * エディター設定をパスで取得
 *
 * @param {string} path         設定パス
 * @param {any}    defaultValue 初期値
 * @return
 */
export function getEditorSetting(
	path: string,
	defaultValue: any = undefined
) {
	const settings = getEditorSettings();
	if ( ! path ) {
		return settings;
	}

	return path.split( '.' ).reduce( ( value, key ) => {
		if (
			undefined === value ||
			null === value ||
			! Object.prototype.hasOwnProperty.call( value, key )
		) {
			return defaultValue;
		}
		return value[ key ];
	}, settings );
}

/**
 * 設定からエディターのカラー設定を取得
 *
 * @param origin 取得元
 * @return
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

/**
 * 設定からエディターのグラデーション設定を取得
 *
 * @param origin 取得元
 * @return
 */
export function getEditorGradients(
	origin: 'default' | 'theme' | 'custom' | undefined = undefined
) {
	const gradients = getAdminConfig( 'editorGradients', {} );
	if ( ! origin ) {
		return gradients;
	}
	return gradients?.[ origin ] || [];
}

/**
 * 設定からエディターのフォントサイズ設定を取得
 *
 * @param origin 取得元
 * @return
 */
export function getEditorFontSizes(
	origin: 'default' | 'theme' | 'custom' | undefined = undefined
) {
	const fontSizes = getAdminConfig( 'editorFontSizes', {} );
	if ( ! origin ) {
		return fontSizes;
	}
	return fontSizes?.[ origin ] || [];
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
 * @param origin 取得元
 * @return
 */
export function getEditorSpacingSizes(
	origin: 'default' | 'theme' | 'custom' | undefined = undefined
) {
	const spacingSizes = getAdminConfig( 'editorSpacingSizes', {} );
	if ( ! origin ) {
		return spacingSizes;
	}
	return spacingSizes?.[ origin ] || [];
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
