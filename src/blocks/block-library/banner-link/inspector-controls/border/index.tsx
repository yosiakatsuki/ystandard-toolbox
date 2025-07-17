/*
 * WordPress Dependencies
 */
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Border from './border';

const PanelBorder = ( props ) => {
	return (
		<PanelBody
			title={ __( '枠線設定', 'ystandard-toolbox' ) }
			initialOpen={ false }
		>
			<Border { ...props } />
		</PanelBody>
	);
};
export default PanelBorder;
