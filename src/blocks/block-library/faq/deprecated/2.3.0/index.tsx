import classnames from 'classnames';

/* WordPress Dependencies */
import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';

/* Aktk Dependencies */
import { getResponsiveCustomPropName } from '@aktk/block-components/utils/responsive-value';

/* Block Dependencies */
import { migrateFaqBackgroundColor } from '../migrate';

const RESPONSIVE_DEVICES = [ 'desktop', 'tablet', 'mobile' ] as const;

/**
 * v2.3.0時点のFAQクラス名を取得する.
 *
 * @param attributes v2.3.0時点のFAQ属性.
 * @return FAQクラス名.
 */
function getFaqClassNames230( attributes: Record< string, any > ) {
	const {
		isAccordion,
		borderType,
		borderSize,
		backgroundColor,
		customBackgroundColor,
		borderColor,
		customBorderColor,
	} = attributes;
	const backgroundColorClass =
		getColorClassName( 'background-color', backgroundColor ) || '';
	const borderColorClass =
		getColorClassName( 'border-color', borderColor ) || '';

	return classnames( 'ystdtb-faq', {
		'is-accordion': isAccordion,
		'has-padding':
			'all' === borderType || backgroundColor || customBackgroundColor,
		'has-background': backgroundColor || customBackgroundColor,
		[ backgroundColorClass ]: backgroundColorClass,
		'has-border': borderSize || borderColor || customBorderColor,
		[ borderColorClass ]: borderColorClass,
		[ `border-type--${ borderType }` ]: '' !== borderType,
	} );
}

/**
 * v2.3.0時点のFAQインラインスタイルを取得する.
 *
 * @param attributes v2.3.0時点のFAQ属性.
 * @return FAQインラインスタイル.
 */
function getFaqStyle230( attributes: Record< string, any > ) {
	const {
		borderType,
		borderSize,
		backgroundColor,
		customBackgroundColor,
		borderColor,
		customBorderColor,
	} = attributes;
	const backgroundColorClass =
		getColorClassName( 'background-color', backgroundColor ) || '';
	const borderColorClass =
		getColorClassName( 'border-color', borderColor ) || '';

	return {
		backgroundColor: backgroundColorClass
			? undefined
			: customBackgroundColor,
		borderColor: borderColorClass ? undefined : customBorderColor,
		borderWidth: 'all' === borderType ? borderSize : undefined,
		borderBottomWidth:
			'bottom' === borderType || 'all' === borderType
				? borderSize
				: undefined,
	};
}

/**
 * v2.3.0時点のレスポンシブタイポグラフィを取得する.
 *
 * @param attributes v2.3.0時点のFAQ属性.
 * @return レスポンシブタイポグラフィのCSSカスタムプロパティ.
 */
function getResponsiveTypographyStyles230( attributes: Record< string, any > ) {
	const typography = attributes.style?.ystdtb?.faq?.responsive?.typography;
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

// @ts-ignore.
export const deprecated230 = [
	{
		attributes: {
			isAccordion: {
				type: 'boolean',
				default: false,
			},
			backgroundColor: {
				type: 'string',
			},
			customBackgroundColor: {
				type: 'string',
			},
			borderType: {
				type: 'string',
				default: '',
			},
			borderSize: {
				type: 'string',
			},
			borderColor: {
				type: 'string',
			},
			customBorderColor: {
				type: 'string',
			},
			accordionArrowColor: {
				type: 'string',
			},
			customAccordionArrowColor: {
				type: 'string',
			},
			fontSize: {
				type: 'string',
			},
			fontFamily: {
				type: 'string',
			},
			style: {
				type: 'object',
			},
		},
		supports: {
			align: false,
			className: false,
			listView: true,
			typography: {
				fontSize: true,
				lineHeight: true,
				textAlign: true,
				__experimentalFontFamily: true,
				__experimentalFontStyle: true,
				__experimentalFontWeight: true,
				__experimentalLetterSpacing: true,
				__experimentalTextTransform: true,
				__experimentalTextDecoration: true,
				__experimentalWritingMode: true,
				__experimentalDefaultControls: {
					fontSize: true,
				},
			},
		},
		migrate: migrateFaqBackgroundColor,
		// @ts-ignore.
		save( { attributes } ) {
			const blockProps = useBlockProps.save( {
				className: getFaqClassNames230( attributes ),
				style: {
					...getFaqStyle230( attributes ),
					...getResponsiveTypographyStyles230( attributes ),
				},
			} );

			return (
				<div { ...blockProps }>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];
