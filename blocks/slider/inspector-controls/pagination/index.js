import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Pagination from "./pagination";

const PanelPagination = ( props ) => {

	return (
		<PanelBody
			title={ __( 'ページネーション設定', 'ystandard-toolbox' ) }
			initialOpen={ false }
		>
			<Pagination { ...props } />
		</PanelBody>
	);
};
export default PanelPagination;
