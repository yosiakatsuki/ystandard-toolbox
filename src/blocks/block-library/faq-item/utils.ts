import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import {
	getColorClassName,
	getFontSizeClass,
	getTypographyClassesAndStyles,
} from '@wordpress/block-editor';

/**
 * Aktk dependencies.
 */
import type { Spacing } from '@aktk/block-components/components/custom-spacing-select';
import { getCustomSpacingValues } from '@aktk/block-components/components/custom-spacing-select/util';
import { hasBorderWidth } from '@aktk/block-components/utils/size';
import { stripUndefined } from '@aktk/block-components/utils/object';
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';

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
		labelBackgroundColor,
		customLabelBackgroundColor,
		labelBorderColor,
		customLabelBorderColor,
		labelBorderSize,
	} = attributes;

	const labelSizeClass = getFontSizeClass( labelSize ) || '';
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
		customLabelBackgroundColor,
		customLabelBorderColor,
		labelBorderSize,
		labelBorderRadius,
	} = attributes;
	const typography = getLabelTypography( attributes );
	return {
		fontSize: customLabelSize,
		fontFamily: presetTokenToCssVar( typography?.fontFamily ),
		fontStyle: typography?.fontStyle,
		fontWeight: typography?.fontWeight,
		lineHeight: typography?.lineHeight,
		textTransform: typography?.textTransform,
		color: presetTokenToCssVar( getLabelTextColor( attributes ) ),
		backgroundColor: customLabelBackgroundColor,
		borderColor: customLabelBorderColor,
		borderWidth: labelBorderSize || undefined,
		borderRadius: labelBorderRadius || undefined,
	};
}

/**
 * FAQラベルの文字色を取得.
 *
 * @param attributes FAQアイテム属性.
 * @return FAQラベルの文字色.
 */
export function getLabelTextColor( attributes: FaqItemBlockAttributes ) {
	return attributes.style?.ystdtb?.faqItem?.label?.color?.text;
}

/**
 * FAQラベルの文字色を更新.
 *
 * @param style FAQアイテムのstyle属性.
 * @param text  FAQラベルの文字色.
 * @return 更新後のstyle属性.
 */
export function updateLabelTextColor(
	style: FaqItemBlockAttributes[ 'style' ],
	text?: string
) {
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			faqItem: {
				...style?.ystdtb?.faqItem,
				label: {
					...style?.ystdtb?.faqItem?.label,
					color: {
						...style?.ystdtb?.faqItem?.label?.color,
						text,
					},
				},
			},
		},
	} ) as FaqItemBlockAttributes[ 'style' ];
}

/**
 * FAQラベルの文字スタイルを取得.
 *
 * @param attributes FAQアイテム属性.
 * @return FAQラベルの文字スタイル.
 */
export function getLabelTypography( attributes: FaqItemBlockAttributes ) {
	return attributes.style?.ystdtb?.faqItem?.label?.typography;
}

/**
 * FAQラベルの文字スタイルを更新.
 *
 * @param style                    FAQアイテムのstyle属性.
 * @param typography               FAQラベルの文字スタイル.
 * @param typography.fontFamily    フォントファミリー.
 * @param typography.fontStyle     フォントスタイル.
 * @param typography.fontWeight    フォントウェイト.
 * @param typography.lineHeight    行の高さ.
 * @param typography.textTransform 大文字小文字.
 * @return 更新後のstyle属性.
 */
export function updateLabelTypography(
	style: FaqItemBlockAttributes[ 'style' ],
	typography?: {
		fontFamily?: string;
		fontStyle?: string;
		fontWeight?: string;
		lineHeight?: string;
		textTransform?: string;
	}
) {
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			faqItem: {
				...style?.ystdtb?.faqItem,
				label: {
					...style?.ystdtb?.faqItem?.label,
					typography,
				},
			},
		},
	} ) as FaqItemBlockAttributes[ 'style' ];
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
	const typographyProps = getTypographyClassesAndStyles( attributes );

	return classnames( 'ystdtb-faq-item__contents', {
		[ typographyProps.className ]: typographyProps.className,
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
	const typographyProps = getTypographyClassesAndStyles( attributes );

	return {
		...typographyProps.style,
		color: style?.color?.text,
	};
}

/**
 * 開閉ボタンの色指定に対応するクラスを取得する。
 * @param attributes ブロック属性。
 */
export function getAccordionArrowClasses( attributes: FaqItemBlockAttributes ) {
	return classnames( 'ystdtb-faq-item__arrow', {
		'has-text-color': !! getAccordionArrowColor( attributes ),
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

/**
 * 開閉ボタンの色と余白を保存用CSSへ変換する。
 * @param attributes ブロック属性。
 */
export function getAccordionArrowStyles( attributes: FaqItemBlockAttributes ) {
	return {
		color: presetTokenToCssVar( getAccordionArrowColor( attributes ) ),
		...getCustomSpacingValues(
			getAccordionArrowMargin( attributes ),
			'margin'
		),
	};
}

/**
 * 開閉ボタン色を取得する。
 * @param attributes ブロック属性。
 */
export function getAccordionArrowColor( attributes: FaqItemBlockAttributes ) {
	return attributes.style?.ystdtb?.faqItem?.arrow?.color?.text;
}

/**
 * 他の設定を保持して開閉ボタン色だけを更新・解除する。
 * @param style 現在のスタイル。
 * @param text  開閉ボタン色。
 */
export function updateAccordionArrowColor(
	style: FaqItemBlockAttributes[ 'style' ],
	text?: string
) {
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			faqItem: {
				...style?.ystdtb?.faqItem,
				arrow: {
					...style?.ystdtb?.faqItem?.arrow,
					color: { ...style?.ystdtb?.faqItem?.arrow?.color, text },
				},
			},
		},
	} ) as FaqItemBlockAttributes[ 'style' ];
}
