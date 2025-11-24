import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { getColorClassName, getFontSizeClass } from '@wordpress/block-editor';

/**
 * Block dependencies.
 */
import type { FaqItemBlockAttributes, LabelPositionOption } from './types';

/**
 * ラベル位置選択肢
 */
export const labelPositions: LabelPositionOption[] = [
	{ label: __( '上', 'ystandard-toolbox' ), name: 'flex-start' },
	{ label: __( '中央', 'ystandard-toolbox' ), name: 'center' },
	{ label: __( '下', 'ystandard-toolbox' ), name: 'flex-end' },
];

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

	return classnames( 'ystdtb-faq-item', {
		[ `is-faq--${ faqType }` ]: faqType,
		[ `has-border-${ faqBorderType }` ]: '' !== faqBorderType,
		'has-background': faqBackgroundColor || customFaqBackgroundColor,
		'has-border':
			!! faqBorderSize && ( faqBorderColor || customFaqBorderColor ),
		[ faqBackgroundColorClass ]: faqBackgroundColorClass,
		[ faqBorderColorClass ]: faqBorderSize && faqBorderColorClass,
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
		faqBorderColor,
		customFaqBorderColor,
		faqBorderSize,
		labelPosition,
	} = attributes;

	return {
		backgroundColor: faqBackgroundColor
			? undefined
			: customFaqBackgroundColor,
		borderColor:
			! faqBorderSize || faqBorderColor
				? undefined
				: customFaqBorderColor,
		borderWidth: ! faqBorderSize ? undefined : faqBorderSize,
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
		labelBorderSize;

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

export function getAccordionArrowClasses( attributes: FaqItemBlockAttributes ) {
	const { accordionArrowColor, customAccordionArrowColor } = attributes;

	const accordionArrowColorClass =
		getColorClassName( 'color', accordionArrowColor ) || '';

	return classnames( 'ystdtb-faq-item__arrow', {
		'has-text-color': accordionArrowColor || customAccordionArrowColor,
		[ accordionArrowColorClass ]: accordionArrowColorClass,
	} );
}

export function getAccordionArrowStyles( attributes: FaqItemBlockAttributes ) {
	const { customAccordionArrowColor } = attributes;
	return {
		color: customAccordionArrowColor,
	};
}
