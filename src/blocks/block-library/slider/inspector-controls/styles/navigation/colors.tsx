/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import useThemeColors from '@aktk/block-components/hooks/useThemeColors';
import ColorGradientSettingsDropdown from '@aktk/block-components/wp-controls/color-gradient-settings-dropdown';

/* Block Dependencies */
import type { SliderEditProps } from '../../../types';

type NavigationColorsProps = SliderEditProps & {
	panelId: string;
};

/**
 * 矢印の色と、四角・円のときの背景色をパネル項目として編集する。
 * @param props スライダーの編集プロパティとパネルID。
 */
export function NavigationColors( props: NavigationColorsProps ) {
	const { attributes, setAttributes, panelId } = props;
	const {
		navigationColor,
		customNavigationColor,
		navigationBackgroundColor,
		customNavigationBackgroundColor,
		style,
	} = attributes;
	const colors = useThemeColors();
	const palette = colors.flatMap( ( group ) => group.colors );
	const hasBackground = !! style?.ystdtb?.slider?.navigation?.design;

	// スラッグはパレットの色、それ以外は任意の色として表示する。
	const toColorValue = ( slug?: string, custom?: string ) =>
		palette.find( ( preset ) => preset.slug === slug )?.color ?? custom;
	// パレットの色はスラッグ、それ以外は任意の色として、一方だけを保存する。
	const toAttributes = ( color?: string ) => {
		const slug = palette.find( ( preset ) => preset.color === color )?.slug;
		return { slug, custom: slug ? undefined : color };
	};
	const colorSetting = {
		onGradientChange: () => undefined,
		clearable: true,
		gradients: [],
		disableCustomGradients: true,
		// 設定できる項目が分かるよう、未設定でも最初から表示する。
		isShownByDefault: true,
	};

	return (
		// コアの色の項目は間隔なしで並べて枠線を共有するため、パネルの行間を詰めるラッパーで囲む。
		<div className="ystdtb-slider-edit__navigation-colors">
			<ColorGradientSettingsDropdown
				panelId={ panelId }
				colors={ colors }
				// 任意の色では不透明度も指定できるようにする。
				enableAlpha
				__experimentalIsRenderedInSidebar
				settings={ [
					{
						...colorSetting,
						label: __( '矢印の色', 'ystandard-toolbox' ),
						colorValue: toColorValue(
							navigationColor,
							customNavigationColor
						),
						onColorChange: ( color?: string ) => {
							const { slug, custom } = toAttributes( color );
							setAttributes( {
								navigationColor: slug,
								customNavigationColor: custom,
							} );
						},
					},
					// 背景は四角・円のデザインにだけあるため、そのときだけ入力を出す。
					...( hasBackground
						? [
								{
									...colorSetting,
									label: __( '背景色', 'ystandard-toolbox' ),
									colorValue: toColorValue(
										navigationBackgroundColor,
										customNavigationBackgroundColor
									),
									onColorChange: ( color?: string ) => {
										const { slug, custom } =
											toAttributes( color );
										setAttributes( {
											navigationBackgroundColor: slug,
											customNavigationBackgroundColor:
												custom,
										} );
									},
								},
							]
						: [] ),
				] }
			/>
		</div>
	);
}
