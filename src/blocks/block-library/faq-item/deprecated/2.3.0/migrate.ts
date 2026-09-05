/* Aktk Dependencies */
import { stripUndefined } from '@aktk/block-components/utils/object';

/* Block Dependencies */
import type { FaqItemBlockAttributes } from '../../types';

/**
 * 旧本文文字色を標準属性へ移し、他の設定は保持する.
 *
 * @param attributes 旧形式のブロック属性.
 */
export function migrateTextColor( attributes: FaqItemBlockAttributes ) {
	const { faqTextColor, customFaqTextColor, ...rest } = attributes;

	// 文字色のない旧ブロックには空のstyle属性を追加しない.
	if ( ! faqTextColor && ! customFaqTextColor ) {
		return rest;
	}

	return stripUndefined( {
		...rest,
		textColor: faqTextColor || rest.textColor,
		style: customFaqTextColor
			? {
					...rest.style,
					color: {
						...rest.style?.color,
						text: customFaqTextColor,
					},
			  }
			: rest.style,
	} );
}
