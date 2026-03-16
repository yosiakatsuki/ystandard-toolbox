/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';

export function AdvancedSearch( props: PostsEditProps ) {
	return (
		<Panel
			title={ __( '高度な絞り込み', 'ystandard-toolbox' ) }
			initialOpen={ false }
		>
			<></>
		</Panel>
	);
}
