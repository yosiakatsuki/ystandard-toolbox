/* Aktk Dependencies */
import { stripUndefined } from '@aktk/block-components/utils/object';

/* Block Dependencies */
import type { SliderNavigationStyle, SliderStyle } from './types';

/**
 * 矢印の独自スタイルのうち、変更した項目だけを保存し、空になった階層を除く。
 * @param style   スライダーのスタイル属性。
 * @param changes 更新する矢印のスタイル。
 */
export function updateNavigationStyle(
	style: SliderStyle | undefined,
	changes: SliderNavigationStyle
) {
	const slider = style?.ystdtb?.slider;
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			slider: {
				...slider,
				navigation: { ...slider?.navigation, ...changes },
			},
		},
	} ) as SliderStyle | undefined;
}
