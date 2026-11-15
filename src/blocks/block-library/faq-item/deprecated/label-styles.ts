/* Aktk Dependencies */
import { stripUndefined } from '@aktk/block-components/utils/object';

/* Block Dependencies */
import type { FaqItemBlockAttributes } from '../types';

/**
 * 旧ラベル設定をstyleへ統合し、新形式にある値と他要素の設定を保持する。
 * @param attributes ブロック属性。
 */
export function migrateLabelStyles( attributes: FaqItemBlockAttributes ) {
	const {
		labelPosition,
		labelSize,
		customLabelSize,
		labelBackgroundColor,
		customLabelBackgroundColor,
		labelBorderColor,
		customLabelBorderColor,
		labelBorderSize,
		labelBorderRadius,
		labelBold: _labelBold,
		labelColor: _labelColor,
		customLabelColor: _customLabelColor,
		...rest
	} = attributes;
	const item = rest.style?.ystdtb?.faqItem?.item;
	const label = rest.style?.ystdtb?.faqItem?.label;
	return ( stripUndefined( {
		...rest,
		style: {
			...rest.style,
			ystdtb: {
				...rest.style?.ystdtb,
				faqItem: {
					...rest.style?.ystdtb?.faqItem,
					item: {
						...item,
						layout: {
							...item?.layout,
							alignItems:
								item?.layout?.alignItems ??
								( labelPosition !== 'center'
									? labelPosition
									: undefined ),
						},
					},
					label: {
						...label,
						typography: {
							...label?.typography,
							fontSize:
								label?.typography?.fontSize ??
								( labelSize
									? `var:preset|font-size|${ labelSize }`
									: customLabelSize ),
						},
						color: {
							...label?.color,
							background:
								label?.color?.background ??
								( labelBackgroundColor
									? `var:preset|color|${ labelBackgroundColor }`
									: customLabelBackgroundColor ),
						},
						border: {
							...label?.border,
							color:
								label?.border?.color ??
								( labelBorderColor
									? `var:preset|color|${ labelBorderColor }`
									: customLabelBorderColor ),
							width:
								label?.border?.width ??
								( labelBorderSize || undefined ),
							radius:
								label?.border?.radius ??
								( labelBorderRadius || undefined ),
							// 既存CSSがsolidを補うため、未指定幅から新しい線を生成しない。
						},
					},
				},
			},
		},
	} ) ?? {} ) as FaqItemBlockAttributes;
}
