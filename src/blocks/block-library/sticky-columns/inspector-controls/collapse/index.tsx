/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';
import { Panel } from '@aktk/block-components/components/panel';

/* Plugin Dependencies */
import type { StickyColumnsEditProps } from '../../types';
import { CONTAINER_UNITS } from '../../layout';

/**
 * 1列へ戻す条件を選択する。
 * @param props ブロックまたはパネルのプロパティ。
 */
export function Collapse( props: StickyColumnsEditProps ) {
	const { attributes, setAttributes } = props;
	const { collapseAt = 'mobile', containerSize } = attributes;
	// 画面幅へ切り替えたら、使わなくなった任意の境界値も解除する。
	const changeTiming = ( value: string ) => {
		if ( value === 'mobile' || value === 'tablet' ) {
			setAttributes( { collapseAt: value, containerSize: undefined } );
		} else if ( value === 'container' ) {
			setAttributes( { collapseAt: value } );
		}
	};
	return (
		<Panel title={ __( '1列にするタイミング', 'ystandard-toolbox' ) }>
			<BaseControl>
				<CustomSelectControl
					label={ __( '切り替わりタイミング', 'ystandard-toolbox' ) }
					value={ collapseAt }
					onChange={ changeTiming }
					useEmptyValue={ false }
					options={ [
						{
							key: 'mobile',
							name: __( 'モバイル', 'ystandard-toolbox' ),
						},
						{
							key: 'tablet',
							name: __( 'タブレット', 'ystandard-toolbox' ),
						},
						{
							key: 'container',
							name: __( 'コンテナサイズ', 'ystandard-toolbox' ),
						},
					] }
				/>
			</BaseControl>
			{ collapseAt === 'container' && (
				<BaseControl
					help={ __(
						'配置領域が指定した幅以上で2列になります。空欄の間は1列で表示します。',
						'ystandard-toolbox'
					) }
				>
					<UnitControl
						label={ __( 'コンテナサイズ', 'ystandard-toolbox' ) }
						value={ containerSize ?? '' }
						units={ CONTAINER_UNITS }
						min={ 0 }
						step="any"
						onChange={ ( value ) =>
							setAttributes( {
								containerSize: value || undefined,
							} )
						}
					/>
				</BaseControl>
			) }
		</Panel>
	);
}
