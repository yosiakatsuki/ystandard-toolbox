import { InnerBlocks, getColorClassName } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function({ attributes }) {
	const {
		className,
		isAccordion,
		borderType,
		borderSize,
		backgroundColor,
		customBackgroundColor,
		borderColor,
		customBorderColor,
	} = attributes;

	const backgroundColorClass = getColorClassName(
		'background-color',
		backgroundColor
	);
	const borderColorClass = getColorClassName('border-color', borderColor);

	const faqClasses = classnames('ystdtb-faq', className, {
		'is-accordion': isAccordion,
		'has-padding': 'all' === borderType || backgroundColor,
		'has-background': backgroundColor || customBackgroundColor,
		[backgroundColorClass]: backgroundColorClass,
		'has-border': borderSize || borderColor || customBorderColor,
		[borderColorClass]: borderColorClass,
		[`border-type--${borderType}`]: '' !== borderType,
	});

	const faqStyle = {
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

	return (
		<div className={faqClasses} style={faqStyle}>
			<InnerBlocks.Content />
		</div>
	);
}
