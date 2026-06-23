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
import type { SliderEditProps } from '../../types';
// 設定.
import { PaginationType } from './pagination-type';
import { NavigationColor } from './pagination-color';

export function Pagination( props: SliderEditProps ): JSX.Element {
	return (
		<Panel title={ __( 'ページネーション', 'ystandard-toolbox' ) }>
			<PaginationType { ...props } />
			<NavigationColor { ...props } />
		</Panel>
	);
}
