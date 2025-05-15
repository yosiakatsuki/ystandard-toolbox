import { BaseControl, ColorPalette } from '@wordpress/components';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const BoxTextColor = ( props ) => {
	const { colors } = select( 'core/block-editor' ).getSettings();
	const { boxTextColor, setBoxTextColor } = props;

	return (
		<BaseControl
			id={ 'box-text-color' }
			label={ __( 'ボックス文字色', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<ColorPalette
				colors={ colors }
				disableCustomColors={ false }
				onChange={ ( color ) => {
					setBoxTextColor( color );
				} }
				value={ boxTextColor.color }
			/>
		</BaseControl>
	);
};

export default BoxTextColor;
