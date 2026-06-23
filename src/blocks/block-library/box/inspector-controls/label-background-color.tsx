/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
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
		<BaseControl
			id="label-background-color"
			label={ __( 'ラベル背景色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( 'ラベル背景色', 'ystandard-toolbox' ) }
				value={ labelBackgroundColor.color || '' }
				onChange={ ( color ) => {
					setLabelBackgroundColor( color );
				} }
				enableCurrentColor={ true }
				enableTransparent={ true }
			/>
		</BaseControl>
	);
};

export default LabelBackgroundColor;
