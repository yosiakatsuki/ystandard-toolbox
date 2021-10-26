import { BaseControl, ColorPalette } from '@wordpress/components';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const LabelBackgroundColor = ( props ) => {
	const { labelBackgroundColor, setLabelBackgroundColor } = props;
	const { colors } = select( 'core/block-editor' ).getSettings();

	return (
		<BaseControl
			id={ 'label-background-color' }
			label={ __( '背景色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				colors={ colors }
				disableCustomColors={ false }
				onChange={ ( color ) => {
					setLabelBackgroundColor( color );
				} }
				value={ labelBackgroundColor.color }
			/>
		</BaseControl>
	);
};

export default LabelBackgroundColor;
