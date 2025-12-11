/**
 * WordPress
 */
import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
	// @ts-expect-error
	__experimentalBlockVariationPicker as BlockVariationPicker,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';
/**
 * Block Dependencies.
 */
import type { DtBlockProps } from './types';
import './style-editor.scss';

/**
 * 編集コンテナコンポーネント
 *
 * @param props
 * @class
 */
function DtEditContainer( props: DtBlockProps ) {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<div>Description List Edit (to be implemented)</div>
		</div>
	);
}

/**
 * 初期バリエーション選択コンポーネント
 *
 * @param props
 * @class
 */
function Placeholder( props: DtBlockProps ) {
	const { clientId, name, setAttributes } = props;
	const { blockType, defaultVariation, variations } = useSelect(
		( select ) => {
			const {
				// @ts-ignore
				getBlockVariations,
				// @ts-ignore
				getBlockType,
				// @ts-ignore
				getDefaultBlockVariation,
			} = select( blocksStore );

			return {
				blockType: getBlockType( name ),
				defaultVariation: getDefaultBlockVariation( name, 'block' ),
				variations: getBlockVariations( name, 'block' ),
			};
		},
		[ name ]
	);
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const blockProps = useBlockProps( { className: 'ystdtb-dl-editor' } );

	return (
		<div { ...blockProps }>
			<BlockVariationPicker
				icon={ blockType?.icon?.src }
				label={ blockType?.title }
				variations={ variations }
				instructions={ __( '選択してください', 'ystandard-toolbox' ) }
				onSelect={ ( nextVariation = defaultVariation ) => {
					if ( nextVariation.attributes ) {
						setAttributes( nextVariation.attributes );
					}
					if ( nextVariation.innerBlocks ) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(
								nextVariation.innerBlocks
							),
							true
						);
					}
				} }
				allowSkip={ false }
			/>
		</div>
	);
}

/**
 * 編集コンポーネント
 *
 * @param props
 * @class
 */
function DtBlockEdit( props: DtBlockProps ): JSX.Element {
	const { clientId } = props;
	const hasInnerBlocks = useSelect(
		( select ) =>
			// @ts-ignore
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);
	const Component = hasInnerBlocks ? DtEditContainer : Placeholder;

	return <Component { ...props } />;
}

export default DtBlockEdit;
