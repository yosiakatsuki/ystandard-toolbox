import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveMarginControl from '@aktk/controls/responsive-margin-control';
import ResponsivePaddingControl from '@aktk/controls/responsive-padding-control';

const PanelMargin = ( { attributes, setAttributes } ) => {
	const { margin, padding } = attributes;
	const handleMarginOnChange = ( newValue ) => {
		setAttributes( {
			margin: newValue,
		} );
	};
	const handlePaddingOnChange = ( value ) => {
		setAttributes( {
			padding: value,
		} );
	};
	return (
		<PanelBody title={ __( '余白', 'ystandard-blocks' ) }>
			<ResponsiveMarginControl
				label={ __( '外側余白(margin)', 'ystandard-blocks' ) }
				onChange={ handleMarginOnChange }
				values={ margin }
			/>
			<ResponsivePaddingControl
				label={ __( '内側余白(padding)', 'ystandard-blocks' ) }
				values={ padding }
				onChange={ handlePaddingOnChange }
			/>
		</PanelBody>
	);
};
export default PanelMargin;
