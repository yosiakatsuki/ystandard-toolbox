import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import {
	getColorClassName,
	getTypographyClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
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
import type { FaqItemBlockAttributes, FaqLabelStyle } from './types';
import { responsiveStyles, responsiveSpacingStyles } from './style-utils';
import { hasFaqBorder } from '../faq/utils';

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
	const { faqType, style } = attributes;

	return classnames( 'ystdtb-faq-item', {
		[ `is-faq--${ faqType }` ]: faqType,
		'has-border': hasFaqBorder( style?.border ),
	} );
}

/**
 * FAQアイテムのスタイルを取得
 * @param attributes
 */
export function getItemStyles( attributes: FaqItemBlockAttributes ) {
	const item = attributes.style?.ystdtb?.faqItem?.item;
	return {
		alignItems:
			item?.layout?.alignItems === 'center'
				? undefined
				: item?.layout?.alignItems,
		'--ystdtb--faq-item--label-gap':
			item?.spacing?.gap === '0'
				? '0px'
				: presetTokenToCssVar( item?.spacing?.gap ),
		...responsiveStyles( 'label-gap', item?.responsive?.spacing?.gap ),
	};
}

/**
 * FAQラベルのクラス名を取得
 * @param attributes
 */
export function getLabelClasses( attributes: FaqItemBlockAttributes ): string {
	const label = attributes.style?.ystdtb?.faqItem?.label;
	const background = label?.color?.background;
	const border = label?.border;
	return classnames( 'ystdtb-faq-item__label', {
		'has-background': !! background,
		'has-border': !! border?.color,
		'has-padding':
			!! background ||
			!! border?.color ||
			hasBorderWidth( border?.width ),
	} );
}

/**
 * FAQラベルのスタイルを取得
 * @param attributes
 */
export function getLabelStyles( attributes: FaqItemBlockAttributes ) {
	const label = attributes.style?.ystdtb?.faqItem?.label;
	const typography = getLabelTypography( attributes );
	return {
		fontSize: presetTokenToCssVar( typography?.fontSize ),
		fontFamily: presetTokenToCssVar( typography?.fontFamily ),
		fontStyle: typography?.fontStyle,
		fontWeight: typography?.fontWeight,
		lineHeight: typography?.lineHeight,
		textTransform: typography?.textTransform,
		color: presetTokenToCssVar( label?.color?.text ),
		backgroundColor: presetTokenToCssVar( label?.color?.background ),
		borderColor: presetTokenToCssVar( label?.border?.color ),
		borderWidth: label?.border?.width,
		borderRadius: label?.border?.radius,
		borderStyle: label?.border?.style,
		'--ystdtb--faq-item--label-size': label?.dimensions?.size,
		marginTop: presetTokenToCssVar( label?.spacing?.margin?.top ),
		marginBottom: presetTokenToCssVar( label?.spacing?.margin?.bottom ),
		...responsiveStyles(
			'label-font-size',
			label?.responsive?.typography?.fontSize
		),
		...responsiveStyles(
			'label-size',
			label?.responsive?.dimensions?.size
		),
		...responsiveSpacingStyles(
			'label-margin',
			label?.responsive?.spacing?.margin,
			[ 'top', 'bottom' ]
		),
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
	typography?: FaqLabelStyle[ 'typography' ]
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
		...getSpacingClassesAndStyles( attributes ).style,
		...responsiveSpacingStyles(
			'contents-padding',
			style?.ystdtb?.faqItem?.contents?.responsive?.spacing?.padding
		),
		...responsiveStyles(
			'contents-font-size',
			style?.ystdtb?.faqItem?.contents?.responsive?.typography?.fontSize
		),
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
