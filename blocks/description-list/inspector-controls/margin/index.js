import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveMarginControl from '@ystdtb/controls/responsive-margin-control';

const PanelMargin = ( props ) => {
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
		</PanelBody>
	);
};
export default PanelMargin;
