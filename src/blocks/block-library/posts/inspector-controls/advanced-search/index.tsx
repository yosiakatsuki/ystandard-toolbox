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
import { PostId } from './post-id';
import { PostName } from './post-name';
import { PostParent } from './post-parent';

export function AdvancedSearch( props: PostsEditProps ) {
	return (
		<Panel
			title={ __( '高度な絞り込み', 'ystandard-toolbox' ) }
			initialOpen={ false }
		>
			<PostId { ...props } />
			<PostName { ...props } />
			<PostParent { ...props } />
		</Panel>
	);
}
