import classnames from 'classnames';

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
import type {
	FaqBlockAttributes,
	FaqBorder,
	FaqBorderSide,
} from '@aktk/blocks/block-library/faq/types';

const RESPONSIVE_DEVICES = [ 'desktop', 'tablet', 'mobile' ] as const;
const BORDER_SIDES = [ 'top', 'right', 'bottom', 'left' ] as const;

/**
 * 枠線の色・スタイル・幅が1つ以上設定されているか判定する.
 *
 * @param border 枠線設定.
 * @return 表示に影響する枠線設定があるか.
 */
function hasBorderSideValue( border?: FaqBorderSide ) {
	return !! ( border?.color || border?.style || border?.width );
}

/**
 * FAQルートの枠線設定位置を取得する.
 *
 * @param border 枠線設定.
 * @return 全周、下のみ、または位置クラスなし.
 */
export function getFaqBorderType( border?: FaqBorder ) {
	// 一括指定は従来の全周枠線と同じ余白・連結表示を適用する.
	if ( hasBorderSideValue( border ) ) {
		return 'all';
	}

	const activeSides = BORDER_SIDES.filter( ( side ) =>
		hasBorderSideValue( border?.[ side ] )
	);

	// 四辺すべての個別指定も全周枠線として扱う.
	if ( BORDER_SIDES.length === activeSides.length ) {
		return 'all';
	}

	// 下辺だけの指定は従来の下枠線クラスを維持する.
	if ( 1 === activeSides.length && 'bottom' === activeSides[ 0 ] ) {
		return 'bottom';
	}

	return '';
}

/**
 * FAQルートに表示対象の枠線設定があるか判定する.
 *
 * @param border 枠線設定.
 * @return 枠線設定があるか.
 */
export function hasFaqBorder( border?: FaqBorder ) {
	return (
		hasBorderSideValue( border ) ||
		BORDER_SIDES.some( ( side ) => hasBorderSideValue( border?.[ side ] ) )
	);
}

/**
 * FAQルートへ付与するクラス名を取得する.
 *
 * @param attributes FAQ属性.
 * @return FAQルートのクラス名.
 */
export function getFaqClassNames( attributes: FaqBlockAttributes ) {
	const { isAccordion, backgroundColor, gradient, style } = attributes;
	const borderType = getFaqBorderType( style?.border );
	const hasBorder = hasFaqBorder( style?.border );

	return classnames( 'ystdtb-faq', {
		'is-accordion': isAccordion,
		'has-padding':
			'all' === borderType ||
			backgroundColor ||
			style?.color?.background ||
			gradient ||
			style?.color?.gradient,
		'has-border': hasBorder,
		[ `border-type--${ borderType }` ]: '' !== borderType,
	} );
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
