/*
 * WordPress Dependencies
 */
import {
	InspectorControls as WPInspectorControls,
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
import RangeControl from '@aktk/block-components/wp-controls/range-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';
/*
 * Plugin Dependencies
 */
import { useFaqColors } from './hooks/use-faq-colors';
import { getFaqClassNames, getFaqStyle } from './utils';
import type { FaqEditProps } from './types';
import './style-editor.scss';
import { InspectorControls } from './inspector-controls';

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
 * @param props
 */
export default function FaqEdit( props: FaqEditProps ): JSX.Element {
	const { attributes, setAttributes, clientId } = props;
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
			} ),
			style: getFaqStyle( {
				...attributes,
			} ),
		},
		{
			allowedBlocks: [ 'ystdtb/faq-item' ],
			template,
			templateLock: 'all',
		}
	);

	const inspectorControlsProps = {
		...props,
		updateChildAttributes,
	};

	return (
		<>
			<InspectorControls { ...inspectorControlsProps } />
			<WPInspectorControls>
				<PanelBody title={ __( 'FAQ設定', 'ystandard-toolbox' ) }>
					{ /* 枠線サイズ */ }
					{ '' !== borderType && (
						<>
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
			</WPInspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
