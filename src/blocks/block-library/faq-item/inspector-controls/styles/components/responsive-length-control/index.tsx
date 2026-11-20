/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { IconUnitControl } from '@aktk/block-components/components/icon-control';
import type { ResponsiveFontSize } from '@aktk/block-components/components/responsive-font-size-control';
import { normalizeSizeValue } from '@aktk/block-components/utils/size';
import { useCustomUnits } from '@aktk/block-components/wp-controls/unit-control';

/**
 * 通常値を扱わず、指定端末の長さだけを更新する。
 * @param props          ラベル・端末別値・更新関数。
 * @param props.label    設定名。
 * @param props.value    端末別の長さ。
 * @param props.onChange 端末別値の更新関数。
 */
export function ResponsiveLengthControl( props: {
	label: string;
	value?: ResponsiveFontSize;
	onChange: ( value?: ResponsiveFontSize ) => void;
} ) {
	const { label, value, onChange } = props;
	const id = useInstanceId(
		ResponsiveLengthControl,
		'faq-responsive-length'
	);
	// 単位ごとの刻みをコアに合わせ、em・remで小数を入力できるようにする。
	const units = useCustomUnits( { availableUnits: [ 'px', 'em', 'rem' ] } );
	return (
		<BaseControl id={ String( id ) } label={ label }>
			<div className="grid grid-cols-1 gap-4">
				{ (
					[
						[
							'desktop',
							__( 'PC', 'ystandard-toolbox' ),
							IconUnitControl.Desktop,
						],
						[
							'tablet',
							__( 'タブレット', 'ystandard-toolbox' ),
							IconUnitControl.Tablet,
						],
						[
							'mobile',
							__( 'モバイル', 'ystandard-toolbox' ),
							IconUnitControl.Mobile,
						],
					] as const
				 ).map( ( [ device, deviceLabel, Control ] ) => (
					<Control
						key={ device }
						aria-label={ `${ label }（${ deviceLabel }）` }
						value={ value?.[ device ] }
						units={ units }
						min={ 0 }
						onChange={ ( next ) =>
							onChange( {
								...value,
								[ device ]: normalizeSizeValue( next ),
							} )
						}
					/>
				) ) }
			</div>
		</BaseControl>
	);
}
