import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveWidthControl from '@aktk/controls/responsive-width-control';

const PanelSize = ( props ) => {
	const { attributes, setAttributes } = props;

	const { dtWidth } = attributes;

	const dtWidthOnChange = ( value ) => {
		setAttributes( { dtWidth: value } );
	};

	return (
		<PanelBody
			title={ __( 'サイズ', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<ResponsiveWidthControl
				values={ dtWidth }
				label={ __( '用語(dt)の幅', 'ystandard-toolbox' ) }
				onChange={ dtWidthOnChange }
			/>
		</PanelBody>
	);
};
export default PanelSize;
