/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl, {
	useCustomUnits,
} from '@aktk/block-components/wp-controls/unit-control';
import { normalizeSizeValue } from '@aktk/block-components/utils/size';
/* Block Dependencies */
import type { FaqItemEditProps } from '../../../types';
import { updateFaqItemElement } from '../../../style-utils';

/**
 * 通常の正方形ラベルサイズを、端末別設定とは独立して編集する。
 * @param props               ブロック編集プロパティ。
 * @param props.attributes
 * @param props.setAttributes
 */
export function LabelSize( { attributes, setAttributes }: FaqItemEditProps ) {
	const label = attributes.style?.ystdtb?.faqItem?.label;
	// 単位ごとの刻みをコアに合わせ、em・remで小数を入力できるようにする。
	const units = useCustomUnits( { availableUnits: [ 'px', 'em', 'rem' ] } );
	// 端末別サイズを維持し、幅と高さに共通の通常値だけを更新する。
	const update = ( value?: string ) =>
		setAttributes( {
			style: updateFaqItemElement( attributes.style, 'label', {
				...label,
				dimensions: {
					...label?.dimensions,
					size: normalizeSizeValue( value ),
				},
			} ),
		} );
	return (
		<BaseControl
			help={ __( '幅と高さに同じ値を設定します。', 'ystandard-toolbox' ) }
		>
			<UnitControl
				label={ __( 'ラベルサイズ', 'ystandard-toolbox' ) }
				value={ label?.dimensions?.size }
				onChange={ update }
				min={ 0 }
				units={ units }
			/>
		</BaseControl>
	);
}
