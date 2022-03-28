import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import TextColorControl from '@ystd/controls/text-color-control';

const PanelText = ( props ) => {
	const { textColor, setTextColor } = props;

	return (
		<PanelBody
			title={ __( 'テキスト', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<TextColorControl value={ textColor } onChange={ setTextColor } />
		</PanelBody>
	);
};
export default PanelText;
