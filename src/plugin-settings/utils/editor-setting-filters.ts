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
import { getEditorFontFamilies, getEditorSpacingSizes } from './config';

type FontFamiliesOrigin = 'default' | 'theme' | 'custom';

const FONT_FAMILIES_SETTING_NAMES: Partial<
	Record< string, FontFamiliesOrigin >
> = {
	'typography.fontFamilies.default': 'default',
	'typography.fontFamilies.theme': 'theme',
	'typography.fontFamilies.custom': 'custom',
};

/**
 * エディター設定をuseSetting向けに注入するフィルターを登録.
 *
 * @param {string} namespace フィルターの名前空間.
 */
export function registerEditorSettingFilters( namespace: string ) {
	addFilter(
		'blockEditor.useSetting.before',
		`${ namespace }/editorSettings`,
		( settingValue: unknown, settingName: string ) => {
			if ( settingValue ) {
				return settingValue;
			}

			const fontFamiliesOrigin =
				FONT_FAMILIES_SETTING_NAMES[ settingName ];
			if ( fontFamiliesOrigin ) {
				return getEditorFontFamilies( fontFamiliesOrigin );
			}

			if ( 'spacing.spacingSizes.theme' === settingName ) {
				const editorSpacingSizes = getEditorSpacingSizes();
				const themeSizes = Array.isArray( editorSpacingSizes )
					? editorSpacingSizes
					: [];
				return [ ...themeSizes, ...getDefaultSpacingSizes() ];
			}

			return settingValue;
		}
	);
}
