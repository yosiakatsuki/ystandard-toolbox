import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Pagination from "./pagination";
import Color from "./color";

const PanelPagination = ( props ) => {

	return (
		<PanelBody
			title={ __( 'ページネーション設定', 'ystandard-toolbox' ) }
			initialOpen={ false }
		>
			<Pagination { ...props } />
			<Color { ...props } />
		</PanelBody>
	);
};
export default PanelPagination;
