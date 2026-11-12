import classnames from 'classnames';

/* WordPress Dependencies */
import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';

/* Block Dependencies */
import { migrateFaqAttributes } from '../migrate';
import { hasLegacyAccordionArrowColor } from '../arrow-color';

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
		},
		supports: {
			align: false,
			className: false,
			listView: true,
		},
		isEligible: hasLegacyAccordionArrowColor,
		migrate: migrateFaqAttributes,
		// @ts-ignore.
		save( { attributes } ) {
			const blockProps = useBlockProps.save( {
				className: getFaqClassNames230( attributes ),
				style: getFaqStyle230( attributes ),
			} );

			return (
				<div { ...blockProps }>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];
