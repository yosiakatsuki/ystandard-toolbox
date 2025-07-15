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

interface BoxBackgroundColorProps {
	boxBackgroundColor: BoxEditProps['boxBackgroundColor'];
	setBoxBackgroundColor: BoxEditProps['setBoxBackgroundColor'];
}

/**
 * ボックス背景色コントロール
 */
const BoxBackgroundColor = ( props: BoxBackgroundColorProps ) => {
	const { boxBackgroundColor, setBoxBackgroundColor } = props;

	return (
		<ColorPalette
			label={ __( 'ボックス背景色', 'ystandard-toolbox' ) }
			value={ boxBackgroundColor.color || '' }
			onChange={ ( color ) => {
				setBoxBackgroundColor( color );
			} }
			enableCurrentColor={ true }
			enableTransparent={ true }
		/>
	);
};

export default BoxBackgroundColor;
