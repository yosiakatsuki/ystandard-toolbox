import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	getFontSizeClass,
	useBlockProps,
} from '@wordpress/block-editor';
/*
 * Aktk Dependencies
 */
import { SvgIcon } from '@aktk/block-components/components/svg-icon';
export const deprecated1341 = [
	{
		attributes: {
			boxStyle: {
				type: 'string',
				default: 'label-none',
			},
			boxBackgroundColor: {
				type: 'string',
			},
			customBoxBackgroundColor: {
				type: 'string',
			},
			boxTextColor: {
				type: 'string',
			},
			customBoxTextColor: {
				type: 'string',
			},
			boxBorderColor: {
				type: 'string',
			},
			customBoxBorderColor: {
				type: 'string',
			},
			boxBorderSize: {
				type: 'string',
				default: '1px',
			},
			boxBorderStyle: {
				type: 'string',
				default: 'solid',
			},
			boxBorderRadius: {
				type: 'string',
			},
			boxPadding: {
				type: 'object',
			},
			isResponsiveBoxPadding: {
				type: 'boolean',
				default: false,
			},
			label: {
				type: 'string',
			},
			labelIcon: {
				type: 'string',
			},
			labelFontSize: {
				type: 'string',
			},
			customLabelFontSize: {
				type: 'string',
				default: '0.9em',
			},
			labelWeight: {
				type: 'string',
				default: 'normal',
			},
			labelBackgroundColor: {
				type: 'string',
			},
			customLabelBackgroundColor: {
				type: 'string',
			},
			labelTextColor: {
				type: 'string',
			},
			customLabelTextColor: {
				type: 'string',
			},
			labelBorderRadius: {
				type: 'string',
			},
			backgroundImage: {
				type: 'object',
			},
			backgroundImageCoverOpacity: {
				type: 'number',
				default: 0.8,
			},
			backgroundImageRepeat: {
				type: 'string',
				default: 'no-repeat',
			},
		},
		supports: {
			anchor: false,
			align: false,
			className: false,
			lightBlockWrapper: true,
		},
		migrate: ( attributes: any ) => {
			const { labelBorderRadius, labelBorderSize } = attributes;
			return {
				...attributes,
				labelBorderRadius: labelBorderRadius
					? `${ labelBorderRadius }px`
					: undefined,
				labelBorderSize: labelBorderSize
					? `${ labelBorderSize }`
					: undefined,
			};
		},
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
						<div
							className={ accordionArrowClass }
							style={ accordionArrowStyle }
						>
							<SvgIcon.Content name={ 'chevron-down' } />
						</div>
					) }
				</div>
			);
		},
	},
];
