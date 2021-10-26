import { BaseControl, ColorPalette } from '@wordpress/components';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const BoxBorderColor = ( props ) => {
	const { boxBorderColor, setBoxBorderColor } = props;
	const { colors } = select( 'core/block-editor' ).getSettings();

	return (
		<BaseControl
			id={ 'box-border-color' }
			label={ __( '枠線色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				colors={ colors }
				disableCustomColors={ false }
				onChange={ ( color ) => {
					setBoxBorderColor( color );
				} }
				value={ boxBorderColor.color }
			/>
		</BaseControl>
	);
};

export default BoxBorderColor;
