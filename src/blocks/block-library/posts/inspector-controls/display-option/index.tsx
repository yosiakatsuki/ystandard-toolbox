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
import { Columns } from './columns';
import { LayoutDesign } from './layout-design';

export function DisplayOption( props: PostsEditProps ) {
	return (
		<Panel title={ __( '表示設定', 'ystandard-toolbox' ) }>
			<LayoutDesign { ...props } />
			<Columns { ...props } />
		</Panel>
	);
}
