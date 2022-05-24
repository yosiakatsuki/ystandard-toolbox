/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import Offset from './offset';

const PanelAdvancedDesign = ( props ) => {
	return (
		<PanelBody
			initialOpen={ false }
			title={ __( '高度な表示設定', 'ystandard-toolbox' ) }
		>
			<Offset { ...props } />
		</PanelBody>
	);
};
export default PanelAdvancedDesign;
