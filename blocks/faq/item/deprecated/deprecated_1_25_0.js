import classnames from 'classnames';
import SVGIcon from '@aktk/components/svg-icon';
import {
	InnerBlocks,
	getColorClassName,
	getFontSizeClass,
	useBlockProps,
} from '@wordpress/block-editor';

const blockAttributes = {
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
		type: 'number',
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
};

export const deprecated_1_25_0 = [
	{
		attributes: {
			...blockAttributes,
		},
		supports: {
			align: false,
			className: false,
			lightBlockWrapper: true,
			reusable: false,
		},
		migrate( attributes ) {
			let newCustomLabelSize = attributes.customLabelSize;
			if ( 'number' === typeof newCustomLabelSize ) {
				newCustomLabelSize =
					newCustomLabelSize.toString().replace( 'px', '' ) + 'px';
			}
			return {
				...attributes,
				customLabelSize: newCustomLabelSize,
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
							<SVGIcon name={ 'chevron-down' } />
						</div>
					) }
				</div>
			);
		},
	},
];
