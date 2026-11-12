/**
 * WordPress Dependencies
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import useThemeColors from '@aktk/block-components/hooks/useThemeColors';
import ColorGradientSettingsDropdown from '@aktk/block-components/wp-controls/color-gradient-settings-dropdown';
import { ToolsPanel } from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Block Dependencies.
 */
import type { FaqEditProps } from '../../../types';
import {
	getAccordionArrowColor,
	updateAccordionArrowColor,
} from '../../../utils';
import { updateAccordionArrowColor as updateItemAccordionArrowColor } from '@aktk/blocks/block-library/faq-item/utils';

const PANEL_ID = 'ystdtb-faq-accordion-arrow';

/**
 * 開閉ボタンの色設定.
 *
 * @param props ブロック編集プロパティ.
 * @return 開閉ボタンの色パネル.
 */
export function AccordionArrowColor( props: FaqEditProps ): JSX.Element | null {
	const { attributes, setAttributes, updateChildAttributes } = props;
	const { isAccordion } = attributes;
	const textColor = getAccordionArrowColor( attributes );
	const prefix = 'var:preset|color|';
	const presetSlug = textColor?.startsWith( prefix )
		? textColor.slice( prefix.length )
		: undefined;
	const colors = useThemeColors();
	const allColors = useMemo(
		() => colors.flatMap( ( palette ) => palette.colors ),
		[ colors ]
	);
	const colorValue =
		allColors.find( ( color ) => color.slug === presetSlug )?.color ??
		textColor;

	// 親子の開閉ボタン色を同じ値に更新する.
	const handleOnChange = ( newColor?: string ) => {
		const slug = allColors.find( ( color ) => color.color === newColor )
			?.slug;
		const text = slug ? `${ prefix }${ slug }` : newColor;
		setAttributes( {
			style: updateAccordionArrowColor( attributes.style, text ),
		} );
		updateChildAttributes( ( childAttributes ) => ( {
			style: updateItemAccordionArrowColor( childAttributes.style, text ),
		} ) );
	};

	// 開閉ボタン色を親子からまとめて削除する.
	const resetColor = () => {
		handleOnChange( undefined );
	};

	// 開閉ボタンがない通常表示では不要な設定を表示しない.
	if ( ! isAccordion ) {
		return null;
	}

	return (
		<ToolsPanel
			label={ __( '開閉ボタン（色）', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ resetColor }
		>
			<ColorGradientSettingsDropdown
				panelId={ PANEL_ID }
				colors={ colors }
				gradients={ [] }
				disableCustomGradients
				__experimentalIsRenderedInSidebar
				settings={ [
					{
						label: __( '色', 'ystandard-toolbox' ),
						colorValue,
						onColorChange: handleOnChange,
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
