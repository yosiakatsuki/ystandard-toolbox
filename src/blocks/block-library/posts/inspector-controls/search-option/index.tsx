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
import { PostType } from './post-type';
import { Taxonomy } from './taxonomy';
import { Term } from './term';

export function SearchOption( props: PostsEditProps ) {
	return (
		<Panel title={ __( '絞り込み', 'ystandard-toolbox' ) }>
			<PostType { ...props } />
			<Taxonomy { ...props } />
			<Term { ...props } />
		</Panel>
	);
}
