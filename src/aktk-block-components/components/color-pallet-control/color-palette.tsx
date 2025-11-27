import { ColorPalette as WPColorPalette } from '@wordpress/components';
import {
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
		onChange,
		colors,
		enableCurrentColor,
		enableTransparent,
	} = props;

	const themeColors = useThemeColors( {
		enableCurrentColor,
		enableTransparent,
	} );

	const handleOnChange = ( newColor?: string ) => {
		// 色コードからスラッグを取得
		let colorSlug: string | undefined;

		if ( newColor ) {
			// 全ての色パレットから該当する色を検索
			for ( const palette of themeColors ) {
				const foundColor = palette.colors.find(
					( color: ColorObject ) => color.color === newColor
				);
				if ( foundColor ) {
					colorSlug = foundColor.slug;
					break;
				}
			}
		}

		onChange( newColor, colorSlug );
	};

	return (
		<>
			<ColorDropdownWrapper colorValue={ value } label={ label }>
				{ /* @ts-ignore */ }
				<WPColorPalette
					className="aktk-components__color-palette-control"
					value={ value }
					onChange={ handleOnChange }
					disableCustomColors={ false }
					colors={ colors || themeColors }
				/>
			</ColorDropdownWrapper>
		</>
	);
}
