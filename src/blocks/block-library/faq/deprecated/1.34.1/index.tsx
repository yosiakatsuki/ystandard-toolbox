import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';

// @ts-ignore.
export const deprecated1341 = [
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
				type: 'number',
				default: 0,
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
		},
		supports: {
			align: false,
			className: false,
		},
		migrate: ( attributes: any ) => {
			const { borderSize } = attributes;
			return {
				...attributes,
				borderSize:
					typeof borderSize === 'number'
						? `${ borderSize }px`
						: borderSize,
			};
		},
		// @ts-ignore.
		save( { attributes } ) {
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
			const borderColorClass = getColorClassName(
				'border-color',
				borderColor
			);

			const faqClasses = classnames( 'ystdtb-faq', className, {
				'is-accordion': isAccordion,
				'has-padding': 'all' === borderType || backgroundColor,
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundColorClass ]: backgroundColorClass,
				'has-border': borderSize || borderColor || customBorderColor,
				[ borderColorClass ]: borderColorClass,
				[ `border-type--${ borderType }` ]: '' !== borderType,
			} );

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

			const blockProps = useBlockProps.save( {
				className: faqClasses,
				style: faqStyle,
			} );

			return (
				<div { ...blockProps }>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];
