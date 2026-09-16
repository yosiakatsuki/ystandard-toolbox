import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import { getColorClassName, getFontSizeClass } from '@wordpress/block-editor';

/**
 * Aktk dependencies.
 */
import type { Spacing } from '@aktk/block-components/components/custom-spacing-select';
import { getCustomSpacingValues } from '@aktk/block-components/components/custom-spacing-select/util';
import { hasBorderWidth } from '@aktk/block-components/utils/size';
import { stripUndefined } from '@aktk/block-components/utils/object';

/**
 * Block dependencies.
 */
import type { FaqItemBlockAttributes } from './types';

/**
 * FAQアイテムのクラス名を取得
 * @param attributes
 */
export function getBlockPropsClasses(
	attributes: FaqItemBlockAttributes
): string {
	const { faqType } = attributes;
	return classnames( 'ystdtb-faq-item-wrap', {
		[ `is-faq--${ faqType }` ]: faqType,
	} );
}

/**
 * FAQアイテムのクラス名を取得
 * @param attributes
 */
export function getItemClasses( attributes: FaqItemBlockAttributes ): string {
	const { faqType } = attributes;

	return classnames( 'ystdtb-faq-item', {
		[ `is-faq--${ faqType }` ]: faqType,
	} );
}

/**
 * FAQアイテムのスタイルを取得
 * @param attributes
 */
export function getItemStyles( attributes: FaqItemBlockAttributes ) {
	const { labelPosition } = attributes;

	return {
		alignItems: 'center' === labelPosition ? undefined : labelPosition,
	};
}

/**
 * FAQラベルのクラス名を取得
 * @param attributes
 */
export function getLabelClasses( attributes: FaqItemBlockAttributes ): string {
	const {
		labelSize = '',
		labelColor,
		customLabelColor,
		labelBackgroundColor,
		customLabelBackgroundColor,
		labelBorderColor,
		customLabelBorderColor,
		labelBorderSize,
	} = attributes;

	const labelSizeClass = getFontSizeClass( labelSize ) || '';
	const labelColorClass = getColorClassName( 'color', labelColor ) || '';
	const labelBackgroundColorClass =
		getColorClassName( 'background-color', labelBackgroundColor ) || '';
	const labelBorderColorClass =
		getColorClassName( 'border-color', labelBorderColor ) || '';

	const hasPadding =
		labelBackgroundColor ||
		customLabelBackgroundColor ||
		labelBorderColor ||
		customLabelBorderColor ||
		hasBorderWidth( labelBorderSize );

	return classnames( 'ystdtb-faq-item__label', {
		[ labelSizeClass ]: labelSizeClass,
		'has-text-color': labelColor || customLabelColor,
		[ labelColorClass ]: labelColorClass,
		'has-background': labelBackgroundColor || customLabelBackgroundColor,
		[ labelBackgroundColorClass ]: labelBackgroundColorClass,
		'has-border': labelBorderColor || customLabelBorderColor,
		[ labelBorderColorClass ]: labelBorderColorClass,
		'has-padding': hasPadding,
	} );
}

/**
 * FAQラベルのスタイルを取得
 * @param attributes
 */
export function getLabelStyles( attributes: FaqItemBlockAttributes ) {
	const {
		customLabelSize,
		labelBold,
		customLabelColor,
		customLabelBackgroundColor,
		customLabelBorderColor,
		labelBorderSize,
		labelBorderRadius,
	} = attributes;
	return {
		fontSize: customLabelSize,
		fontWeight: labelBold ? undefined : 400,
		color: customLabelColor,
		backgroundColor: customLabelBackgroundColor,
		borderColor: customLabelBorderColor,
		borderWidth: labelBorderSize || undefined,
		borderRadius: labelBorderRadius || undefined,
	};
}

/**
 * FAQコンテンツのクラス名を取得
 * @param attributes
 */
export function getContentsClasses(
	attributes: FaqItemBlockAttributes
): string {
	const { textColor, style } = attributes;

	const textColorClass = getColorClassName( 'color', textColor ) || '';

	return classnames( 'ystdtb-faq-item__contents', {
		'has-text-color': textColor || style?.color?.text,
		[ textColorClass ]: textColorClass,
	} );
}

/**
 * FAQコンテンツのスタイルを取得
 * @param attributes
 */
export function getContentsStyles( attributes: FaqItemBlockAttributes ) {
	const { style } = attributes;
	return {
		color: style?.color?.text,
	};
}

export function getAccordionArrowClasses( attributes: FaqItemBlockAttributes ) {
	const { accordionArrowColor, customAccordionArrowColor } = attributes;

	const accordionArrowColorClass =
		getColorClassName( 'color', accordionArrowColor ) || '';

	return classnames( 'ystdtb-faq-item__arrow', {
		'has-text-color': accordionArrowColor || customAccordionArrowColor,
		[ accordionArrowColorClass ]: accordionArrowColorClass,
	} );
}

/**
 * FAQ開閉ボタンの余白を取得.
 *
 * @param attributes FAQアイテム属性.
 * @return 開閉ボタンのmargin設定.
 */
export function getAccordionArrowMargin( attributes: FaqItemBlockAttributes ) {
	return attributes.style?.ystdtb?.faqItem?.arrow?.spacing?.margin;
}

/**
 * FAQ開閉ボタンの余白を更新.
 *
 * @param style  FAQアイテムのstyle属性.
 * @param margin 開閉ボタンのmargin設定.
 * @return 更新後のstyle属性.
 */
export function updateAccordionArrowMargin(
	style: FaqItemBlockAttributes[ 'style' ],
	margin?: Spacing
) {
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			faqItem: {
				...style?.ystdtb?.faqItem,
				arrow: {
					...style?.ystdtb?.faqItem?.arrow,
					spacing: {
						...style?.ystdtb?.faqItem?.arrow?.spacing,
						margin,
					},
				},
			},
		},
	} ) as FaqItemBlockAttributes[ 'style' ];
}

export function getAccordionArrowStyles( attributes: FaqItemBlockAttributes ) {
	const { customAccordionArrowColor } = attributes;
	return {
		color: customAccordionArrowColor,
		...getCustomSpacingValues(
			getAccordionArrowMargin( attributes ),
			'margin'
		),
	};
}
