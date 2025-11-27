import { ColorPalette as WPColorPalette } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import type {
	ColorObject,
	PaletteObject,
} from '@wordpress/components/src/color-palette/types';
/**
 * Aktk Dependencies
 */
import ColorDropdownWrapper from '@aktk/block-components/components/color-pallet-control/color-dropdown-wrapper';
import useThemeColors from '@aktk/block-components/hooks/useThemeColors';

import './editor-color-palette.scss';

interface ColorPaletteProps {
	label: string;
	value: string;
	slug?: string;
	onChange: ( newColor?: string, slug?: string ) => void;
	colors?: PaletteObject[] | ColorObject[];
	enableCurrentColor?: boolean;
	enableTransparent?: boolean;
}

/**
 * カラーパレット（設定画面用。エディター側はWP提供のコントロールを使おう）
 * @param props
 */
export function ColorPalette( props: ColorPaletteProps ): React.ReactElement {
	const {
		label,
		value,
		slug,
		onChange,
		colors,
		enableCurrentColor,
		enableTransparent,
	} = props;

	// テーマカラーを取得.
	const themeColors = useThemeColors( {
		enableCurrentColor,
		enableTransparent,
	} );

	// 全てのカラーをフラット化して取得.
	const allColors = useMemo( () => {
		return themeColors.flatMap( ( palette ) => palette.colors );
	}, [ themeColors ] );

	// スラッグから色コードを取得.
	const getColorBySlug = ( colorSlug?: string ) => {
		if ( ! colorSlug ) {
			return undefined;
		}
		const foundColor = allColors.find(
			( color ) => color.slug === colorSlug
		);
		return foundColor?.color;
	};

	// 色変更時のハンドラー.
	const handleOnChange = ( newColor?: string ) => {
		// 色コードからスラッグを取得
		const foundColor = allColors.find(
			( color ) => color.color === newColor
		);
		const colorSlug = foundColor?.slug;

		onChange( newColor, colorSlug );
	};

	const _value = getColorBySlug( slug ) || value;

	return (
		<>
			<ColorDropdownWrapper colorValue={ _value } label={ label }>
				{ /* @ts-ignore */ }
				<WPColorPalette
					className="aktk-components__color-palette-control"
					value={ _value }
					onChange={ handleOnChange }
					disableCustomColors={ false }
					colors={ colors || themeColors }
				/>
			</ColorDropdownWrapper>
		</>
	);
}
