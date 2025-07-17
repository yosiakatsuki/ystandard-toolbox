/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

const BackgroundColor = ( props ) => {
	const { backgroundColor, setBackgroundColor } = props;
	return (
		<BaseControl
			id="banner-background-color"
			label={ __( '背景色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '背景色', 'ystandard-toolbox' ) }
				value={ backgroundColor.color }
				onChange={ setBackgroundColor }
				enableCurrentColor={ true }
				enableTransparent={ true }
			/>
		</BaseControl>
	);
};
export default BackgroundColor;
