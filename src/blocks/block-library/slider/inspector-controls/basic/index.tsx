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
import { Effect } from './effect';
import { Speed } from './speed';
import { Loop } from './loop';
import { SlideFunction } from './slide-function';

export function Basic( props: SliderEditProps ): JSX.Element {
	return (
		<Panel title={ __( '基本設定', 'ystandard-toolbox' ) }>
			<Effect { ...props } />
			<Speed { ...props } />
			<Loop { ...props } />
			<SlideFunction { ...props } />
		</Panel>
	);
}
