/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import {
	ResponsiveSpacingPanel,
	type ResponsiveGap,
} from '@aktk/block-components/components/responsive-spacing-panel';
import { stripUndefined } from '@aktk/block-components/utils/object';

/* Plugin Dependencies */
import { PanelIcon } from '@aktk/components/ystandard-icon';
import type { StickyColumnsEditProps } from '../../../types';

/**
 * 追従カラムの端末別間隔を親のスタイルタブで編集する。
 * @param props 親ブロックの属性と更新関数。
 */
export function ResponsiveSpacing( props: StickyColumnsEditProps ) {
	const {
		attributes: { style },
		setAttributes,
		clientId,
	} = props;
	const columns = style?.ystdtb?.stickyColumns;
	// 通常の間隔と追従位置を保持し、この親の端末別間隔だけを更新する。
	const onChange = ( blockGap?: ResponsiveGap ) =>
		setAttributes( {
			style: stripUndefined( {
				...style,
				ystdtb: {
					...style?.ystdtb,
					stickyColumns: {
						...columns,
						responsive: { ...columns?.responsive, blockGap },
					},
				},
			} ) as typeof style,
		} );
	return (
		<ResponsiveSpacingPanel
			panelId={ clientId + '-responsive-spacing' }
			title={ __( 'レスポンシブ余白', 'ystandard-toolbox' ) }
			gapLabel={ __( 'カラムの間隔', 'ystandard-toolbox' ) }
			icon={ <PanelIcon /> }
			value={ columns?.responsive?.blockGap }
			onChange={ onChange }
		/>
	);
}
