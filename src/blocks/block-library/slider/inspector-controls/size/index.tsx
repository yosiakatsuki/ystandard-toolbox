/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
import { NoticeSecondary } from '@aktk/block-components/components/notice';
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../../types';
// 設定.
import { AspectRatio } from '@aktk/blocks/block-library/slider/inspector-controls/size/aspect-ratio';
import { Height } from '@aktk/blocks/block-library/slider/inspector-controls/size/height';

export function Size( props: SliderEditProps ): JSX.Element {
	return (
		<Panel title={ __( 'サイズ設定', 'ystandard-toolbox' ) }>
			<BaseControl>
				<NoticeSecondary>
					{ __(
						'※スライダー全体のサイズ設定です。個々のスライドのサイズ指定ではありません。',
						'ystandard-toolbox'
					) }
				</NoticeSecondary>
			</BaseControl>
			<AspectRatio { ...props } />
			<Height { ...props } />
		</Panel>
	);
}
