/* Aktk Dependencies */
import { stripUndefined } from '@aktk/block-components/utils/object';

/* Block Dependencies */
import type { FaqItemBlockAttributes } from '../../types';

/**
 * 旧本文文字色とItem背景色を標準属性へ移し、他の設定は保持する.
 *
 * @param attributes 旧形式のブロック属性.
 */
export function migrateColors( attributes: FaqItemBlockAttributes ) {
	const {
		faqTextColor,
		customFaqTextColor,
		faqBackgroundColor,
		customFaqBackgroundColor,
		...rest
	} = attributes;

	// 色のない旧ブロックには空のstyle属性を追加しない.
	if (
		! faqTextColor &&
		! customFaqTextColor &&
		! faqBackgroundColor &&
		! customFaqBackgroundColor
	) {
		return rest;
	}

	return stripUndefined( {
		...rest,
		textColor: faqTextColor || rest.textColor,
		backgroundColor: faqBackgroundColor || rest.backgroundColor,
		style:
			customFaqTextColor ||
			( ! faqBackgroundColor && customFaqBackgroundColor )
				? {
						...rest.style,
						color: {
							...rest.style?.color,
							text: customFaqTextColor || rest.style?.color?.text,
							// 旧背景色はプリセット指定時にカスタム色を出力しない.
							background: faqBackgroundColor
								? rest.style?.color?.background
								: customFaqBackgroundColor ||
								  rest.style?.color?.background,
						},
				  }
				: rest.style,
	} );
}
