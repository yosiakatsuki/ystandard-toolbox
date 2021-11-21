import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import HasNavigation from "./has-navigation";

const PanelNavigation = ( props ) => {

	return (
		<PanelBody
			title={ __( '矢印(ナビゲーション)設定', 'ystandard-toolbox' ) }
			initialOpen={ false }
		>
			<HasNavigation { ...props } />
		</PanelBody>
	);
};
export default PanelNavigation;
