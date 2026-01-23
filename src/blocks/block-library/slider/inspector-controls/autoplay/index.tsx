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
import { EnableAutoplay } from './enable-autoplay';
import { AutoplayDelay } from './autoplay-delay';
import { PauseOnMouse } from './pause-on-mouse';
import { DisableOnInteraction } from './disable-on-Interaction';
import { ReverseDirection } from './reverse-direction';

export function Autoplay( props: SliderEditProps ): JSX.Element {
	return (
		<Panel title={ __( '自動再生(autoplay)', 'ystandard-toolbox' ) }>
			<EnableAutoplay { ...props } />
			<AutoplayDelay { ...props } />
			<PauseOnMouse { ...props } />
			<DisableOnInteraction { ...props } />
			<ReverseDirection { ...props } />
		</Panel>
	);
}
