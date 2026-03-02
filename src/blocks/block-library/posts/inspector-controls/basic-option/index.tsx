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
import { Count } from './count';
import { OrderBy } from './orderby';

export function BasicOption( props: PostsEditProps ) {
	return (
		<Panel title={ __( '基本設定', 'ystandard-toolbox' ) }>
			<Count { ...props } />
			<OrderBy { ...props } />
		</Panel>
	);
}
