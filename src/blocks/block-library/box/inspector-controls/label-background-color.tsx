/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

/*
 * Plugin Dependencies
 */
import type { BoxEditProps } from '../types';

interface LabelBackgroundColorProps {
	labelBackgroundColor: BoxEditProps['labelBackgroundColor'];
	setLabelBackgroundColor: BoxEditProps['setLabelBackgroundColor'];
}

/**
 * ラベル背景色コントロール
 * @param props
 */
const LabelBackgroundColor = ( props: LabelBackgroundColorProps ): React.ReactElement => {
	const { labelBackgroundColor, setLabelBackgroundColor } = props;

	return (
		<ColorPalette
			label={ __( 'ラベル背景色', 'ystandard-toolbox' ) }
			value={ labelBackgroundColor.color || '' }
			onChange={ ( color ) => {
				setLabelBackgroundColor( color );
			} }
			enableCurrentColor={ true }
			enableTransparent={ true }
		/>
	);
};

export default LabelBackgroundColor;
