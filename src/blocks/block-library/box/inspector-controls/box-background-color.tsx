import { BaseControl, ColorPalette } from '@wordpress/components';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const BoxBackgroundColor = ( props ) => {
	const { boxBackgroundColor, setBoxBackgroundColor } = props;
	const { colors } = select( 'core/block-editor' ).getSettings();

	return (
		<BaseControl
			id={ 'box-background-color' }
			label={ __( 'ボックス背景色', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<ColorPalette
				colors={ colors }
				disableCustomColors={ false }
				onChange={ ( color ) => {
					setBoxBackgroundColor( color );
				} }
				value={ boxBackgroundColor.color }
			/>
		</BaseControl>
	);
};

export default BoxBackgroundColor;
