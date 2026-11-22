import classnames from 'classnames';

/* Aktk Dependencies */
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';
import { stripUndefined } from '@aktk/block-components/utils/object';

/* Plugin Dependencies */
import type {
	SliderItemBlockAttributes,
	SliderItemOverflow,
	SliderItemStyle,
} from './types';

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

/**
 * はみ出した部分の扱いを外枠のスタイルとして取得する。
 * @param attributes スライダーアイテムの属性。
 */
export function getSliderItemOverflow( attributes: SliderItemBlockAttributes ) {
	return {
		overflow: attributes.style?.ystdtb?.sliderItem?.overflow,
	};
}

/**
 * はみ出した部分の扱いだけを更新し、ほかのスタイルを保持する。
 * @param style    スライダーアイテムのスタイル属性。
 * @param overflow はみ出した部分の扱い。undefinedで解除する。
 */
export function updateSliderItemOverflow(
	style: SliderItemStyle | undefined,
	overflow: SliderItemOverflow | undefined
) {
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			sliderItem: { ...style?.ystdtb?.sliderItem, overflow },
		},
	} ) as SliderItemStyle | undefined;
}
