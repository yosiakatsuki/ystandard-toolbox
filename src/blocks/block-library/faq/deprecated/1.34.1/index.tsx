import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';

/* Block Dependencies */
import { migrateFaqAttributes } from '../migrate';

/**
 * v1.34.1以前のFAQ属性を現行形式へ移行する.
 *
 * @param attributes v1.34.1以前のFAQ属性.
 * @return 現行FAQ属性.
 */
export function migrateDeprecated1341Faq( attributes: Record< string, any > ) {
	return migrateFaqAttributes( attributes );
}

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
		migrate: migrateDeprecated1341Faq,
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
