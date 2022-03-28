import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsivePaddingControl from '@ystd/controls/responsive-padding-control';
import ResponsiveMarginControl from "@ystd/controls/responsive-margin-control";

const PanelPadding = ( props ) => {
	const { attributes, setAttributes } = props;

	return (
		<PanelBody
			title={ __( '余白', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<ResponsiveMarginControl
				values={ attributes.margin }
				onChange={ ( newValue ) => {
					setAttributes( { margin: newValue } );
				} }
			/>
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
