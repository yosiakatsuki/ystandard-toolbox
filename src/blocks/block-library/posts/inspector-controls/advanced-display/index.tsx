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
import { Offset } from './offset';

export function AdvancedDisplay( props: PostsEditProps ) {
	return (
		<Panel
			title={ __( '高度な表示設定', 'ystandard-toolbox' ) }
			initialOpen={ false }
		>
			<Offset { ...props } />
		</Panel>
	);
}
