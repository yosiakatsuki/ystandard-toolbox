/*
 * WordPress Dependencies
 */
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
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
import { useFaqColors } from './hooks/use-faq-colors';
import { faqBorderTypes, getFaqClassNames, getFaqStyle } from './utils';
import type { FaqBlockAttributes } from './types';
import './style-editor.scss';

type FaqEditProps = {
	attributes: FaqBlockAttributes;
	setAttributes: ( attributes: Partial< FaqBlockAttributes > ) => void;
	clientId: string;
};

/**
 * FAQブロックの初期テンプレート
 */
const template: [ string, Record< string, any > ][] = [
	[
		'ystdtb/faq-item',
		{
			faqType: 'q',
		},
	],
	[
		'ystdtb/faq-item',
		{
			faqType: 'a',
		},
	],
];

/**
 * FAQブロック編集コンポーネント
 * @param root0
 * @param root0.attributes
 * @param root0.setAttributes
 * @param root0.clientId
 */
export default function FaqEdit( {
	attributes,
	setAttributes,
	clientId,
}: FaqEditProps ): JSX.Element {
	const { isAccordion, borderType, borderSize } = attributes;

	// 色設定
	const { backgroundColor, borderColor, accordionArrowColor } = useFaqColors(
		attributes,
		setAttributes
	);

	// 子ブロックの属性を更新
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const innerBlockClientIds = useSelect(
		( select ) => {
			// @ts-ignore
			const { getBlockOrder } = select( 'core/block-editor' );
			// @ts-ignore
			return getBlockOrder( clientId );
		},
		[ clientId ]
	);

	/**
	 * 子ブロックの属性を一括更新
	 * @param childAttributes
	 */
	const updateChildAttributes = (
		childAttributes: Record< string, any >
	) => {
		// @ts-ignore.
		innerBlockClientIds.forEach( ( innerBlockClientId ) => {
			updateBlockAttributes( innerBlockClientId, childAttributes );
		} );
	};

	// BlockProps
	const blockProps = useBlockProps( {
		className: 'ystdtb-faq-wrap',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: getFaqClassNames( {
				...attributes,
				customBackgroundColor: backgroundColor.color,
				customBorderColor: borderColor.color,
				customAccordionArrowColor: accordionArrowColor.color,
			} ),
			style: getFaqStyle( {
				...attributes,
				customBackgroundColor: backgroundColor.color,
				customBorderColor: borderColor.color,
				customAccordionArrowColor: accordionArrowColor.color,
			} ),
		},
		{
			allowedBlocks: [ 'ystdtb/faq-item' ],
			template,
			templateLock: 'all',
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'FAQ設定', 'ystandard-toolbox' ) }>
					{ /* アコーディオン設定 */ }
					<BaseControl
						id="faq-accordion"
						label={ __( '開閉設定', 'ystandard-toolbox' ) }
					>
						<ToggleControl
							label={ __( '開閉式にする', 'ystandard-toolbox' ) }
							checked={ isAccordion }
							onChange={ () =>
								setAttributes( { isAccordion: ! isAccordion } )
							}
						/>
					</BaseControl>

					{ /* 開閉ボタンの色 */ }
					{ isAccordion && (
						<BaseControl
							id="faq-accordion-arrow-color"
							label={ __(
								'開閉ボタンの色',
								'ystandard-toolbox'
							) }
						>
							<ColorPalette
								value={ accordionArrowColor.color }
								onChange={ ( color ) => {
									accordionArrowColor.setColor( color );
									// 子ブロックにも反映
									updateChildAttributes( {
										accordionArrowColor:
											accordionArrowColor.getColorSlug(
												color
											),
										customAccordionArrowColor:
											accordionArrowColor.getColorCode(
												color
											),
									} );
								} }
							/>
						</BaseControl>
					) }

					{ /* 背景色 */ }
					<BaseControl
						id="faq-background-color"
						label={ __( '背景色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							value={ backgroundColor.color }
							onChange={ backgroundColor.setColor }
						/>
					</BaseControl>

					{ /* 枠線タイプ */ }
					<BaseControl
						id="faq-border-type"
						label={ __( '枠線タイプ', 'ystandard-toolbox' ) }
					>
						<CustomSelectControl
							value={ borderType }
							options={ faqBorderTypes.map( ( item ) => ( {
								key: item.name,
								name: item.label,
							} ) ) }
							onChange={ ( value ) => {
								setAttributes( { borderType: value } );
								if ( '' === value ) {
									setAttributes( { borderSize: 0 } );
									borderColor.setColor( undefined );
								}
							} }
						/>
					</BaseControl>

					{ /* 枠線サイズ */ }
					{ '' !== borderType && (
						<>
							<BaseControl
								id="faq-border-size"
								label={ __(
									'枠線サイズ',
									'ystandard-toolbox'
								) }
							>
								<RangeControl
									value={ borderSize ?? 0 }
									onChange={ ( value ) =>
										setAttributes( {
											borderSize: value ?? 0,
										} )
									}
									min={ 0 }
									max={ 10 }
									step={ 1 }
									allowReset
								/>
							</BaseControl>

							<BaseControl
								id="faq-border-color"
								label={ __( '枠線の色', 'ystandard-toolbox' ) }
							>
								<ColorPalette
									value={ borderColor.color }
									onChange={ borderColor.setColor }
								/>
							</BaseControl>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
