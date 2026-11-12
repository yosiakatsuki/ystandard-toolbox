/* Aktk Dependencies */
import { stripUndefined } from '@aktk/block-components/utils/object';

/**
 * 親子それぞれの旧開閉ボタン色を移し、既存のstyleを保持する。
 * @param attributes 旧ブロック属性。
 * @param element    親または子の保存先。
 */
export function migrateAccordionArrowColor(
	attributes: Record< string, any >,
	element: 'faq' | 'faqItem'
) {
	const { accordionArrowColor, customAccordionArrowColor, ...rest } =
		attributes;
	const text =
		rest.style?.ystdtb?.[ element ]?.arrow?.color?.text ??
		( accordionArrowColor
			? `var:preset|color|${ accordionArrowColor }`
			: customAccordionArrowColor );
	// 色指定がない場合は空のstyleを追加しない。
	if ( ! text ) {
		return rest;
	}
	return stripUndefined( {
		...rest,
		style: {
			...rest.style,
			ystdtb: {
				...rest.style?.ystdtb,
				[ element ]: {
					...rest.style?.ystdtb?.[ element ],
					arrow: {
						...rest.style?.ystdtb?.[ element ]?.arrow,
						color: {
							...rest.style?.ystdtb?.[ element ]?.arrow?.color,
							text,
						},
					},
				},
			},
		},
	} ) as Record< string, any >;
}

/**
 * 保存HTMLが変わらない親やA側でも旧色を移行対象にする。
 * @param attributes 保存済みブロック属性。
 */
export function hasLegacyAccordionArrowColor(
	attributes: Record< string, any >
) {
	return (
		undefined !== attributes.accordionArrowColor ||
		undefined !== attributes.customAccordionArrowColor
	);
}
