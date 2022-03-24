import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveFontSizeControl from '@ystdtb/controls/responsive-font-size-control';
import TextColorControl from '@ystdtb/controls/text-color-control';
import TypographySettingsControl from '@ystdtb/controls/typography-settings-control';

const PanelText = ( props ) => {
	const { attributes, setAttributes, textColor, setTextColor } = props;

	const {
		textSize,
		fontWeight,
		fontStyle,
		lineHeight,
		letterSpacing,
	} = attributes;

	const handleTypographySettingsOnChange = ( newValue ) => {
		setAttributes( {
			fontWeight: newValue?.fontWeight,
			fontStyle: newValue?.fontStyle,
			lineHeight: newValue?.lineHeight,
			letterSpacing: newValue?.letterSpacing,
		} );
	};
	return (
		<PanelBody
			title={ __( 'テキスト', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<ResponsiveFontSizeControl
				values={ textSize }
				onChange={ ( newValue ) => {
					setAttributes( { textSize: newValue } );
				} }
			/>
			<TextColorControl value={ textColor } onChange={ setTextColor } />
			<TypographySettingsControl
				values={ {
					fontWeight,
					fontStyle,
					lineHeight,
					letterSpacing,
				} }
				onChange={ handleTypographySettingsOnChange }
			/>
		</PanelBody>
	);
};
export default PanelText;
