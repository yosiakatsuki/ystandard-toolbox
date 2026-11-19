/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

/* Plugin Dependencies */
import type { StickyColumnsEditProps } from '../../types';

/**
 * 追従するカラムだけを変更する。
 * @param props 親ブロックの編集プロパティ。
 */
export function StickyColumn( props: StickyColumnsEditProps ) {
	const { attributes, setAttributes } = props;

	// 表示順や装飾を維持し、追従対象の属性だけを更新する。
	const handleOnChange = ( value: string ) => {
		// 選択肢にない値は、追従対象として保存しない。
		if ( value === 'none' || value === 'first' || value === 'second' ) {
			setAttributes( { stickyColumn: value } );
		}
	};

	return (
		<BaseControl
			help={ __( '1列のときは追従しません。', 'ystandard-toolbox' ) }
		>
			<CustomSelectControl
				label={ __( '追従させるカラム', 'ystandard-toolbox' ) }
				value={ attributes.stickyColumn }
				useEmptyValue={ false }
				options={ [
					{
						key: 'none',
						name: __( '追従なし', 'ystandard-toolbox' ),
					},
					{
						key: 'first',
						name: __( 'カラム1', 'ystandard-toolbox' ),
					},
					{
						key: 'second',
						name: __( 'カラム2', 'ystandard-toolbox' ),
					},
				] }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
