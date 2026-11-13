/* Aktk Dependencies */
import { stripUndefined } from '@aktk/block-components/utils/object';
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';
import { getResponsiveCustomPropName } from '@aktk/block-components/utils/responsive-value';
import type { ResponsiveFontSize } from '@aktk/block-components/components/responsive-font-size-control';
import type { ResponsiveSpacing } from '@aktk/block-components/components/responsive-spacing-control';

/* Block Dependencies */
import type { FaqItemBlockAttributes, FaqItemStyle } from './types';

/**
 * 他要素の設定を保持して、指定要素のスタイルを更新・解除する。
 * @param style   現在のスタイル。
 * @param element 更新する要素。
 * @param value   設定値。
 */
export function updateFaqItemElement< K extends keyof FaqItemStyle >(
	style: FaqItemBlockAttributes[ 'style' ],
	element: K,
	value: FaqItemStyle[ K ]
) {
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			faqItem: { ...style?.ystdtb?.faqItem, [ element ]: value },
		},
	} ) as FaqItemBlockAttributes[ 'style' ];
}

/**
 * 指定した端末だけに適用するCSSカスタムプロパティを生成する。
 * @param name   CSSカスタムプロパティの接尾辞。
 * @param values 端末別の値。
 */
export function responsiveStyles( name: string, values?: ResponsiveFontSize ) {
	const result: Record< string, string > = {};
	( [ 'desktop', 'tablet', 'mobile' ] as const ).forEach( ( device ) => {
		const value = values?.[ device ];
		// 未指定端末は通常値へ戻す。間隔の0はcalcの長さ演算に使うためpxを補う。
		if ( value !== undefined && value !== '' ) {
			result[
				getResponsiveCustomPropName(
					'ystdtb',
					`faq-item--${ name }`,
					device
				)
			] =
				name === 'label-gap' && value === '0'
					? '0px'
					: presetTokenToCssVar( value ) ?? value;
		}
	} );
	return result;
}

/**
 * 辺別のレスポンシブ余白をCSSカスタムプロパティへ変換する。
 * @param name   CSSカスタムプロパティの接尾辞。
 * @param values 端末別の値。
 * @param sides  出力する辺。
 */
export function responsiveSpacingStyles(
	name: string,
	values?: ResponsiveSpacing,
	sides: readonly ( 'top' | 'right' | 'bottom' | 'left' )[] = [
		'top',
		'right',
		'bottom',
		'left',
	]
) {
	return Object.assign(
		{},
		...sides.map( ( side ) =>
			responsiveStyles( `${ name }-${ side }`, {
				desktop: values?.desktop?.[ side ],
				tablet: values?.tablet?.[ side ],
				mobile: values?.mobile?.[ side ],
			} )
		)
	);
}
