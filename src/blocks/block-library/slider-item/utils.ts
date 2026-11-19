import classnames from 'classnames';

/* Aktk Dependencies */
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';

/* Plugin Dependencies */
import type { SliderItemBlockAttributes } from './types';

export function getSliderItemBlockClasses(): string {
	return classnames( 'ystdtb-slider-item' );
}

/**
 * 幅はSwiperの表示枚数切り替えで消えないCSS変数にし、高さは寸法サポート導入前のWordPressでも同じHTMLを再現する。
 * @param attributes スライダーアイテムの属性。
 */
export function getSliderItemDimensions(
	attributes: SliderItemBlockAttributes
) {
	const { width, height } = attributes.style?.dimensions ?? {};
	return {
		'--ystdtb--slider-item--width': presetTokenToCssVar( width ),
		height: presetTokenToCssVar( height ),
	};
}
