/**
 * WordPress dependencies
 */
import { useEffect, useState, useMemo } from '@wordpress/element';
// @ts-ignore
import { useSettings } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

/**
 * テーマのカラー設定を取得する（設定画面用）
 */
const useThemeGradients = () => {
	const [ gradients, setGradients ] = useState( [] );
	// 設定から取得.
	const [
		userGradientPalette,
		themeGradientPalette,
		defaultGradientPalette,
	] = useSettings(
		'color.gradients.custom',
		'color.gradients.theme',
		'color.gradients.default'
	);

	// useSelectから色情報を取得(主に設定画面用).
	const dataGradients = useSelect( ( select ) => {
		// @ts-ignore
		const settings = select( editorStore )?.getEditorSettings();
		// @ts-ignore
		return settings?.gradients || [];
	}, [] );

	const allGradients = useMemo(
		() => [
			...( userGradientPalette || [] ),
			...( themeGradientPalette || dataGradients || [] ),
			...( defaultGradientPalette || [] ),
		],
		[
			userGradientPalette,
			themeGradientPalette,
			defaultGradientPalette,
			dataGradients,
		]
	);
	useEffect( () => {
		if ( allGradients ) {
			// @ts-ignore
			setGradients( allGradients );
		}
	}, [ allGradients ] );

	return gradients;
};

export default useThemeGradients;
