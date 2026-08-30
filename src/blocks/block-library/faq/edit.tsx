/*
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
/*
 * Plugin Dependencies
 */
import type { FaqEditProps } from './types';
import {
	getFaqClassNames,
	getResponsiveSpacingStyles,
	getResponsiveTypographyStyles,
} from './utils';
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

type InnerBlock = {
	clientId: string;
	attributes: Record< string, any >;
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
 * @param props
 */
export default function FaqEdit( props: FaqEditProps ): JSX.Element {
	const { attributes, clientId } = props;

	// 子ブロックの属性を更新
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const innerBlocks = useSelect(
		( select ) => {
			// @ts-ignore
			const { getBlocks } = select( 'core/block-editor' );
			return getBlocks( clientId ) as InnerBlock[];
		},
		[ clientId ]
	);

	/**
	 * 子ブロックの属性を一括更新
	 * @param childAttributes
	 */
	const updateChildAttributes = (
		childAttributes:
			| Record< string, any >
			| ( ( attributes: Record< string, any > ) => Record< string, any > )
	) => {
		innerBlocks.forEach( ( innerBlock ) => {
			const updatedAttributes =
				'function' === typeof childAttributes
					? childAttributes( innerBlock.attributes )
					: childAttributes;
			updateBlockAttributes( innerBlock.clientId, updatedAttributes );
		} );
	};

	// BlockProps
	const blockProps = useBlockProps( {
		className: getFaqClassNames( {
			...attributes,
		} ),
		style: {
			...getResponsiveSpacingStyles( attributes ),
			...getResponsiveTypographyStyles( attributes ),
		},
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'ystdtb/faq-item' ],
		template,
		templateLock: 'all',
	} );

	const inspectorControlsProps = {
		...props,
		updateChildAttributes,
	};

	return (
		<>
			<InspectorControls { ...inspectorControlsProps } />

			<div { ...innerBlocksProps } />
		</>
	);
}
