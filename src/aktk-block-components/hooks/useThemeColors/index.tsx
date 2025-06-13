/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
// @ts-ignore
import { useSettings } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { applyFilters } from '@wordpress/hooks';

type themeColorsOptions = {
	enableCurrentColor?: boolean;
	enableTransparent?: boolean;
};

const CURRENT_COLOR = {
	name: 'currentColor',
	slug: 'currentColor',
	color: 'currentColor',
};

const TRANSPARENT = {
	name: 'transparent',
	slug: 'transparent',
	color: 'transparent',
};

/**
 * テーマのカラー設定を取得する（設定画面用）
 * @param options
 */
const useThemeColors = ( options?: themeColorsOptions ) => {
	const { enableCurrentColor = false, enableTransparent = false } =
		options || {};

	// 設定から色情報を取得.
	const [ defaultColors, themeColors, customColors, enableDefaultColors ] =
		useSettings(
			'color.palette.default',
			'color.palette.theme',
			'color.palette.custom',
			'color.defaultPalette'
		);

	// フィルターを適用してテーマカラーを取得.
	const hookThemeColors = applyFilters(
		'aktk.hooks.getThemeColors.themeColors',
		[]
	) as Array< {
		name: string;
		slug: string;
		color: string;
	} >;

	// useSelectから色情報を取得(主に設定画面用).
	const dataColors = useSelect( ( select ) => {
		// @ts-ignore
		const settings = select( editorStore )?.getEditorSettings();
		// @ts-ignore
		return settings?.colors || [];
	}, [] );

	return useMemo( () => {
		const result = [];
		let _themeColors = [];
		// テーマカラーの取得.
		if ( themeColors && themeColors.length ) {
			_themeColors = themeColors;
		} else if ( hookThemeColors && hookThemeColors.length ) {
			_themeColors = hookThemeColors;
		} else if ( dataColors && dataColors.length ) {
			_themeColors = dataColors;
		}
		// テーマカラーのチェック&追加.
		if ( _themeColors && _themeColors.length ) {
			console.log( { _themeColors } );
			result.push( {
				name: _x( 'テーマ', 'useThemeColors', 'ystandard-blocks' ),
				colors: [
					..._themeColors,
					...( enableCurrentColor ? [ CURRENT_COLOR ] : [] ),
					...( enableTransparent ? [ TRANSPARENT ] : [] ),
				],
			} );
		}
		if ( enableDefaultColors && defaultColors && defaultColors.length ) {
			result.push( {
				name: _x( 'デフォルト', 'useThemeColors', 'ystandard-blocks' ),
				colors: defaultColors,
			} );
		}
		if ( customColors && customColors.length ) {
			result.push( {
				name: _x( 'カスタム', 'useThemeColors', 'ystandard-blocks' ),
				colors: customColors,
			} );
		}
		return result;
	}, [
		customColors,
		themeColors,
		defaultColors,
		enableDefaultColors,
		dataColors,
	] );
};

export default useThemeColors;
