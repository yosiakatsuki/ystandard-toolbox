import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import { getColorClassName, getFontSizeClass } from '@wordpress/block-editor';

/**
 * Aktk dependencies.
 */
import { getCustomSpacingValues } from '@aktk/block-components/components/custom-spacing-select/util';
import { hasBorderWidth } from '@aktk/block-components/utils/size';

/**
 * Block dependencies.
 */
import type { FaqItemBlockAttributes } from '../../types';

/**
 * FAQアイテムのクラス名を取得
 * @param attributes
 */
export function getItemClasses( attributes: FaqItemBlockAttributes ): string {
	const {
		faqType,
		faqBorderType,
		faqBackgroundColor,
		customFaqBackgroundColor,
		faqBorderColor,
		customFaqBorderColor,
		faqBorderSize,
	} = attributes;

	const faqBackgroundColorClass =
		getColorClassName( 'background-color', faqBackgroundColor ) || '';
	const faqBorderColorClass =
		getColorClassName( 'border-color', faqBorderColor ) || '';
	const hasFaqBorderSize = hasBorderWidth( faqBorderSize );

	return classnames( 'ystdtb-faq-item', {
		[ `is-faq--${ faqType }` ]: faqType,
		[ `has-border-${ faqBorderType }` ]: '' !== faqBorderType,
		'has-background': faqBackgroundColor || customFaqBackgroundColor,
		'has-border':
			hasFaqBorderSize && ( faqBorderColor || customFaqBorderColor ),
		[ faqBackgroundColorClass ]: faqBackgroundColorClass,
		[ faqBorderColorClass ]: hasFaqBorderSize && faqBorderColorClass,
	} );
}

/**
 * FAQアイテムのスタイルを取得
 * @param attributes
 */
export function getItemStyles( attributes: FaqItemBlockAttributes ) {
	const {
		faqBackgroundColor,
		customFaqBackgroundColor,
		faqBorderType,
		faqBorderColor,
		customFaqBorderColor,
		faqBorderSize,
		labelPosition,
	} = attributes;

	const isBottomBorder = 'bottom' === faqBorderType;

	return {
		backgroundColor: faqBackgroundColor
			? undefined
			: customFaqBackgroundColor,
		borderBottomColor:
			! isBottomBorder || ! faqBorderSize || faqBorderColor
				? undefined
				: customFaqBorderColor,
		borderBottomWidth:
			! isBottomBorder || ! faqBorderSize ? undefined : faqBorderSize,
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
	const { faqTextColor, customFaqTextColor } = attributes;

	const faqTextColorClass = getColorClassName( 'color', faqTextColor ) || '';

	return classnames( 'ystdtb-faq-item__contents', {
		'has-text-color': faqTextColor || customFaqTextColor,
		[ faqTextColorClass ]: faqTextColorClass,
	} );
}

/**
 * FAQコンテンツのスタイルを取得
 * @param attributes
 */
export function getContentsStyles( attributes: FaqItemBlockAttributes ) {
	const { customFaqTextColor } = attributes;
	return {
		color: customFaqTextColor,
	};
}

/**
 * v2.3.0の開閉ボタンの色と表示を再現する.
 *
 * @param attributes 旧ブロック属性.
 */
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
 * v2.3.0の開閉ボタンの色と表示を再現する.
 *
 * @param attributes 旧ブロック属性.
 */
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
