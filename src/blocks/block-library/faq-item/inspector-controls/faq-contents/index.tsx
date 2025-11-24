/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';

/**
 * Plugin Dependencies
 */
import { ContentsColor } from './contents-color';
import { ContentsBackgroundColor } from './contents-background-color';
import { ContentsBorder } from './contents-border';

// @ts-ignore.
export function FaqContents( props ): JSX.Element {
	return (
		<Panel title={ __( 'FAQコンテンツ設定', 'ystandard-toolbox' ) }>
			<ContentsColor { ...props } />
			<ContentsBackgroundColor { ...props } />
			<ContentsBorder { ...props } />
		</Panel>
	);
}
