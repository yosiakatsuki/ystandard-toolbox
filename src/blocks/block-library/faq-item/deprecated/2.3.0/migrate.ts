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

/**
 * 旧下区切り線を標準の辺別枠線へ移し、文字色・背景色も現行形式へ統合する.
 *
 * @param attributes 旧形式のブロック属性.
 */
export function migrateFaqItemAttributes( attributes: FaqItemBlockAttributes ) {
	const {
		faqBorderType,
		faqBorderSize,
		faqBorderColor,
		customFaqBorderColor,
		...rest
	} = migrateColors( attributes );

	// 新形式の設定を優先し、旧形式で表示されなかった線を新たに出さない.
	if (
		undefined !== rest.style?.border ||
		'bottom' !== faqBorderType ||
		! faqBorderSize ||
		/^0(?:[a-z%]+)?$/i.test( faqBorderSize.trim() )
	) {
		return rest;
	}

	return stripUndefined( {
		...rest,
		style: {
			...rest.style,
			border: {
				bottom: {
					width: faqBorderSize,
					style: 'solid',
					// 旧表示と同じくプリセット色をカスタム色より優先する.
					color: faqBorderColor
						? `var:preset|color|${ faqBorderColor }`
						: customFaqBorderColor,
				},
			},
		},
	} );
}
