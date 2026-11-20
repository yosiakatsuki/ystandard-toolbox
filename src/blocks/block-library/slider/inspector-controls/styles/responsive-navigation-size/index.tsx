/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import { ResponsiveSizePanel } from '@aktk/block-components/components/responsive-size-panel';
import { useCustomUnits } from '@aktk/block-components/wp-controls/unit-control';

/* Plugin Dependencies */
import { PanelIcon } from '@aktk/components/ystandard-icon';

/* Block Dependencies */
import type { SliderEditProps } from '../../../types';
import { updateNavigationStyle } from '../../../navigation-style';

/**
 * 通常の大きさを保持して、矢印の端末別の大きさだけを編集・解除する。
 * @param props スライダーの編集プロパティ。
 */
export function ResponsiveNavigationSize( props: SliderEditProps ) {
	const { attributes, setAttributes, clientId } = props;
	const { style } = attributes;
	const navigation = style?.ystdtb?.slider?.navigation;
	// 単位ごとの刻みをコアに合わせ、em・remで小数を入力できるようにする。
	const units = useCustomUnits( { availableUnits: [ 'px', 'em', 'rem' ] } );
	return (
		<ResponsiveSizePanel
			panelId={ clientId + '-responsive-navigation-size' }
			title={ __( 'レスポンシブ矢印サイズ', 'ystandard-toolbox' ) }
			icon={ <PanelIcon /> }
			// 矢印は正方形のため、幅の入力を大きさとして使う。
			settings={ { width: true } }
			labels={ { width: __( '矢印の大きさ', 'ystandard-toolbox' ) } }
			// 設定できる項目が分かるよう、未設定でも最初から表示する。
			shownByDefault={ { width: true } }
			units={ units }
			value={ { width: navigation?.responsive?.size } }
			onChange={ ( changes ) => {
				if ( ! ( 'width' in changes ) ) {
					return;
				}
				setAttributes( {
					style: updateNavigationStyle( style, {
						responsive: {
							...navigation?.responsive,
							size: changes.width,
						},
					} ),
				} );
			} }
		/>
	);
}
