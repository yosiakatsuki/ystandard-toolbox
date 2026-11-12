/* Aktk Dependencies */
import { stripUndefined } from '@aktk/block-components/utils/object';

/* Block Dependencies */
import { migrateAccordionArrowColor } from '../../../faq/deprecated/arrow-color';
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
 * 旧ラベル文字色をラベルの文字スタイルへ移す.
 *
 * @param attributes 旧形式のブロック属性.
 * @return ラベル文字色を移行したブロック属性.
 */
export function migrateLabelTextColor( attributes: FaqItemBlockAttributes ) {
	const { labelColor, customLabelColor } = attributes;

	// 旧文字色がないブロックは現在の属性をそのまま保持する.
	if ( ! labelColor && ! customLabelColor ) {
		return attributes;
	}

	const rest = ( stripUndefined( {
		...attributes,
		labelColor: undefined,
		customLabelColor: undefined,
	} ) ?? {} ) as FaqItemBlockAttributes;
	const currentColor = rest.style?.ystdtb?.faqItem?.label?.color?.text;

	// 新形式の文字色がある場合は旧属性で上書きしない.
	if ( currentColor ) {
		return rest;
	}

	return stripUndefined( {
		...rest,
		style: {
			...rest.style,
			ystdtb: {
				...rest.style?.ystdtb,
				faqItem: {
					...rest.style?.ystdtb?.faqItem,
					label: {
						...rest.style?.ystdtb?.faqItem?.label,
						color: {
							...rest.style?.ystdtb?.faqItem?.label?.color,
							// 旧表示と同じくプリセット色をカスタム色より優先する.
							text: labelColor
								? `var:preset|color|${ labelColor }`
								: customLabelColor,
						},
					},
				},
			},
		},
	} ) as FaqItemBlockAttributes;
}

/**
 * 旧ラベル太字設定をラベルの外観へ移す.
 *
 * @param attributes 旧形式のブロック属性.
 * @return ラベルの外観を移行したブロック属性.
 */
export function migrateLabelAppearance( attributes: FaqItemBlockAttributes ) {
	const { labelBold } = attributes;

	// 太字解除だけが新形式への変換対象. 既定値は互換属性として保持する.
	if ( false !== labelBold ) {
		return attributes;
	}

	const rest = ( stripUndefined( {
		...attributes,
		labelBold: undefined,
	} ) ?? {} ) as FaqItemBlockAttributes;
	const currentTypography = rest.style?.ystdtb?.faqItem?.label?.typography;

	// 新形式の設定を優先する.
	if ( currentTypography?.fontWeight ) {
		return rest;
	}

	return stripUndefined( {
		...rest,
		style: {
			...rest.style,
			ystdtb: {
				...rest.style?.ystdtb,
				faqItem: {
					...rest.style?.ystdtb?.faqItem,
					label: {
						...rest.style?.ystdtb?.faqItem?.label,
						typography: {
							...currentTypography,
							fontStyle: 'normal',
							fontWeight: '400',
						},
					},
				},
			},
		},
	} ) as FaqItemBlockAttributes;
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
	} = migrateLabelAppearance(
		migrateLabelTextColor(
			migrateColors(
				migrateAccordionArrowColor(
					attributes,
					'faqItem'
				) as FaqItemBlockAttributes
			)
		)
	);

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
