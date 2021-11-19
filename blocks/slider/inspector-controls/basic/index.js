import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Effect from "./effect";
import Speed from "./speed";

const Basic = ( props ) => {

	return (
		<PanelBody title={ __( '基本設定', 'ystandard-toolbox' ) }>
			<Effect {...props} />
			<Speed {...props} />
		</PanelBody>
	);
}
export default Basic;
