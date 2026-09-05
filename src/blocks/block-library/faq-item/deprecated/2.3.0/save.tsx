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
import type { FaqItemBlockAttributes } from '../../types';
import {
	getAccordionArrowClasses,
	getAccordionArrowStyles,
	getContentsClasses,
	getContentsStyles,
	getItemClasses,
	getItemStyles,
	getLabelClasses,
	getLabelStyles,
} from './utils';

type FaqItemSaveProps = {
	attributes: FaqItemBlockAttributes;
};

/**
 * v2.3.0の保存形式を再現する.
 *
 * @param props            保存属性.
 * @param props.attributes 旧ブロック属性.
 */
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
