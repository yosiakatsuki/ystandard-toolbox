import classnames from 'classnames';

/**
 * Aktk dependencies.
 */
import type { Spacing } from '@aktk/block-components/components/custom-spacing-select';
import type { ResponsiveFontSize } from '@aktk/block-components/components/responsive-font-size-control';
import { stripUndefined } from '@aktk/block-components/utils/object';
import { getResponsiveCustomPropName } from '@aktk/block-components/utils/responsive-value';

/**
 * Block dependencies.
 */
import type { FaqBlockAttributes } from '@aktk/blocks/block-library/faq/types';

const RESPONSIVE_DEVICES = [ 'desktop', 'tablet', 'mobile' ] as const;

/**
 * FAQルートへ付与するクラス名を取得する.
 *
 * @param attributes FAQ属性.
 * @return FAQルートのクラス名.
 */
export function getFaqClassNames( attributes: FaqBlockAttributes ) {
	const { isAccordion } = attributes;

	return classnames( 'ystdtb-faq', {
		'is-accordion': isAccordion,
	} );
}

/**
 * FAQの開閉ボタン余白を取得.
 *
 * @param attributes ブロック属性.
 * @return 開閉ボタンのmargin設定.
 */
export function getAccordionArrowMargin( attributes: FaqBlockAttributes ) {
	return attributes.style?.ystdtb?.faq?.arrow?.spacing?.margin;
}

/**
 * FAQの開閉ボタン余白を更新.
 *
 * @param style  コアのstyle属性.
 * @param margin 開閉ボタンのmargin設定.
 * @return 更新後のstyle属性.
 */
export function updateAccordionArrowMargin(
	style: FaqBlockAttributes[ 'style' ],
	margin?: Spacing
) {
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			faq: {
				...style?.ystdtb?.faq,
				arrow: {
					...style?.ystdtb?.faq?.arrow,
					spacing: {
						...style?.ystdtb?.faq?.arrow?.spacing,
						margin,
					},
				},
			},
		},
	} ) as FaqBlockAttributes[ 'style' ];
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
	} );

	return styles;
}
