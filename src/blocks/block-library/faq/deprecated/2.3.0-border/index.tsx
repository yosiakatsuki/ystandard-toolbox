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
import { migrateFaqBorder } from '../migrate';

const RESPONSIVE_DEVICES = [ 'desktop', 'tablet', 'mobile' ] as const;

/**
 * 背景色移行後・枠線移行前のFAQクラス名を取得する.
 *
 * @param attributes 枠線移行前のFAQ属性.
 * @return FAQクラス名.
 */
function getFaqClassNames230Border( attributes: Record< string, any > ) {
	const {
		isAccordion,
		borderType,
		borderSize,
		backgroundColor,
		gradient,
		borderColor,
		customBorderColor,
		style,
	} = attributes;
	const borderColorClass =
		getColorClassName( 'border-color', borderColor ) || '';

	return classnames( 'ystdtb-faq', {
		'is-accordion': isAccordion,
		'has-padding':
			'all' === borderType ||
			backgroundColor ||
			style?.color?.background ||
			gradient ||
			style?.color?.gradient,
		'has-border': borderSize || borderColor || customBorderColor,
		[ borderColorClass ]: borderColorClass,
		[ `border-type--${ borderType }` ]: '' !== borderType,
	} );
}

/**
 * 背景色移行後・枠線移行前のFAQインラインスタイルを取得する.
 *
 * @param attributes 枠線移行前のFAQ属性.
 * @return FAQインラインスタイル.
 */
function getFaqStyle230Border( attributes: Record< string, any > ) {
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
 * 背景色移行後・枠線移行前のレスポンシブタイポグラフィを取得する.
 *
 * @param attributes 枠線移行前のFAQ属性.
 * @return レスポンシブタイポグラフィのCSSカスタムプロパティ.
 */
function getResponsiveTypographyStyles230Border(
	attributes: Record< string, any >
) {
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
export const deprecated230Border = [
	{
		attributes: {
			isAccordion: {
				type: 'boolean',
				default: false,
			},
			backgroundColor: {
				type: 'string',
			},
			gradient: {
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
			color: {
				background: true,
				gradients: true,
				__experimentalDefaultControls: {
					background: true,
				},
			},
			spacing: {
				margin: [ 'top', 'bottom' ],
				padding: true,
				__experimentalDefaultControls: {
					margin: false,
					padding: false,
				},
			},
		},
		migrate: migrateFaqBorder,
		// @ts-ignore.
		save( { attributes } ) {
			const blockProps = useBlockProps.save( {
				className: getFaqClassNames230Border( attributes ),
				style: {
					...getFaqStyle230Border( attributes ),
					...getResponsiveTypographyStyles230Border( attributes ),
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
