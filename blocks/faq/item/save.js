import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	getFontSizeClass,
} from '@wordpress/block-editor';

export default function ( { attributes } ) {
	const {
		className,
		faqType,
		faqBorderType,
		faqBorderSize,
		labelBorderSize,
		labelBorderRadius,
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
	} = attributes;

	const faqBackgroundColorClass = getColorClassName(
		'background-color',
		faqBackgroundColor
	);
	const faqBorderColorClass = getColorClassName(
		'border-color',
		faqBorderColor
	);
	const labelColorClass = getColorClassName(
		'color',
		labelColor
	);
	const labelBackgroundColorClass = getColorClassName(
		'background-color',
		labelBackgroundColor
	);
	const labelBorderColorClass = getColorClassName(
		'border-color',
		labelBorderColor
	);

	const labelSizeClass = getFontSizeClass( labelSize );

	const itemClasses = classnames(
		'ystdtb-faq-item', className,
		{
			[ `is-faq--${ faqType }` ]: faqType,
			[ `has-border-${ faqBorderType }` ]: '' !== faqBorderType,
			'has-background': faqBackgroundColor || customFaqBackgroundColor,
			[ faqBackgroundColorClass ]: faqBackgroundColorClass,
			'has-border': faqBorderColor || customFaqBorderColor,
			[ faqBorderColorClass ]: faqBorderColorClass,
		}
	);
	const itemStyles = {
		backgroundColor: faqBackgroundColorClass ? undefined : customFaqBackgroundColor,
		borderColor: faqBorderColorClass ? undefined : customFaqBorderColor,
		borderWidth: 0 === faqBorderSize ? undefined : faqBorderSize + 'px',
	};

	const labelClasses = classnames(
		'ystdtb-faq-item__label',
		{
			[ labelSizeClass ]: labelSizeClass,
			'has-text-color': labelColor || customLabelColor,
			[ labelColorClass ]: labelColorClass,
			'has-background': labelBackgroundColor || customLabelBackgroundColor,
			[ labelBackgroundColorClass ]: labelBackgroundColorClass,
			'has-border': labelBorderColor || customLabelBorderColor,
			[ labelBorderColorClass ]: labelBorderColorClass,
			'has-padding': labelBackgroundColor || customLabelBackgroundColor || labelBorderColor || customLabelBorderColor || labelBorderSize,
		}
	);
	const labelStyles = {
		fontSize: labelSizeClass ? undefined : customLabelSize,
		color: labelColorClass ? undefined : customLabelColor,
		fontWeight: labelBold ? undefined : 400,
		backgroundColor: labelBackgroundColorClass
			? undefined
			: customLabelBackgroundColor,
		borderColor: labelBorderColorClass ? undefined : customLabelBorderColor,
		borderWidth: 0 === labelBorderSize ? undefined : labelBorderSize + 'px',
		borderRadius: 0 === labelBorderRadius ? undefined : labelBorderRadius + 'px',
	};

	const labelTextClasses = classnames( 'ystdtb-faq-item__label-text', {} );

	const contentsClasses = classnames( 'ystdtb-faq-item__contents', {} );


	return (
		<dl className={ itemClasses } style={ itemStyles }>
			<dt className={ labelClasses } style={ labelStyles }>
				<span className={ labelTextClasses }>
					{ faqType }
				</span>
			</dt>
			<dd className={ contentsClasses }>
				<InnerBlocks.Content/>
			</dd>
		</dl>
	);
}
