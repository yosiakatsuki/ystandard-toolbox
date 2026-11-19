import classnames from 'classnames';

/* Aktk Dependencies */
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';

/* Plugin Dependencies */
import type { SliderItemBlockAttributes } from './types';

export function getSliderItemBlockClasses(): string {
	return classnames( 'ystdtb-slider-item' );
}

/**
 * 高さは寸法サポート導入前のWordPressでも同じHTMLを再現する。
 * @param attributes スライダーアイテムの属性。
 */
export function getSliderItemDimensions(
	attributes: SliderItemBlockAttributes
) {
	const { height } = attributes.style?.dimensions ?? {};
	return {
		height: presetTokenToCssVar( height ),
	};
}
