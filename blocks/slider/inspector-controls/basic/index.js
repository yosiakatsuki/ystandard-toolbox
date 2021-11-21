import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Effect from './effect';
import Speed from './speed';
import Loop from './loop';

const PanelBasic = ( props ) => {
	return (
		<PanelBody title={ __( '基本設定', 'ystandard-toolbox' ) }>
			<Effect { ...props } />
			<Speed { ...props } />
			<Loop { ...props } />
		</PanelBody>
	);
};
export default PanelBasic;
