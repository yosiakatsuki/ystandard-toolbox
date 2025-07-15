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

interface LabelTextColorProps {
	labelTextColor: BoxEditProps['labelTextColor'];
	setLabelTextColor: BoxEditProps['setLabelTextColor'];
}

/**
 * ラベル文字色コントロール
 * @param props
 */
const LabelTextColor = ( props: LabelTextColorProps ): React.ReactElement => {
	const { labelTextColor, setLabelTextColor } = props;

	return (
		<ColorPalette
			label={ __( 'ラベル文字色', 'ystandard-toolbox' ) }
			value={ labelTextColor.color || '' }
			onChange={ ( color ) => {
				setLabelTextColor( color );
			} }
			enableCurrentColor={ true }
			enableTransparent={ true }
		/>
	);
};

export default LabelTextColor;
