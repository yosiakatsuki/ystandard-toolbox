/**
 * WordPress dependencies
 */
// @ts-ignore
import { useSettings } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * テーマのフォントサイズ設定を取得する（設定画面用）
 */
const useThemeFontSizes = () => {
	// useSettingsから文字サイズ情報を取得.
	const [
		defaultFontSizes,
		themeFontSizes,
	] = useSettings(
		'typography.fontSizes.default',
		'typography.fontSizes.theme',
	);

	// フィルター経由のフォールバック（プラグイン設定画面など editor store が無い環境用）.
	const hookFontSizes = applyFilters(
		'aktk.hooks.getThemeFontSizes.themeFontSizes',
		[]
	) as Array< { name: string; slug: string; size: number | string } >;

	return useMemo( () => {
		if ( themeFontSizes && themeFontSizes.length ) {
			return themeFontSizes;
		}
		if ( Array.isArray( hookFontSizes ) && hookFontSizes.length ) {
			return hookFontSizes;
		}
		return defaultFontSizes || [];
	}, [ themeFontSizes, hookFontSizes, defaultFontSizes ] );
};

export default useThemeFontSizes;
