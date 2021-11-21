import classnames from 'classnames';
import {
	InnerBlocks,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { ALLOWED_BLOCKS, sliderClasses, blockClasses } from './config';
import { SliderInspectorControls as InspectorControls } from './inspector-controls';

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: classnames( blockClasses.blockClass, {} ),
	} );

	const sliderProps = {
		className: classnames( sliderClasses.wrap, blockClasses.slider, {} ),
	};

	const slideContainerProps = {
		className: classnames(
			blockClasses.sliderContainer,
			sliderClasses.container,
			{}
		),
	};

	const innerBlocksOrientation = 'horizontal';

	return (
		<>
			<InspectorControls { ...props } />
			<div { ...blockProps }>
				<div { ...sliderProps }>
					<div { ...slideContainerProps }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							orientation={ innerBlocksOrientation }
							template={ [ [ 'core/image' ] ] }
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default compose( [
	withColors( {
		navigationColor: 'color',
	} ),
] )( Edit );
