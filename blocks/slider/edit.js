import classnames from 'classnames';
import {
	InnerBlocks,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import { ALLOWED_BLOCKS, sliderClasses, blockClasses } from "./config";

const edit = ( props ) => {

	const blockProps = useBlockProps(
		{
			className: classnames(
				sliderClasses.wrap,
				blockClasses.blockClass,
			),
		}
	);

	const slideContainerProps = {
		className: classnames(
			blockClasses.sliderContainer,
			sliderClasses.container,
		),
	}

	const innerBlocksOrientation = 'horizontal';

	return (
		<div { ...blockProps }>
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
	);
}
export default edit;
