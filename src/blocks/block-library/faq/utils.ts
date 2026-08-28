import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import { getColorClassName } from '@wordpress/block-editor';

/**
 * Aktk dependencies.
 */
import type { ResponsiveFontSize } from '@aktk/block-components/components/responsive-font-size-control';
import type { ResponsiveTextAlign } from '@aktk/block-components/components/responsive-text-align-control';
import { stripUndefined } from '@aktk/block-components/utils/object';
import { getResponsiveCustomPropName } from '@aktk/block-components/utils/responsive-value';

/**
 * Block dependencies.
 */
import type { FaqBlockAttributes } from '@aktk/blocks/block-library/faq/types';

const RESPONSIVE_DEVICES = [ 'desktop', 'tablet', 'mobile' ] as const;

export function getFaqClassNames( attributes: FaqBlockAttributes ) {
	const {
		isAccordion,
		borderType,
		borderSize,
		backgroundColor,
		borderColor,
		customBorderColor,
		style,
	} = attributes;

	const borderColorClass =
		getColorClassName( 'border-color', borderColor ) || '';

	return classnames( 'ystdtb-faq', {
		'is-accordion': isAccordion,
		'has-padding':
			'all' === borderType || backgroundColor || style?.color?.background,
		'has-border': borderSize || borderColor || customBorderColor,
		[ borderColorClass ]: borderColorClass,
		[ `border-type--${ borderType }` ]: '' !== borderType,
	} );
}

export function getFaqStyle( attributes: FaqBlockAttributes ) {
	const { borderType, borderSize, borderColor, customBorderColor } =
		attributes;

	const borderColorClass =
		getColorClassName( 'border-color', borderColor ) || '';

	return {
		borderColor: borderColorClass ? undefined : customBorderColor,
		borderWidth: 'all' === borderType ? borderSize : undefined,
		borderBottomWidth:
			'bottom' === borderType || 'all' === borderType
				? borderSize
				: undefined,
	};
}

/**
 * FAQのレスポンシブタイポグラフィ設定を取得.
 *
 * @param attributes ブロック属性.
 * @return レスポンシブタイポグラフィ設定.
 */
export function getResponsiveTypography( attributes: FaqBlockAttributes ) {
	return attributes.style?.ystdtb?.faq?.responsive?.typography;
}

/**
 * FAQのレスポンシブフォントサイズを更新.
 *
 * @param style    コアのstyle属性.
 * @param fontSize レスポンシブフォントサイズ.
 * @return 更新後のstyle属性.
 */
export function updateResponsiveFontSize(
	style: FaqBlockAttributes[ 'style' ],
	fontSize?: ResponsiveFontSize
) {
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			faq: {
				...style?.ystdtb?.faq,
				responsive: {
					...style?.ystdtb?.faq?.responsive,
					typography: {
						...style?.ystdtb?.faq?.responsive?.typography,
						fontSize,
					},
				},
			},
		},
	} ) as FaqBlockAttributes[ 'style' ];
}

/**
 * FAQのレスポンシブ文字揃えを更新.
 *
 * @param style     コアのstyle属性.
 * @param textAlign レスポンシブ文字揃え.
 * @return 更新後のstyle属性.
 */
export function updateResponsiveTextAlign(
	style: FaqBlockAttributes[ 'style' ],
	textAlign?: ResponsiveTextAlign
) {
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			faq: {
				...style?.ystdtb?.faq,
				responsive: {
					...style?.ystdtb?.faq?.responsive,
					typography: {
						...style?.ystdtb?.faq?.responsive?.typography,
						textAlign,
					},
				},
			},
		},
	} ) as FaqBlockAttributes[ 'style' ];
}

/**
 * FAQのレスポンシブタイポグラフィをCSSカスタムプロパティへ変換.
 *
 * @param attributes ブロック属性.
 * @return CSSカスタムプロパティ.
 */
export function getResponsiveTypographyStyles(
	attributes: FaqBlockAttributes
) {
	const typography = getResponsiveTypography( attributes );
	const styles: Record< string, string > = {};

	RESPONSIVE_DEVICES.forEach( ( device ) => {
		const fontSize = typography?.fontSize?.[ device ];
		const textAlign = typography?.textAlign?.[ device ];

		// 指定があるデバイスだけフォントサイズを出力する.
		if ( fontSize ) {
			styles[
				getResponsiveCustomPropName(
					'ystdtb',
					'faq--font-size',
					device
				)
			] = fontSize;
		}

		// 指定があるデバイスだけ文字揃えを出力する.
		if ( textAlign ) {
			styles[
				getResponsiveCustomPropName(
					'ystdtb',
					'faq--text-align',
					device
				)
			] = textAlign;
		}
	} );

	return styles;
}
