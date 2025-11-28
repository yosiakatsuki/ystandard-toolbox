/*
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
/*
 * Plugin Dependencies
 */
import type { FaqEditProps } from './types';
import { getFaqClassNames, getFaqStyle } from './utils';
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

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

			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
