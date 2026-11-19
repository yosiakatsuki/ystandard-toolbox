/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
import { stripUndefined } from '@aktk/block-components/utils/object';

/* Plugin Dependencies */
import type {
	StickyColumnsEditProps,
	StickyColumnsAttributes,
} from '../../types';

const units = [ 'px', 'em', 'rem' ].map( ( value ) => ( {
	value,
	label: value,
} ) );

/**
 * 親ブロックの追従位置だけをスタイル属性に保存する。
 * @param props 親のスタイル属性と更新関数。
 */
export function StickyOffset( props: StickyColumnsEditProps ) {
	const { attributes, setAttributes } = props;
	const { style } = attributes;
	const columns = style?.ystdtb?.stickyColumns;
	// ほかの装飾を保ったまま、空になった階層を取り除く。
	const onChange = ( stickyOffset?: string ) =>
		setAttributes( {
			style: stripUndefined( {
				...style,
				ystdtb: {
					...style?.ystdtb,
					stickyColumns: {
						...columns,
						stickyOffset: stickyOffset || undefined,
					},
				},
			} ) as StickyColumnsAttributes[ 'style' ],
		} );
	return (
		<BaseControl
			help={ __(
				'固定ヘッダーがある場合は、その高さを目安に指定します。',
				'ystandard-toolbox'
			) }
		>
			<UnitControl
				label={ __( '画面上端からの距離', 'ystandard-toolbox' ) }
				value={ columns?.stickyOffset ?? '1rem' }
				units={ units }
				min={ 0 }
				step="any"
				onChange={ onChange }
			/>
		</BaseControl>
	);
}
