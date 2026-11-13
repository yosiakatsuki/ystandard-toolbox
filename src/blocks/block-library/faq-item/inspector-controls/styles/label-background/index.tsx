/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
/* Aktk Dependencies */
import useThemeColors from '@aktk/block-components/hooks/useThemeColors';
import ColorGradientSettingsDropdown from '@aktk/block-components/wp-controls/color-gradient-settings-dropdown';
import { ToolsPanel } from '@aktk/block-components/wp-controls/tools-panel';
/* Block Dependencies */
import type { FaqItemEditProps } from '../../../types';
import { updateFaqItemElement } from '../../../style-utils';

const PANEL_ID = 'ystdtb-faq-item-label-background';
const PREFIX = 'var:preset|color|';

/**
 * ラベル背景色をコアと同じ追加・解除操作で編集する。
 * @param props ブロック編集プロパティ。
 */
export function LabelBackground( props: FaqItemEditProps ) {
	const { attributes, setAttributes } = props;
	const label = attributes.style?.ystdtb?.faqItem?.label;
	const background = label?.color?.background;
	const colors = useThemeColors();
	const palette = colors.flatMap( ( group ) => group.colors );
	const colorValue = background?.startsWith( PREFIX )
		? palette.find(
				( color ) => color.slug === background.slice( PREFIX.length )
		  )?.color ?? background
		: background;
	// 文字色を含む他パネルの値を保持し、プリセットはトークンで保存する。
	const update = ( color?: string ) => {
		const slug = palette.find( ( preset ) => preset.color === color )?.slug;
		setAttributes( {
			style: updateFaqItemElement( attributes.style, 'label', {
				...label,
				color: {
					...label?.color,
					background: slug ? `${ PREFIX }${ slug }` : color,
				},
			} ),
		} );
	};
	return (
		<ToolsPanel
			label={ __( 'FAQラベル（背景）', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ () => update() }
		>
			<ColorGradientSettingsDropdown
				panelId={ PANEL_ID }
				colors={ colors }
				__experimentalIsRenderedInSidebar
				settings={ [
					{
						label: __( '色', 'ystandard-toolbox' ),
						colorValue,
						onColorChange: update,
						onGradientChange: () => undefined,
						clearable: true,
						gradients: [],
						disableCustomGradients: true,
						isShownByDefault: false,
					},
				] }
			/>
		</ToolsPanel>
	);
}
