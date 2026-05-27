/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Aktk Dependencies
 */
import { getDefaultSpacingSizes } from '@aktk/block-components/hooks/useThemeSpacingSizes';

/**
 * Plugin Dependencies
 */
import {
	getEditorColors,
	getEditorFontFamilies,
	getEditorFontSizes,
	getEditorSetting,
	getEditorSpacingSizes,
} from './config';

type FontFamiliesOrigin = 'default' | 'theme' | 'custom';

const PATHS_WITH_ORIGIN_OVERRIDE = [
	'color.duotone',
	'color.gradients',
	'color.palette',
	'dimensions.aspectRatios',
	'typography.fontFamilies',
	'typography.fontSizes',
	'spacing.spacingSizes',
];

const FONT_FAMILIES_SETTING_NAMES: Partial<
	Record< string, FontFamiliesOrigin >
> = {
	'typography.fontFamilies.default': 'default',
	'typography.fontFamilies.theme': 'theme',
	'typography.fontFamilies.custom': 'custom',
};

/**
 * useSettings()に返せる設定値があるか判定する.
 *
 * @param {unknown} value 判定する値.
 * @return {boolean} 設定値がある場合はtrue.
 */
function hasSettingValue( value: unknown ) {
	// falseは意味がある場合があるので、undefinedとnullを判定.
	if ( undefined === value || null === value ) {
		return false;
	}
	// 空配列は未設定として扱い、originのフォールバックを続ける.
	if ( Array.isArray( value ) ) {
		return 0 < value.length;
	}
	return true;
}

/**
 * WordPressのエディター設定から値を取得する.
 *
 * @param {string} settingName useSettings()の設定名.
 * @return {unknown} エディター設定の値.
 */
function getOriginSettingValue( settingName: string ) {
	// wp_get_global_settings()由来の設定をパスで取得する.
	const originSetting = getEditorSetting( settingName );
	// origin別ではない設定は取得した値をそのまま返す.
	if ( ! PATHS_WITH_ORIGIN_OVERRIDE.includes( settingName ) ) {
		return originSetting;
	}

	// origin別設定はWordPressと同じ優先順で値を返す.
	if ( hasSettingValue( originSetting?.custom ) ) {
		return originSetting.custom;
	}
	// customが空の場合はthemeを使う.
	if ( hasSettingValue( originSetting?.theme ) ) {
		return originSetting.theme;
	}
	// themeも空の場合はdefaultを使う.
	if ( hasSettingValue( originSetting?.default ) ) {
		return originSetting.default;
	}

	return undefined;
}

/**
 * 既存の管理画面設定からフォールバック値を取得する.
 *
 * @param {string} settingName useSettings()の設定名.
 * @return {unknown} フォールバック設定の値.
 */
function getFallbackSettingValue( settingName: string ) {
	// 既存のテーマカラー取得処理へフォールバックする.
	if ( 'color.palette.theme' === settingName ) {
		return getEditorColors();
	}

	// 既存のテーマフォントサイズ取得処理へフォールバックする.
	if ( 'typography.fontSizes.theme' === settingName ) {
		return getEditorFontSizes();
	}

	// フォントファミリーはoriginごとの既存取得処理へフォールバックする.
	const fontFamiliesOrigin = FONT_FAMILIES_SETTING_NAMES[ settingName ];
	if ( fontFamiliesOrigin ) {
		return getEditorFontFamilies( fontFamiliesOrigin );
	}

	// 既存のテーマ余白サイズ取得処理へフォールバックする.
	if ( 'spacing.spacingSizes.theme' === settingName ) {
		return getEditorSpacingSizes();
	}

	// defaultの余白サイズが無い場合はローカル定義を使う.
	if ( 'spacing.spacingSizes.default' === settingName ) {
		return getDefaultSpacingSizes();
	}

	// defaultの余白サイズを表示対象にする.
	if ( 'spacing.defaultSpacingSizes' === settingName ) {
		return true;
	}

	return undefined;
}

/**
 * エディター設定をuseSetting向けに注入するフィルターを登録.
 * 主に管理画面の設定をエディターのuseSettings()で使えるようにするためのフィルター.
 *
 * @param {string} namespace フィルターの名前空間.
 */
export function registerEditorSettingFilters( namespace: string ) {
	addFilter(
		'blockEditor.useSetting.before',
		`${ namespace }/editorSettings`,
		( settingValue: unknown, settingName: string ) => {
			// すでに値がある場合はWordPress側の値を優先する.
			if ( hasSettingValue( settingValue ) ) {
				return settingValue;
			}

			// まずwp_get_global_settings()由来の値を返す.
			const editorSettingValue = getOriginSettingValue( settingName );
			if ( hasSettingValue( editorSettingValue ) ) {
				return editorSettingValue;
			}

			// 足りない値だけ管理画面設定で補完する.
			const fallbackSettingValue = getFallbackSettingValue( settingName );
			if ( hasSettingValue( fallbackSettingValue ) ) {
				return fallbackSettingValue;
			}

			// 対応外の設定はWordPressの標準処理へ戻す.
			return undefined;
		}
	);
}
