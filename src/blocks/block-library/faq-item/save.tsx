import classnames from 'classnames';
/*
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	// @ts-ignore
	getColorClassName,
	// @ts-ignore
	getFontSizeClass,
} from '@wordpress/block-editor';

/*
 * Aktk Dependencies
 */
import { SvgIcon } from '@aktk/block-components/components/svg-icon';

/*
 * Plugin Dependencies
 */
import type { FaqItemBlockAttributes } from '../faq/types';

type FaqItemSaveProps = {
	attributes: FaqItemBlockAttributes;
};

/**
 * FAQアイテムブロック保存コンポーネント
 */
export default function FaqItemSave( { attributes }: FaqItemSaveProps ) {
	const {
		faqType,
		faqBorderType,
		faqBorderSize,
		labelPosition,
		labelBorderSize,
		labelBorderRadius,
		faqTextColor,
		customFaqTextColor,
		faqBackgroundColor,
		customFaqBackgroundColor,
		faqBorderColor,
		customFaqBorderColor,
		labelSize,
		customLabelSize,
		labelBold,
		labelColor,
		customLabelColor,
		labelBackgroundColor,
		customLabelBackgroundColor,
		labelBorderColor,
		customLabelBorderColor,
		accordionArrowColor,
		customAccordionArrowColor,
	} = attributes;

	// 色クラス名を取得
	const faqTextColorClass = getColorClassName( 'color', faqTextColor );
	const faqBackgroundColorClass = getColorClassName(
		'background-color',
		faqBackgroundColor
	);
	const faqBorderColorClass = getColorClassName(
		'border-color',
		faqBorderColor
	);
	const labelColorClass = getColorClassName( 'color', labelColor );
	const labelBackgroundColorClass = getColorClassName(
		'background-color',
		labelBackgroundColor
	);
	const labelBorderColorClass = getColorClassName(
		'border-color',
		labelBorderColor
	);
	const accordionArrowColorClass = getColorClassName(
		'color',
		accordionArrowColor
	);

	// フォントサイズクラス名を取得
	const labelSizeClass = getFontSizeClass( labelSize );

	// クラス名 - アイテム全体
	const itemClasses = classnames( 'ystdtb-faq-item', {
		[ `is-faq--${ faqType }` ]: faqType,
		[ `has-border-${ faqBorderType }` ]: '' !== faqBorderType,
		'has-background': faqBackgroundColor || customFaqBackgroundColor,
		[ faqBackgroundColorClass ]: faqBackgroundColorClass,
		'has-border': faqBorderColor || customFaqBorderColor,
		[ faqBorderColorClass ]: faqBorderColorClass,
	} );

	// インラインスタイル - アイテム全体
	const itemStyles = {
		backgroundColor: faqBackgroundColorClass
			? undefined
			: customFaqBackgroundColor,
		borderColor: faqBorderColorClass ? undefined : customFaqBorderColor,
		borderWidth: 0 === faqBorderSize ? undefined : `${ faqBorderSize }px`,
		alignItems:
			'center' === labelPosition ? undefined : labelPosition,
	};

	// クラス名 - ラベル
	const labelClasses = classnames( 'ystdtb-faq-item__label', {
		[ labelSizeClass ]: labelSizeClass,
		'has-text-color': labelColor || customLabelColor,
		[ labelColorClass ]: labelColorClass,
		'has-background': labelBackgroundColor || customLabelBackgroundColor,
		[ labelBackgroundColorClass ]: labelBackgroundColorClass,
		'has-border': labelBorderColor || customLabelBorderColor,
		[ labelBorderColorClass ]: labelBorderColorClass,
		'has-padding':
			labelBackgroundColor ||
			customLabelBackgroundColor ||
			labelBorderColor ||
			customLabelBorderColor ||
			labelBorderSize,
	} );

	// インラインスタイル - ラベル
	const labelStyles = {
		fontSize: labelSizeClass ? undefined : customLabelSize,
		color: labelColorClass ? undefined : customLabelColor,
		fontWeight: labelBold ? undefined : 400,
		backgroundColor: labelBackgroundColorClass
			? undefined
			: customLabelBackgroundColor,
		borderColor: labelBorderColorClass ? undefined : customLabelBorderColor,
		borderWidth:
			0 === labelBorderSize || ! labelBorderSize
				? undefined
				: `${ labelBorderSize }px`,
		borderRadius:
			0 === labelBorderRadius || ! labelBorderRadius
				? undefined
				: `${ labelBorderRadius }px`,
	};

	// クラス名 - コンテンツ
	const contentsClasses = classnames( 'ystdtb-faq-item__contents', {
		'has-text-color': faqTextColor || customFaqTextColor,
		[ faqTextColorClass ]: faqTextColorClass,
	} );

	// インラインスタイル - コンテンツ
	const contentsStyles = {
		color: faqTextColorClass ? undefined : customFaqTextColor,
	};

	// クラス名 - アコーディオンアロー
	const accordionArrowClass = classnames( 'ystdtb-faq-item__arrow', {
		'has-text-color': accordionArrowColorClass || customAccordionArrowColor,
		[ accordionArrowColorClass ]: accordionArrowColorClass,
	} );

	// インラインスタイル - アコーディオンアロー
	const accordionArrowStyle = {
		color: accordionArrowColorClass ? undefined : customAccordionArrowColor,
	};

	const blockProps = useBlockProps.save( {
		className: itemClasses,
		style: itemStyles,
	} );

	return (
		<div { ...blockProps }>
			<div className={ labelClasses } style={ labelStyles }>
				<span className="ystdtb-faq-item__label-text">{ faqType }</span>
			</div>
			<div className={ contentsClasses } style={ contentsStyles }>
				<InnerBlocks.Content />
			</div>
			{ 'q' === faqType && (
				<div
					className={ accordionArrowClass }
					style={ accordionArrowStyle }
				>
					<SvgIcon name="chevron-down" />
				</div>
			) }
		</div>
	);
}
