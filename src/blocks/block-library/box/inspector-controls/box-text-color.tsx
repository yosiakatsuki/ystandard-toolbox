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
import { BoxEditProps } from '../types';

interface BoxTextColorProps {
	boxTextColor: BoxEditProps['boxTextColor'];
	setBoxTextColor: BoxEditProps['setBoxTextColor'];
}

/**
 * ボックス文字色コントロール
 */
const BoxTextColor = ( props: BoxTextColorProps ) => {
	const { boxTextColor, setBoxTextColor } = props;

	return (
		<ColorPalette
			label={ __( 'ボックス文字色', 'ystandard-toolbox' ) }
			value={ boxTextColor.color || '' }
			onChange={ ( color ) => {
				setBoxTextColor( color );
			} }
			enableCurrentColor={ true }
			enableTransparent={ true }
		/>
	);
};

export default BoxTextColor;
