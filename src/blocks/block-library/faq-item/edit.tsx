import classnames from 'classnames';
import { ChevronDown } from 'react-feather';
/*
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	InspectorControls as WPInspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	FontSizePicker,
	useSetting,
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
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
import { useFaqItemColors } from './hooks/use-faq-item-colors';
import { useFaqItemFontSize } from './hooks/use-faq-item-font-size';
import { template, faqBorderTypes, labelPositions } from './utils';
import { InspectorControls } from './inspector-controls';
import type { FaqItemEditProps, FaqItemBlockAttributes } from './types';

/**
 * FAQアイテムブロック編集コンポーネント
 * @param props
 */
export default function FaqItemEdit( props: FaqItemEditProps ) {
	const { attributes, setAttributes, isSelected, context } = props;
	const {
		faqType,
		faqBorderType,
		faqBorderSize,
		labelPosition,
		labelBold,
		labelBorderSize,
		labelBorderRadius,
	} = attributes;

	// コンテキストから親ブロックの設定を取得
	const accordionArrowColorFromContext =
		context[ 'ystdtb/accordionArrowColor' ];
	const customAccordionArrowColorFromContext =
		context[ 'ystdtb/customAccordionArrowColor' ];

	// 色設定
	const {
		faqTextColor,
		faqBackgroundColor,
		faqBorderColor,
		labelColor,
		labelBackgroundColor,
		labelBorderColor,
	} = useFaqItemColors( attributes, setAttributes );

	// フォントサイズ設定
	const { labelSize } = useFaqItemFontSize( attributes, setAttributes );

	// テーマのフォントサイズ設定を取得
	const fontSizes = useSetting( 'typography.fontSizes' ) || [];

	// クラス名とスタイル - アイテム全体
	const itemClasses = classnames( 'ystdtb-faq-item', {
		[ `is-faq--${ faqType }` ]: faqType,
		[ `has-border-${ faqBorderType }` ]: '' !== faqBorderType,
		'has-background': faqBackgroundColor.color,
	} );

	const itemStyles = {
		backgroundColor: faqBackgroundColor.color,
		borderColor: faqBorderColor.color,
		borderWidth: faqBorderSize,
		alignItems: labelPosition,
	};

	// クラス名とスタイル - ラベル
	const labelClasses = classnames( 'ystdtb-faq-item__label', {
		'has-padding':
			labelBackgroundColor.color ||
			labelBorderColor.color ||
			labelBorderSize,
	} );

	const labelStyles = {
		fontSize: labelSize.size,
		fontWeight: labelBold ? undefined : 400,
		color: labelColor.color,
		backgroundColor: labelBackgroundColor.color,
		borderColor: labelBorderColor.color,
		borderWidth: labelBorderSize,
		borderRadius: labelBorderRadius,
	};

	// クラス名とスタイル - コンテンツ
	const contentsClasses = classnames( 'ystdtb-faq-item__contents', {
		'has-text-color': faqTextColor.color,
	} );

	const contentsStyles = {
		color: faqTextColor.color,
	};

	// クラス名とスタイル - アコーディオンアロー
	const accordionArrowClass = classnames( 'ystdtb-faq-item__arrow', {
		'has-text-color':
			accordionArrowColorFromContext ||
			customAccordionArrowColorFromContext,
	} );

	const accordionArrowStyle = {
		color: customAccordionArrowColorFromContext,
	};

	// BlockProps
	const blockProps = useBlockProps( {
		className: classnames( 'ystdtb-faq-item-wrap', {
			[ `is-faq--${ faqType }` ]: faqType,
		} ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: contentsClasses,
			style: contentsStyles,
		},
		{
			templateLock: false,
			template,
			renderAppender: isSelected
				? InnerBlocks.ButtonBlockAppender
				: false,
		}
	);

	return (
		<>
			<InspectorControls { ...props } />
			<WPInspectorControls>
				{ /* FAQラベル */ }
				<PanelBody title={ __( 'FAQラベル', 'ystandard-toolbox' ) }>
					{ /* ラベル表示位置 */ }
					<BaseControl
						id="faq-item-label-position"
						label={ __( 'ラベル表示位置', 'ystandard-toolbox' ) }
					>
						<CustomSelectControl
							value={ labelPosition }
							options={ labelPositions.map( ( item ) => ( {
								key: item.name,
								name: item.label,
							} ) ) }
							onChange={ ( value ) =>
								setAttributes( { labelPosition: value } )
							}
						/>
					</BaseControl>

					{ /* ラベルサイズ */ }
					<BaseControl
						id="faq-item-label-size"
						label={ __( 'ラベルサイズ', 'ystandard-toolbox' ) }
					>
						<FontSizePicker
							value={ labelSize.size }
							onChange={ labelSize.setSize }
							fontSizes={ fontSizes }
						/>
					</BaseControl>

					{ /* 文字の太さ */ }
					<BaseControl
						id="faq-item-label-bold"
						label={ __( '文字の太さ', 'ystandard-toolbox' ) }
					>
						<ToggleControl
							label={ __( '太字にする', 'ystandard-toolbox' ) }
							checked={ labelBold }
							onChange={ () =>
								setAttributes( { labelBold: ! labelBold } )
							}
						/>
					</BaseControl>

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
				<div className={ itemClasses } style={ itemStyles }>
					<div className={ labelClasses } style={ labelStyles }>
						<span className="ystdtb-faq-item__label-text">
							{ faqType }
						</span>
					</div>
					<div { ...innerBlocksProps } />
					{ 'q' === faqType && (
						<div
							className={ accordionArrowClass }
							style={ accordionArrowStyle }
						>
							<ChevronDown />
						</div>
					) }
				</div>
			</div>
		</>
	);
}
