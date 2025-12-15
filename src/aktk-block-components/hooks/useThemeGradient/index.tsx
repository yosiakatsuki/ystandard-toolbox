/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
// @ts-ignore
import { useSettings } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * テーマのカラー設定を取得する（設定画面用）
 */
const useThemeGradients = () => {
	const [
		customGradients,
		themeGradients,
		defaultGradients,
		shouldDisplayDefaultGradients,
	] = useSettings(
		'color.gradients.custom',
		'color.gradients.theme',
		'color.gradients.default',
		'color.defaultGradients'
	);

	// フィルターを適用してテーマカラーを取得.
	const hookThemeGradients = applyFilters(
		'aktk.hooks.getThemeGradients.themeGradients',
		[]
	) as Array< {
		name: string;
		slug: string;
		color: string;
	} >;

	// useSelectから色情報を取得(主に設定画面用).
	const dataGradients = useSelect( ( select ) => {
		// @ts-ignore
		const settings = select( editorStore )?.getEditorSettings();
		// @ts-ignore
		return settings?.gradients || [];
	}, [] );

	return useMemo( () => {
		const result = [];
		let _themeGradients = [];
		// テーマカラーの取得.
		if ( themeGradients && themeGradients.length ) {
			_themeGradients = themeGradients;
		} else if ( hookThemeGradients && hookThemeGradients.length ) {
			_themeGradients = hookThemeGradients;
		} else if ( dataGradients && dataGradients.length ) {
			_themeGradients = dataGradients;
		}
		if ( _themeGradients && _themeGradients.length ) {
			result.push( {
				name: _x( 'テーマ', 'useThemeGradients', 'ystandard-blocks' ),
				slug: 'theme',
				gradients: _themeGradients,
			} );
		} else if ( dataGradients && dataGradients.length ) {
			result.push( {
				name: _x( 'テーマ', 'useThemeGradients', 'ystandard-blocks' ),
				slug: 'theme',
				gradients: dataGradients,
			} );
		}
		if (
			shouldDisplayDefaultGradients &&
			defaultGradients &&
			defaultGradients.length
		) {
			result.push( {
				name: _x(
					'デフォルト',
					'useThemeGradients',
					'ystandard-blocks'
				),
				slug: 'default',
				gradients: defaultGradients,
			} );
		}
		if ( customGradients && customGradients.length ) {
			result.push( {
				name: _x( 'カスタム', 'useThemeGradients', 'ystandard-blocks' ),
				slug: 'custom',
				gradients: customGradients,
			} );
		}
		return result;
	}, [
		customGradients,
		themeGradients,
		defaultGradients,
		shouldDisplayDefaultGradients,
		dataGradients,
	] );
};

export default useThemeGradients;
