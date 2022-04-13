import classnames from 'classnames';
/**
 * WordPress
 */
import {
	InnerBlocks,
	useBlockProps,
	__experimentalBlockVariationPicker as BlockVariationPicker,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
/**
 * yStandard
 */
import { getResponsiveMarginStyle } from '@ystd/components/responsive-spacing';
/**
 * Block
 */
import { config } from './config';
import { DescriptionListInspectorControls as InspectorControls } from './inspector-controls';

const Edit = ( props ) => {
	const { attributes } = props;
	const { margin } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( 'ystdtb-dl-editor', {
			'has-margin': !! getResponsiveMarginStyle( margin ),
		} ),
	} );

	const dlProps = {
		className: classnames( config.blockClasses, {
			'has-margin': !! getResponsiveMarginStyle( margin ),
		} ),
		style: {
			...getResponsiveMarginStyle( margin ),
		},
	};

	return (
		<>
			<InspectorControls { ...props } />
			<div { ...blockProps }>
				<dl { ...dlProps }>
					<InnerBlocks allowedBlocks={ config.allowedBlocks } />
				</dl>
			</div>
		</>
	);
};

function Placeholder( { clientId, name, setAttributes } ) {
	const { blockType, defaultVariation, variations } = useSelect(
		( select ) => {
			const {
				getBlockVariations,
				getBlockType,
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
	const blockProps = useBlockProps( {
		className: 'ystdtb-dl-editor',
	} );

	return (
		<div { ...blockProps }>
			<BlockVariationPicker
				icon={ blockType?.icon?.src }
				label={ blockType?.title }
				variations={ variations }
				onSelect={ ( nextVariation = defaultVariation ) => {
					if ( nextVariation?.attributes ) {
						setAttributes( nextVariation.attributes );
					}
					if ( nextVariation?.innerBlocks ) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(
								nextVariation.innerBlocks
							),
							true
						);
					}
				} }
				allowSkip
			/>
		</div>
	);
}

const DtEdit = ( props ) => {
	const { clientId } = props;
	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);
	const Component = hasInnerBlocks ? Edit : Placeholder;

	return <Component { ...props } />;
};

export default DtEdit;
