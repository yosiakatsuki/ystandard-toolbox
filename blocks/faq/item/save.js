import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	getFontSizeClass,
} from '@wordpress/block-editor';
import SVGIcon from '../../../src/js/blocks/component/svg-icon';

export default function ( { attributes } ) {
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

	const faqTextColorClass = getColorClassName( 'color', faqTextColor );
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
		'has-background': faqBackgroundColor || customFaqBackgroundColor,
		[ faqBackgroundColorClass ]: faqBackgroundColorClass,
		'has-border': faqBorderColor || customFaqBorderColor,
		[ faqBorderColorClass ]: faqBorderColorClass,
	} );
	const itemStyles = {
		backgroundColor: faqBackgroundColorClass
			? undefined
			: customFaqBackgroundColor,
		borderColor: faqBorderColorClass ? undefined : customFaqBorderColor,
		borderWidth: 0 === faqBorderSize ? undefined : faqBorderSize + 'px',
	};

	const labelClasses = classnames( 'ystdtb-faq-item__label', {
		[ labelSizeClass ]: labelSizeClass,
		'has-text-color': labelColor || customLabelColor,
		[ labelColorClass ]: labelColorClass,
		'has-background': labelBackgroundColor || customLabelBackgroundColor,
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
		borderColor: labelBorderColorClass ? undefined : customLabelBorderColor,
		borderWidth: 0 === labelBorderSize ? undefined : labelBorderSize + 'px',
		borderRadius:
			0 === labelBorderRadius ? undefined : labelBorderRadius + 'px',
		alignSelf: 'center' === labelPosition ? undefined : labelPosition,
	};

	const labelTextClasses = classnames( 'ystdtb-faq-item__label-text', {} );

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
		'has-text-color': accordionArrowColorClass || customAccordionArrowColor,
		[ accordionArrowColorClass ]: accordionArrowColorClass,
	} );
	const accordionArrowStyle = {
		color: accordionArrowColorClass ? undefined : customAccordionArrowColor,
		alignSelf: 'center' === labelPosition ? undefined : labelPosition,
	};

	return (
		<div className={ itemClasses } style={ itemStyles }>
			<div className={ labelClasses } style={ labelStyles }>
				<span className={ labelTextClasses }>{ faqType }</span>
			</div>
			<div className={ contentsClasses } style={ contentsStyles }>
				<InnerBlocks.Content/>
			</div>
			{ 'q' === faqType && (
				<div
					className={ accordionArrowClass }
					style={ accordionArrowStyle }
				>
					<SVGIcon name={ 'chevron-down' }/>
				</div>
			) }
		</div>
	);
}
