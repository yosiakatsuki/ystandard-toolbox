// @ts-ignore
import { ColorPaletteControl } from '@wordpress/block-editor';
/**
 * Aktk Dependencies
 */
import ColorDropdownWrapper from '@aktk/block-components/components/color-pallet-control/color-dropdown-wrapper';
import useThemeColors from '@aktk/block-components/hooks/useThemeColors';

interface ColorPaletteProps {
	label: string;
	value: string;
	onChange: ( value: string ) => void;
	colors?: string[];
}

/**
 * カラーパレット（設定画面用。エディター側はWP提供のコントロールを使おう）
 * @param props
 */
export function ColorPalette( props: ColorPaletteProps ) {
	const { label, value, onChange, colors } = props;
	const themeColors = useThemeColors();

	const paletteColors = colors || themeColors;

	return (
		<>
			<ColorDropdownWrapper colorValue={ value } label={ label }>
				<ColorPaletteControl
					value={ value }
					onChange={ onChange }
					disableCustomColors={ false }
					colors={ paletteColors }
				/>
			</ColorDropdownWrapper>
		</>
	);
}
