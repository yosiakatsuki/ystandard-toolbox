import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BorderControl from '@ystd/controls/border-control';

const PanelBorder = ( props ) => {
	const { attributes, setAttributes } = props;

	const { border } = attributes;

	const borderOnChange = ( value ) => {
		setAttributes( { border: value } );
	};

	return (
		<PanelBody
			title={ __( '枠線', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<BorderControl value={ border } onChange={ borderOnChange } />
		</PanelBody>
	);
};
export default PanelBorder;
