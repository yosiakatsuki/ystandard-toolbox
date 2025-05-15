/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

type themeColorsOptions = {
	enableCurrentColor?: boolean;
	enableTransparent?: boolean;
};

type ThemeColor = {
	name: string;
	slug: string;
	color: string;
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
 */
const useThemeColors = ( options?: themeColorsOptions ) => {
	const { enableCurrentColor = false, enableTransparent = false } =
		options || {};
	const [ colors, setColors ] = useState< ThemeColor[] >( [] );

	// テーマのカラー設定を取得.
	const themeColors = useSelect( ( select ) => {
		// @ts-ignore
		const settings = select( editorStore )?.getEditorSettings();
		return settings?.colors || [];
	}, [] );

	// テーマのカラー設定をセット.
	useEffect( () => {
		if ( themeColors ) {
			const _themeColors = [
				...themeColors,
				...( enableCurrentColor ? [ CURRENT_COLOR ] : [] ),
				...( enableTransparent ? [ TRANSPARENT ] : [] ),
			];
			setColors( _themeColors );
		}
	}, [ themeColors ] );

	return colors;
};

export default useThemeColors;
