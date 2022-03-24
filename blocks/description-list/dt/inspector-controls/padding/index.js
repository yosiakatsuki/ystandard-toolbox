import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsivePaddingControl from '@ystdtb/controls/responsive-padding-control';

const PanelPadding = ( props ) => {
	const { attributes, setAttributes } = props;

	return (
		<PanelBody
			title={ __( '余白', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<ResponsivePaddingControl
				values={ attributes.padding }
				onChange={ ( newValue ) => {
					setAttributes( { padding: newValue } );
				} }
			/>
		</PanelBody>
	);
};
export default PanelPadding;
