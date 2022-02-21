import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveFontSizeControl from "@ystdtb/controls/responsive-font-size-control";
import TextColorControl from "@ystdtb/controls/text-color-control";


const PanelText = ( props ) => {
	const {
		attributes,
		setAttributes,
		textColor,
		setTextColor
	} = props;

	const { textSize } = attributes;
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
			<TextColorControl
				value={ textColor }
				onChange={ setTextColor }
			/>
		</PanelBody>
	);
};
export default PanelText;
