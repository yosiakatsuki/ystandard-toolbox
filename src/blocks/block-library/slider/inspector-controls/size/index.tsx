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
import { AspectRatio } from './aspect-ratio';
import { Height } from './height';

export function Size( props: SliderEditProps ): JSX.Element {
	return (
		<Panel title={ __( 'サイズ', 'ystandard-toolbox' ) }>
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
