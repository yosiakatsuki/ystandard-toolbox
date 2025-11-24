import { ChevronDown } from 'react-feather';
/*
 * WordPress Dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	withColors,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/*
 * Plugin Dependencies
 */
import {
	getLabelClasses,
	getLabelStyles,
	getItemClasses,
	getItemStyles,
	getContentsClasses,
	getContentsStyles,
	getAccordionArrowClasses,
	getAccordionArrowStyles,
} from './utils';
import { InspectorControls } from './inspector-controls';
import type { FaqItemEditProps } from './types';
import { compose } from '@wordpress/compose';

/**
 * FAQアイテムの初期テンプレート
 */
const template: [ string, Record< string, any > ][] = [
	[
		'core/paragraph',
		{ placeholder: __( 'Q&A項目…', 'ystandard-toolbox' ) },
	],
];

/**
 * FAQアイテムブロック編集コンポーネント
 * @param props
 */
function FaqItemEdit( props: FaqItemEditProps ) {
	const {
		attributes,
		faqTextColor,
		faqBackgroundColor,
		faqBorderColor,
		labelColor,
		labelBackgroundColor,
		labelBorderColor,
		accordionArrowColor,
	} = props;
	const { faqType, labelBorderSize } = attributes;

	// FAQアイテムブロックProps
	const blockProps = useBlockProps( {
		className: getItemClasses( {
			...attributes,
			customFaqBackgroundColor: faqBackgroundColor?.color,
			customFaqBorderColor: faqBorderColor?.color,
		} ),
		style: getItemStyles( {
			...attributes,
			customFaqBackgroundColor: faqBackgroundColor?.color,
			customFaqBorderColor: faqBorderColor?.color,
		} ),
	} );

	// FAQラベルのクラス名とスタイル
	const labelProps = {
		className: getLabelClasses( {
			...attributes,
			customLabelColor: labelColor.color,
			customLabelBackgroundColor: labelBackgroundColor?.color,
			customLabelBorderColor: labelBorderColor?.color,
			labelBorderSize,
		} ),
		style: getLabelStyles( {
			...attributes,
			customLabelColor: labelColor.color,
			customLabelBackgroundColor: labelBackgroundColor?.color,
			customLabelBorderColor: labelBorderColor?.color,
		} ),
	};

	// FAQコンテンツのInnerBlocksProps
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: getContentsClasses( {
				...attributes,
				customFaqTextColor: faqTextColor?.color,
			} ),
			style: getContentsStyles( {
				...attributes,
				customFaqTextColor: faqTextColor?.color,
			} ),
		},
		{
			templateLock: false,
			template,
		}
	);

	// アコーディオン矢印のクラス名とスタイル
	const accordionArrowProps = {
		className: getAccordionArrowClasses( {
			...attributes,
			customAccordionArrowColor: accordionArrowColor?.color,
		} ),
		style: getAccordionArrowStyles( {
			...attributes,
			customAccordionArrowColor: accordionArrowColor?.color,
		} ),
	};

	return (
		<>
			<InspectorControls { ...props } />

			<div { ...blockProps }>
				<div { ...labelProps }>
					<span className="ystdtb-faq-item__label-text">
						{ faqType }
					</span>
				</div>
				<div { ...innerBlocksProps } />
				{ 'q' === faqType && (
					<div { ...accordionArrowProps }>
						{ /* @ts-ignore */ }
						<ChevronDown />
					</div>
				) }
			</div>
		</>
	);
}

export default compose( [
	withColors( {
		faqTextColor: 'color',
		faqBackgroundColor: 'backgroundColor',
		faqBorderColor: 'borderColor',
		labelColor: 'color',
		labelBackgroundColor: 'backgroundColor',
		labelBorderColor: 'borderColor',
		accordionArrowColor: 'color',
	} ),
] )( FaqItemEdit );
