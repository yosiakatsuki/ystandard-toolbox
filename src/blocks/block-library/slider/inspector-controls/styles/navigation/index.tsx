/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import {
	ToggleGroupControl,
	ToggleGroupControlOption,
} from '@aktk/block-components/wp-controls/toggle-group-control';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';
import UnitControl, {
	useCustomUnits,
} from '@aktk/block-components/wp-controls/unit-control';
import { normalizeSizeValue } from '@aktk/block-components/utils/size';

/* Block Dependencies */
import type { NavigationDesign, SliderEditProps } from '../../../types';
import { updateNavigationStyle } from '../../../navigation-style';
import { NavigationColors } from './colors';

const DESIGN_DEFAULT = 'default';

/**
 * 矢印のデザイン・色・大きさを、端末別の大きさとは独立して編集する。
 * @param props スライダーの編集プロパティ。
 */
export function NavigationStyle( props: SliderEditProps ) {
	const { attributes, setAttributes, clientId } = props;
	const { style } = attributes;
	const navigation = style?.ystdtb?.slider?.navigation;
	const panelId = clientId + '-navigation-style';
	// 単位ごとの刻みをコアに合わせ、em・remで小数を入力できるようにする。
	const units = useCustomUnits( { availableUnits: [ 'px', 'em', 'rem' ] } );

	// 既定へ戻すときは、背景がなくなり効かなくなる背景色も消す。
	const updateDesign = ( design?: NavigationDesign ) =>
		setAttributes( {
			style: updateNavigationStyle( style, { design } ),
			...( design
				? {}
				: {
						navigationBackgroundColor: undefined,
						customNavigationBackgroundColor: undefined,
					} ),
		} );
	// 通常の大きさだけを更新し、端末別の大きさを保持する。
	const updateSize = ( size?: string ) =>
		setAttributes( {
			style: updateNavigationStyle( style, { size } ),
		} );
	// 全解除では、このパネルが扱う項目だけをまとめて消す。
	const resetAll = () =>
		setAttributes( {
			style: updateNavigationStyle( style, {
				design: undefined,
				size: undefined,
			} ),
			navigationColor: undefined,
			customNavigationColor: undefined,
			navigationBackgroundColor: undefined,
			customNavigationBackgroundColor: undefined,
		} );

	return (
		<ToolsPanel
			panelId={ panelId }
			label={ __( '矢印（ナビゲーション）', 'ystandard-toolbox' ) }
			resetAll={ resetAll }
		>
			<ToolsPanelItem
				className="single-column"
				panelId={ panelId }
				label={ __( 'デザイン', 'ystandard-toolbox' ) }
				// 設定できる項目が分かるよう、例外として最初から表示する。
				isShownByDefault
				hasValue={ () => !! navigation?.design }
				onDeselect={ () => updateDesign( undefined ) }
			>
				<BaseControl>
					<ToggleGroupControl
						label={ __( 'デザイン', 'ystandard-toolbox' ) }
						value={ navigation?.design ?? DESIGN_DEFAULT }
						onChange={ ( value?: string | number ) =>
							updateDesign(
								DESIGN_DEFAULT === value
									? undefined
									: ( value as NavigationDesign )
							)
						}
						isBlock
					>
						<ToggleGroupControlOption
							label={ __( '既定', 'ystandard-toolbox' ) }
							value={ DESIGN_DEFAULT }
						/>
						<ToggleGroupControlOption
							label={ __( '四角', 'ystandard-toolbox' ) }
							value="square"
						/>
						<ToggleGroupControlOption
							label={ __( '円', 'ystandard-toolbox' ) }
							value="circle"
						/>
					</ToggleGroupControl>
				</BaseControl>
			</ToolsPanelItem>
			<NavigationColors { ...props } panelId={ panelId } />
			<ToolsPanelItem
				className="single-column"
				panelId={ panelId }
				label={ __( '大きさ', 'ystandard-toolbox' ) }
				isShownByDefault
				hasValue={ () => !! navigation?.size }
				onDeselect={ () => updateSize( undefined ) }
			>
				<BaseControl>
					<UnitControl
						label={ __( '大きさ', 'ystandard-toolbox' ) }
						value={ navigation?.size }
						onChange={ ( size ) =>
							updateSize( normalizeSizeValue( size ) )
						}
						units={ units }
						min={ 0 }
					/>
				</BaseControl>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
