/*
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/*
 * Aktk Dependencies
 */
import { SvgIcon } from '@aktk/block-components/components/svg-icon';

/*
 * Plugin Dependencies
 */
import type { FaqItemBlockAttributes } from './types';
import {
	getAccordionArrowClasses,
	getAccordionArrowStyles,
	getContentsClasses,
	getContentsStyles,
	getItemClasses,
	getItemStyles,
	getLabelClasses,
	getLabelStyles,
} from '@aktk/blocks/block-library/faq-item/utils';

type FaqItemSaveProps = {
	attributes: FaqItemBlockAttributes;
};

// @ts-ignore.
export default function FaqItemSave( {
	attributes,
}: FaqItemSaveProps ): JSX.Element {
	const { faqType } = attributes;

	// FAQアイテムブロックProps
	const blockProps = useBlockProps.save( {
		className: getItemClasses( attributes ),
		style: getItemStyles( attributes ),
	} );

	// FAQラベルのクラス名とスタイル
	const labelProps = {
		className: getLabelClasses( attributes ),
		style: getLabelStyles( attributes ),
	};

	const faqContentsProps = {
		className: getContentsClasses( attributes ),
		style: getContentsStyles( attributes ),
	};

	// アコーディオン矢印のクラス名とスタイル
	const accordionArrowProps = {
		className: getAccordionArrowClasses( attributes ),
		style: getAccordionArrowStyles( attributes ),
	};

	return (
		<div { ...blockProps }>
			<div { ...labelProps }>
				<span className="ystdtb-faq-item__label-text">{ faqType }</span>
			</div>
			<div { ...faqContentsProps }>
				<InnerBlocks.Content />
			</div>
			{ 'q' === faqType && (
				<div { ...accordionArrowProps }>
					<SvgIcon.Content name="chevron-down" />
				</div>
			) }
		</div>
	);
}
