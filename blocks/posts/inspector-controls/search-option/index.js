/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import PostType from './post-type';
import Taxonomy from './taxonomy';
import Term from './term';

const PanelSearchOption = ( props ) => {
	return (
		<PanelBody
			initialOpen={ false }
			title={ __( '絞り込み設定', 'ystandard-toolbox' ) }
		>
			<PostType { ...props } />
			<Taxonomy { ...props } />
			<Term { ...props } />
		</PanelBody>
	);
};
export default PanelSearchOption;
