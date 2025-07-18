/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

const Color = ( { subTextColor, setSubTextColor } ) => {
	return (
		<BaseControl
			id="sub-text-color"
			label={ __( '色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '色', 'ystandard-toolbox' ) }
				value={ subTextColor.color }
				onChange={ setSubTextColor }
				enableCurrentColor={ true }
				enableTransparent={ true }
			/>
		</BaseControl>
	);
};
export default Color;
