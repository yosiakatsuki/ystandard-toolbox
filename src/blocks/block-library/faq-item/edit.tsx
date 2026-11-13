import { ChevronDown } from 'react-feather';
/*
 * WordPress Dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	__experimentalUseColorProps as useColorProps,
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
import { FaqItemBlockControls } from './block-controls';
import type { FaqItemEditProps } from './types';

import './style-editor.scss';

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
	const { attributes } = props;
	const { faqType } = attributes;
	// コアの文字色だけを本文へ適用し、ラベルや開閉ボタンへの継承を避ける.
	const contentsColorProps = useColorProps( {
		textColor: attributes.textColor,
		style: { color: { text: attributes.style?.color?.text } },
	} );

	// FAQアイテムブロックProps
	const blockProps = useBlockProps( {
		className: getItemClasses( attributes ),
		style: getItemStyles( attributes ),
	} );

	// FAQラベルのクラス名とスタイル
	const labelProps = {
		className: getLabelClasses( attributes ),
		style: getLabelStyles( attributes ),
	};

	// FAQコンテンツのInnerBlocksProps
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: getContentsClasses( attributes ),
			style: {
				...getContentsStyles( attributes ),
				...contentsColorProps.style,
			},
		},
		{
			templateLock: false,
			template,
		}
	);

	// アコーディオン矢印のクラス名とスタイル
	const accordionArrowProps = {
		className: getAccordionArrowClasses( attributes ),
		style: getAccordionArrowStyles( attributes ),
	};

	return (
		<>
			<FaqItemBlockControls { ...props } />
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

export default FaqItemEdit;
