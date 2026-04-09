import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	getFontSizeClass,
	useBlockProps,
} from '@wordpress/block-editor';
// @ts-ignore.
export const deprecated1341 = [
	{
		attributes: {
			faqType: {
				type: 'string',
				default: 'q',
			},
			faqTextColor: {
				type: 'string',
			},
			customFaqTextColor: {
				type: 'string',
			},
			faqBackgroundColor: {
				type: 'string',
			},
			customFaqBackgroundColor: {
				type: 'string',
			},
			faqBorderType: {
				type: 'string',
				default: '',
			},
			faqBorderSize: {
				type: 'number',
				default: 0,
			},
			faqBorderColor: {
				type: 'string',
			},
			customFaqBorderColor: {
				type: 'string',
			},
			labelPosition: {
				type: 'string',
				default: 'center',
			},
			labelSize: {
				type: 'string',
			},
			customLabelSize: {
				type: 'string',
			},
			labelColor: {
				type: 'string',
			},
			customLabelColor: {
				type: 'string',
			},
			labelBold: {
				type: 'bool',
				default: true,
			},
			labelBackgroundColor: {
				type: 'string',
			},
			customLabelBackgroundColor: {
				type: 'string',
			},
			labelBorderSize: {
				type: 'number',
				default: 0,
			},
			labelBorderRadius: {
				type: 'number',
				default: 0,
			},
			labelBorderColor: {
				type: 'string',
			},
			customLabelBorderColor: {
				type: 'string',
			},
			accordionArrowColor: {
				type: 'string',
			},
			customAccordionArrowColor: {
				type: 'string',
			},
			// v1 互換: アコーディオン矢印 SVG はアイコンライブラリ差し替えで
			// 再現不能なため、保存済み HTML から直接吸い出して戻す。
			legacyArrowInnerHtml: {
				type: 'string',
				source: 'html',
				selector: '.ystdtb-faq-item__arrow',
			},
		},
		supports: {
			anchor: false,
			align: false,
			className: false,
		},
		migrate: ( attributes: any ) => {
			const {
				labelBorderRadius,
				labelBorderSize,
				faqBorderSize,
				// v1 互換用属性は v2 へ持ち越さない.
				legacyArrowInnerHtml: _legacyArrowInnerHtml,
				...rest
			} = attributes;
			return {
				...rest,
				labelBorderRadius: labelBorderRadius
					? `${ labelBorderRadius }px`
					: undefined,
				labelBorderSize: labelBorderSize
					? `${ labelBorderSize }px`
					: undefined,
				faqBorderSize: faqBorderSize
					? `${ faqBorderSize }px`
					: undefined,
			};
		},
		// @ts-ignore.
		save( { attributes } ) {
			const {
				className,
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
				legacyArrowInnerHtml,
			} = attributes;

			const faqTextColorClass = getColorClassName(
				'color',
				faqTextColor
			);
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

			const labelSizeClass = getFontSizeClass( labelSize );

			const itemClasses = classnames( 'ystdtb-faq-item', className, {
				[ `is-faq--${ faqType }` ]: faqType,
				[ `has-border-${ faqBorderType }` ]: '' !== faqBorderType,
				'has-background':
					faqBackgroundColor || customFaqBackgroundColor,
				[ faqBackgroundColorClass ]: faqBackgroundColorClass,
				'has-border': faqBorderColor || customFaqBorderColor,
				[ faqBorderColorClass ]: faqBorderColorClass,
			} );
			const itemStyles = {
				backgroundColor: faqBackgroundColorClass
					? undefined
					: customFaqBackgroundColor,
				borderColor: faqBorderColorClass
					? undefined
					: customFaqBorderColor,
				borderWidth:
					0 === faqBorderSize ? undefined : faqBorderSize + 'px',
				alignItems:
					'center' === labelPosition ? undefined : labelPosition,
			};

			const labelClasses = classnames( 'ystdtb-faq-item__label', {
				[ labelSizeClass ]: labelSizeClass,
				'has-text-color': labelColor || customLabelColor,
				[ labelColorClass ]: labelColorClass,
				'has-background':
					labelBackgroundColor || customLabelBackgroundColor,
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
			const labelStyles = {
				fontSize: labelSizeClass ? undefined : customLabelSize,
				color: labelColorClass ? undefined : customLabelColor,
				fontWeight: labelBold ? undefined : 400,
				backgroundColor: labelBackgroundColorClass
					? undefined
					: customLabelBackgroundColor,
				borderColor: labelBorderColorClass
					? undefined
					: customLabelBorderColor,
				borderWidth:
					0 === labelBorderSize || ! labelBorderSize
						? undefined
						: labelBorderSize + 'px',
				borderRadius:
					0 === labelBorderRadius || ! labelBorderRadius
						? undefined
						: labelBorderRadius + 'px',
			};

			const labelTextClasses = classnames(
				'ystdtb-faq-item__label-text',
				{}
			);

			const contentsClasses = classnames( 'ystdtb-faq-item__contents', {
				'has-text-color': faqTextColor || customFaqTextColor,
				[ faqTextColorClass ]: faqTextColorClass,
			} );

			const contentsStyles = {
				color: faqTextColorClass ? undefined : customFaqTextColor,
			};

			const accordionArrowColorClass = getColorClassName(
				'color',
				accordionArrowColor
			);
			const accordionArrowClass = classnames( 'ystdtb-faq-item__arrow', {
				'has-text-color':
					accordionArrowColorClass || customAccordionArrowColor,
				[ accordionArrowColorClass ]: accordionArrowColorClass,
			} );
			const accordionArrowStyle = {
				color: accordionArrowColorClass
					? undefined
					: customAccordionArrowColor,
			};

			const blockProps = useBlockProps.save( {
				className: itemClasses,
				style: itemStyles,
			} );

			return (
				<div { ...blockProps }>
					<div className={ labelClasses } style={ labelStyles }>
						<span className={ labelTextClasses }>{ faqType }</span>
					</div>
					<div className={ contentsClasses } style={ contentsStyles }>
						<InnerBlocks.Content />
					</div>
					{ 'q' === faqType && (
						// 矢印 SVG は v1/v2 でアイコンライブラリが異なるため、
						// 保存済み HTML をそのまま戻して 1 バイト差を防ぐ.
						<div
							className={ accordionArrowClass }
							style={ accordionArrowStyle }
							dangerouslySetInnerHTML={ {
								__html: legacyArrowInnerHtml || '',
							} }
						/>
					) }
				</div>
			);
		},
	},
];
