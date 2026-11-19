/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

/* Plugin Dependencies */
import type { StickyColumnsEditProps } from '../../types';

/**
 * 2列時の表示順だけを変更する。
 * @param props 親ブロックの編集プロパティ。
 */
export function DisplayOrder( props: StickyColumnsEditProps ) {
	const { attributes, setAttributes } = props;

	// 追従対象や装飾を維持し、表示順の属性だけを更新する。
	const handleOnChange = ( value: string ) => {
		setAttributes( { reverse: value === 'reverse' } );
	};

	return (
		<BaseControl
			help={ __(
				'2列のときだけ左右を入れ替えます。1列ではカラム1、カラム2の順に表示します。',
				'ystandard-toolbox'
			) }
		>
			<CustomSelectControl
				label={ __( '2列の時の表示順', 'ystandard-toolbox' ) }
				value={ attributes.reverse ? 'reverse' : 'normal' }
				useEmptyValue={ false }
				options={ [
					{
						key: 'normal',
						name: __( 'カラム1 → カラム2', 'ystandard-toolbox' ),
					},
					{
						key: 'reverse',
						name: __( 'カラム2 → カラム1', 'ystandard-toolbox' ),
					},
				] }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
