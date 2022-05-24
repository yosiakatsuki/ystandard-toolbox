/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import Count from './count';
import Orderby from './orderby';

const PanelBasicOption = ( props ) => {
	return (
		<PanelBody title={ __( '基本設定', 'ystandard-toolbox' ) }>
			<Count { ...props } />
			<Orderby { ...props } />
		</PanelBody>
	);
};
export default PanelBasicOption;
