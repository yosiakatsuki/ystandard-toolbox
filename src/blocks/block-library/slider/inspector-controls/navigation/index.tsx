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
import { HasNavigation } from './has-navigation';
import { NavigationColor } from './navigation-color';

export function Navigation( props: SliderEditProps ): JSX.Element {
	return (
		<Panel title={ __( '矢印（ナビゲーション）', 'ystandard-toolbox' ) }>
			<HasNavigation { ...props } />
			<NavigationColor { ...props } />
		</Panel>
	);
}
