import { ChevronDown } from 'react-feather';
/*
 * WordPress Dependencies
 */
import {
	InspectorControls as WPInspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	withColors,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
import RangeControl from '@aktk/block-components/wp-controls/range-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

/*
 * Plugin Dependencies
 */
import {
	faqBorderTypes,
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
		setAttributes,
		faqTextColor,
		faqBackgroundColor,
		faqBorderColor,
		labelColor,
		labelBackgroundColor,
		labelBorderColor,
		accordionArrowColor,
	} = props;
	const {
		faqType,
		faqBorderType,
		faqBorderSize,
		labelBold,
		labelBorderSize,
		labelBorderRadius,
	} = attributes;

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
			<WPInspectorControls>
				{ /* FAQラベル */ }
				<PanelBody title={ __( 'FAQラベル', 'ystandard-toolbox' ) }>
					{ /* 文字色 */ }
					<BaseControl
						id="faq-item-label-color"
						label={ __( '文字色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							value={ labelColor.color }
							onChange={ labelColor.setColor }
						/>
					</BaseControl>

					{ /* 背景色 */ }
					<BaseControl
						id="faq-item-label-background-color"
						label={ __( '背景色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							value={ labelBackgroundColor.color }
							onChange={ labelBackgroundColor.setColor }
						/>
					</BaseControl>

					{ /* 角丸 */ }
					<BaseControl
						id="faq-item-label-border-radius"
						label={ __( '角丸', 'ystandard-toolbox' ) }
					>
						<RangeControl
							value={ labelBorderRadius ?? 0 }
							onChange={ ( value ) =>
								setAttributes( {
									labelBorderRadius: value ?? 0,
								} )
							}
							min={ 0 }
							max={ 100 }
							step={ 1 }
							allowReset
						/>
					</BaseControl>

					{ /* 枠線サイズ */ }
					<BaseControl
						id="faq-item-label-border-size"
						label={ __( '枠線サイズ', 'ystandard-toolbox' ) }
					>
						<RangeControl
							value={ labelBorderSize ?? 0 }
							onChange={ ( value ) =>
								setAttributes( {
									labelBorderSize: value ?? 0,
								} )
							}
							min={ 0 }
							max={ 10 }
							step={ 1 }
							allowReset
						/>
					</BaseControl>

					{ /* 枠線の色 */ }
					<BaseControl
						id="faq-item-label-border-color"
						label={ __( '枠線の色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							value={ labelBorderColor.color }
							onChange={ labelBorderColor.setColor }
						/>
					</BaseControl>
				</PanelBody>

				{ /* FAQコンテンツ */ }
				<PanelBody title={ __( 'FAQコンテンツ', 'ystandard-toolbox' ) }>
					{ /* 文字色 */ }
					<BaseControl
						id="faq-item-text-color"
						label={ __( '文字色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							value={ faqTextColor.color }
							onChange={ faqTextColor.setColor }
						/>
					</BaseControl>

					{ /* 背景色 */ }
					<BaseControl
						id="faq-item-background-color"
						label={ __( '背景色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							value={ faqBackgroundColor.color }
							onChange={ faqBackgroundColor.setColor }
						/>
					</BaseControl>

					{ /* 枠線タイプ */ }
					<BaseControl
						id="faq-item-border-type"
						label={ __( '枠線タイプ', 'ystandard-toolbox' ) }
					>
						<CustomSelectControl
							value={ faqBorderType }
							options={ faqBorderTypes.map( ( item ) => ( {
								key: item.name,
								name: item.label,
							} ) ) }
							onChange={ ( value ) => {
								setAttributes( { faqBorderType: value } );
								if ( '' !== value ) {
									setAttributes( { faqBorderSize: 1 } );
									faqBorderColor.setColor( '#eeeeee' );
								} else {
									setAttributes( { faqBorderSize: 0 } );
									faqBorderColor.setColor( undefined );
								}
							} }
						/>
					</BaseControl>

					{ /* 枠線サイズと色 */ }
					{ '' !== faqBorderType && (
						<>
							<BaseControl
								id="faq-item-border-size"
								label={ __(
									'枠線サイズ',
									'ystandard-toolbox'
								) }
							>
								<RangeControl
									value={ faqBorderSize ?? 0 }
									onChange={ ( value ) =>
										setAttributes( {
											faqBorderSize: value ?? 0,
										} )
									}
									min={ 0 }
									max={ 10 }
									step={ 1 }
									allowReset
								/>
							</BaseControl>

							<BaseControl
								id="faq-item-border-color"
								label={ __( '枠線の色', 'ystandard-toolbox' ) }
							>
								<ColorPalette
									value={ faqBorderColor.color }
									onChange={ faqBorderColor.setColor }
								/>
							</BaseControl>
						</>
					) }
				</PanelBody>
			</WPInspectorControls>

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
