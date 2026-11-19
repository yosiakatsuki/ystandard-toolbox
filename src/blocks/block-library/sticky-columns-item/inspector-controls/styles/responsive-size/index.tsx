/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import { ResponsiveSizePanel } from '@aktk/block-components/components/responsive-size-panel';

/* Plugin Dependencies */
import { PanelIcon } from '@aktk/components/ystandard-icon';
import {
	sizeSettings,
	updateDimensions,
	type ColumnItemEditProps,
} from '../../../dimensions';

/**
 * 子カラムで使用する端末別寸法をスタイルタブにまとめる。
 * @param props 子カラムの属性と更新関数。
 */
export function ResponsiveSize( props: ColumnItemEditProps ) {
	const { attributes, clientId, setAttributes } = props;
	const { style } = attributes;
	return (
		<ResponsiveSizePanel
			panelId={ clientId + '-responsive-size' }
			title={ __( 'レスポンシブサイズ', 'ystandard-toolbox' ) }
			icon={ <PanelIcon /> }
			settings={ sizeSettings }
			value={ style?.ystdtb?.stickyColumnsItem?.responsive }
			onChange={ ( changes ) =>
				setAttributes( { style: updateDimensions( style, changes ) } )
			}
		/>
	);
}
