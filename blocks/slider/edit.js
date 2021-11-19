import classnames from 'classnames';
import {
	InnerBlocks,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import { ALLOWED_BLOCKS, sliderClasses, blockClasses } from "./config";
import { SliderInspectorControls as InspectorControls } from "./inspector-controls";

const edit = ( props ) => {

	const { attributes } = props;
	const { ratio } = attributes;

	const blockProps = useBlockProps(
		{
			className: classnames(
				blockClasses.blockClass,
				{}
			),
		}
	);

	const sliderProps = {
		className: classnames(
			sliderClasses.wrap,
			blockClasses.slider,
			{}
		),
	}

	const slideContainerProps = {
		className: classnames(
			blockClasses.sliderContainer,
			sliderClasses.container,
			{}
		),
	}

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
							template={ [
								[ 'core/image' ]
							] }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default edit;
