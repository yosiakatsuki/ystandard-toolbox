/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import PostId from './post-id';
import PostName from './post-name';
import PostParent from './post-parent';

const AdvancedSearch = ( props ) => {
	return (
		<PanelBody
			initialOpen={ false }
			title={ __( '高度な絞り込み', 'ystandard-toolbox' ) }
		>
			<PostId { ...props } />
			<PostName { ...props } />
			<PostParent { ...props } />
		</PanelBody>
	);
};
export default AdvancedSearch;
