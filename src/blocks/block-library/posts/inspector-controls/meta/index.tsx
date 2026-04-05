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
import { Date } from './date';
import { Category } from './category';
import { Excerpt } from './excerpt';
import { ExcerptLines } from './excerpt-lines';

export function Meta( props: PostsEditProps ) {
	return (
		<Panel title={ __( '日付・カテゴリー・概要', 'ystandard-toolbox' ) }>
			<Date { ...props } />
			<Category { ...props } />
			<Excerpt { ...props } />
			<ExcerptLines { ...props } />
		</Panel>
	);
}
