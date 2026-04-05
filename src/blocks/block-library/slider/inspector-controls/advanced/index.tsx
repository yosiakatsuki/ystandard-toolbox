/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { NoticeWarning } from '@aktk/block-components/components/notice';

/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../../types';
import { SliderId } from './slider-id';

// 設定.

export function Advanced( props: SliderEditProps ): JSX.Element {
	return (
		<Panel title={ __( '上級者向け設定', 'ystandard-toolbox' ) }>
			<BaseControl>
				<NoticeWarning>
					{ __(
						'この設定は上級者向け設定です。CSSスタマイズ等、ブロックの設定以外のカスタマイズを前提とした設定になります。この設定項目の使い方などについてはサポート対象外となります。',
						'ystandard-toolbox'
					) }
				</NoticeWarning>
			</BaseControl>
			<SliderId { ...props } />
		</Panel>
	);
}
