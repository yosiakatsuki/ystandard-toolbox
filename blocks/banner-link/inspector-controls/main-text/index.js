import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import FontSize from "./font-size";

const PanelMainText = ( props ) => {
	return (
		<PanelBody
			title={ __( 'テキスト（上段）', 'ystandard-toolbox' ) }
		>
			<FontSize { ...props } />
		</PanelBody>
	);
}
export default PanelMainText;
