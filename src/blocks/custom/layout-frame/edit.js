import classnames from 'classnames';
/**
 * WordPress
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
/**
 * Plugin.
 */
import { hasClasses } from '@aktk/config';
import {
	getResponsiveMarginStyle,
	getResponsivePaddingStyle,
	getResponsiveGapStyle,
} from '@aktk/components/responsive-spacing';
import {
	getResponsiveWidthStyle,
	getResponsiveHeightStyle,
} from '@aktk/components/responsive-values';
import { getResponsiveLayoutStyle } from '@aktk/components/responsive-layout';
import { getResponsiveRatioStyle } from '@aktk/components/responsive-ratio';
/**
 * Block.
 */
import './editor.scss';
import { blockClassName } from './save';
import InspectorControls from './inspector-controls';

const Edit = ( props ) => {
	const { attributes, clientId } = props;
	const { layout, gap, width, height, ratio, padding, margin, zIndex } =
		attributes;

	const { hasInnerBlocks } = useSelect(
		( select ) => {
			const { getBlock } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
			};
		},
		[ clientId ]
	);
	const editorWrapperProps = useBlockProps( {
		className: `${ blockClassName }-wrap`,
	} );

	const blockProps = {
		className: classnames( blockClassName, {
			[ hasClasses.padding ]: getResponsivePaddingStyle( padding ),
			[ hasClasses.margin ]: getResponsiveMarginStyle( margin ),
		} ),
		style: {
			zIndex,
			...getResponsivePaddingStyle( padding ),
			...getResponsiveMarginStyle( margin ),
			...getResponsiveWidthStyle( width ),
			...getResponsiveHeightStyle( height ),
			...getResponsiveRatioStyle( ratio ),
			...getResponsiveGapStyle( gap ),
			...getResponsiveLayoutStyle( layout ),
		},
	};
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );
	return (
		<>
			<InspectorControls { ...props } />
			<div { ...editorWrapperProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
};

export default Edit;
