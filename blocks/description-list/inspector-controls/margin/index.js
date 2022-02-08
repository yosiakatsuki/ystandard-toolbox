import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Margin from './margin';

const PanelMargin = ( props ) => {
	return (
		<PanelBody
			title={ __( '余白', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<Margin { ...props } />
		</PanelBody>
	);
};
export default PanelMargin;
