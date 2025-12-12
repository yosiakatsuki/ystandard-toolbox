/**
 * WordPress
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	// @ts-expect-error
	__experimentalBlockVariationPicker as BlockVariationPicker,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';
/**
 * Block Dependencies.
 */
import type { DlBlockProps } from './types';
import { getDlClassNames, getDlStyles } from './utils';
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

const ALLOWED_BLOCKS = [
	'ystdtb/description-list-dt',
	'ystdtb/description-list-dd-simple',
	'ystdtb/description-list-dd-box',
	'ystdtb/description-list-column',
];

/**
 * 編集コンテナコンポーネント
 *
 * @param props
 * @class
 */
function DtEditContainer( props: DlBlockProps ) {
	const { attributes } = props;
	// Block Props.
	const blockProps = useBlockProps( {
		className: getDlClassNames( attributes ),
		style: getDlStyles( attributes ),
	} );
	// InnerBlocks Props.
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
	} );
	return (
		<>
			<InspectorControls { ...props } />
			<dl { ...innerBlocksProps } />
		</>
	);
}

/**
 * 初期バリエーション選択コンポーネント
 *
 * @param props
 * @class
 */
function Placeholder( props: DlBlockProps ) {
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
function DtBlockEdit( props: DlBlockProps ): JSX.Element {
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
