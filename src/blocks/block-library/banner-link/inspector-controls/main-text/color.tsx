/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

const Color = ( { mainTextColor, setMainTextColor } ) => {
	return (
		<BaseControl
			id="main-text-color"
			label={ __( '色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( 'メインテキスト色', 'ystandard-toolbox' ) }
				value={ mainTextColor.color }
				onChange={ setMainTextColor }
				enableCurrentColor={ true }
				enableTransparent={ true }
			/>
		</BaseControl>
	);
};
export default Color;
