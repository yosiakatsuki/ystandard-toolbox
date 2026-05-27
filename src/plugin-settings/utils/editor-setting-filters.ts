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

type SettingOrigin = 'custom' | 'theme' | 'default';
type FallbackSettingGetter = ( origin?: SettingOrigin ) => unknown;

const SETTING_ORIGINS: SettingOrigin[] = [ 'custom', 'theme', 'default' ];

const ORIGIN_OVERRIDE_PATHS = [
	'color.duotone',
	'color.gradients',
	'color.palette',
	'dimensions.aspectRatios',
	'typography.fontFamilies',
	'typography.fontSizes',
	'spacing.spacingSizes',
];

const FALLBACK_SETTING_GETTERS: Record< string, FallbackSettingGetter > = {
	'color.palette': ( origin ) => {
		return isThemeOrigin( origin ) ? getEditorColors() : undefined;
	},
	'typography.fontSizes': ( origin ) => {
		return getEditorFontSizes( origin );
	},
	'typography.fontFamilies': ( origin ) => {
		return getEditorFontFamilies( origin );
	},
	'spacing.spacingSizes': ( origin ) => {
		if ( 'default' === origin ) {
			return getDefaultSpacingSizes();
		}
		return isThemeOrigin( origin ) ? getEditorSpacingSizes() : undefined;
	},
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
 * theme originとして扱うか判定する.
 *
 * @param {SettingOrigin} origin 設定のorigin.
 * @return {boolean} theme originとして扱う場合はtrue.
 */
function isThemeOrigin( origin?: SettingOrigin ) {
	// origin未指定の親パスでは、既存のtheme相当の設定を使う.
	return undefined === origin || 'theme' === origin;
}

/**
 * 設定名からoriginを取得する.
 *
 * @param {string} settingName useSettings()の設定名.
 * @return {SettingOrigin | undefined} 設定名に含まれるorigin.
 */
function getSettingOrigin( settingName: string ) {
	// 最後のパスがoriginの場合だけoriginとして扱う.
	const origin = settingName.split( '.' ).pop() as SettingOrigin | undefined;
	return origin && SETTING_ORIGINS.includes( origin ) ? origin : undefined;
}

/**
 * 設定名からoriginを除いたベースパスを取得する.
 *
 * @param {string} settingName useSettings()の設定名.
 * @return {string} originを除いた設定パス.
 */
function getSettingBasePath( settingName: string ) {
	// origin付きの設定名は、最後のパスを取り除いて親パスへ揃える.
	if ( getSettingOrigin( settingName ) ) {
		return settingName.split( '.' ).slice( 0, -1 ).join( '.' );
	}
	return settingName;
}

/**
 * WordPressのエディター設定から値を取得する.
 *
 * @param {string} settingName useSettings()の設定名.
 * @return {unknown} エディター設定の値.
 */
function getOriginSettingValue( settingName: string ) {
	const origin = getSettingOrigin( settingName );
	// wp_get_global_settings()由来の設定をパスで取得する.
	const originSetting = getEditorSetting( settingName );
	// origin付きの設定は取得した値をそのまま返す.
	if ( origin ) {
		return originSetting;
	}

	const basePath = getSettingBasePath( settingName );
	// origin別ではない設定は取得した値をそのまま返す.
	if ( ! ORIGIN_OVERRIDE_PATHS.includes( basePath ) ) {
		return originSetting;
	}

	// origin別設定はWordPressと同じ優先順で値を返す.
	for ( const settingOrigin of SETTING_ORIGINS ) {
		if ( hasSettingValue( originSetting?.[ settingOrigin ] ) ) {
			return originSetting[ settingOrigin ];
		}
	}

	return undefined;
}

/**
 * 管理画面用に正規化した設定値を取得する.
 *
 * @param {string} settingName useSettings()の設定名.
 * @return {unknown} 正規化済み設定の値.
 */
function getNormalizedSettingValue( settingName: string ) {
	const basePath = getSettingBasePath( settingName );
	if ( 'typography.fontSizes' !== basePath ) {
		return undefined;
	}

	const origin = getSettingOrigin( settingName );
	if ( origin ) {
		return getEditorFontSizes( origin );
	}

	const fontSizes = getEditorFontSizes() as Partial<
		Record< SettingOrigin, unknown >
	>;
	// origin別設定はWordPressと同じ優先順で値を返す.
	for ( const settingOrigin of SETTING_ORIGINS ) {
		if ( hasSettingValue( fontSizes?.[ settingOrigin ] ) ) {
			return fontSizes[ settingOrigin ];
		}
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
	// defaultの余白サイズを表示対象にする.
	if ( 'spacing.defaultSpacingSizes' === settingName ) {
		return true;
	}

	const basePath = getSettingBasePath( settingName );
	const origin = getSettingOrigin( settingName );
	const fallbackGetter = FALLBACK_SETTING_GETTERS[ basePath ];

	// 既存の管理画面設定で補完できる場合だけ値を返す.
	return fallbackGetter ? fallbackGetter( origin ) : undefined;
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

			// fluidなど、管理画面向けに正規化した値を優先する.
			const normalizedSettingValue =
				getNormalizedSettingValue( settingName );
			if ( hasSettingValue( normalizedSettingValue ) ) {
				return normalizedSettingValue;
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
