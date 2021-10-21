import {
	BaseControl,
	ColorPalette,
} from '@wordpress/components';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';


const LabelTextColor = ( props ) => {
	const {
		labelTextColor,
		setLabelTextColor,
	} = props;
	const { colors } = select( 'core/block-editor' ).getSettings();

	return (
		<BaseControl
			id={ 'label-text-color' }
			label={ __( '文字色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				colors={ colors }
				disableCustomColors={ false }
				onChange={ ( color ) => {
					setLabelTextColor( color );
				} }
				value={ labelTextColor.color }
			/>
		</BaseControl>
	);
}

export default LabelTextColor;
