import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Effect from "./effect";

const Basic = ( props ) => {

	return (
		<PanelBody title={ __( '基本設定', 'ystandard-toolbox' ) }>
			<Effect {...props} />
		</PanelBody>
	);
}
export default Basic;
