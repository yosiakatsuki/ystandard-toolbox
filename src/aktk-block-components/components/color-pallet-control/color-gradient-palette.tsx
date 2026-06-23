/**
 * WordPress Dependencies.
 */
import {
	// @ts-ignore
	__experimentalColorGradientControl as WPColorGradientControl,
} from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';

/**
 * Aktk Dependencies
 */
import ColorDropdownWrapper from '@aktk/block-components/components/color-pallet-control/color-dropdown-wrapper';
import useThemeColors from '@aktk/block-components/hooks/useThemeColors';
import useThemeGradients from '@aktk/block-components/hooks/useThemeGradient';

interface ColorGradientPaletteProps {
	label: string;
	colorValue?: string;
	colorSlug?: string;
	onColorChange: ( newColor?: string, slug?: string ) => void;
	colors?: string[];
	gradientValue?: string;
	onGradientChange: ( value: string ) => void;
	gradients?: string[];
	enableCurrentColor?: boolean;
	enableTransparent?: boolean;
}

/**
 * カラーパレット（グラデーション対応）
 *
 * @param props
 */
export function ColorGradientPalette(
	props: ColorGradientPaletteProps
): JSX.Element {
	const {
		label,
		colorValue,
		colorSlug,
		onColorChange,
		colors,
		gradientValue,
		onGradientChange,
		gradients,
		enableCurrentColor,
		enableTransparent,
	} = props;
	// 色設定を取得
	const themeColors = useThemeColors( {
		enableCurrentColor,
		enableTransparent,
	} );
	const themeGradients = useThemeGradients();

	// 全てのカラーをフラット化して取得.
	const allColors = useMemo( () => {
		return themeColors.flatMap( ( palette ) => palette.colors );
	}, [ themeColors ] );

	// スラッグから色コードを取得.
	const getColorBySlug = ( _colorSlug?: string ) => {
		if ( ! _colorSlug ) {
			return undefined;
		}
		const foundColor = allColors.find(
			( color ) => color.slug === _colorSlug
		);
		return foundColor?.color;
	};

	// 色変更時のハンドラー.
	const handleOnColorChange = ( newColor?: string ) => {
		// 色コードからスラッグを取得
		const foundColor = allColors.find(
			( color ) => color.color === newColor
		);
		const _colorSlug = foundColor?.slug;

		onColorChange( newColor, _colorSlug );
	};

	// ラベル用色を取得.
	const _colorValue = getColorBySlug( colorSlug ) || colorValue;

	// カラーパレットの設定
	const paletteColors = colors || themeColors;
	const paletteGradients = gradients || themeGradients;
	return (
		<>
			<ColorDropdownWrapper
				colorValue={ _colorValue || gradientValue }
				label={ label }
			>
				<WPColorGradientControl
					colors={ paletteColors }
					colorValue={ _colorValue }
					onColorChange={ handleOnColorChange }
					gradients={ paletteGradients }
					gradientValue={ gradientValue }
					onGradientChange={ onGradientChange }
					disableCustomGradients={ false }
					disableCustomColors={ false }
				/>
			</ColorDropdownWrapper>
		</>
	);
}
