import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import FontSize from "./font-size";
import TextColor from "./text-color";


const PanelText = ( props ) => {
	return (
		<PanelBody
			title={ __( 'テキスト', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<FontSize { ...props } />
			<TextColor { ...props } />
		</PanelBody>
	);
};
export default PanelText;
