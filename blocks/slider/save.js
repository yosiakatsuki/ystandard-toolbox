import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';
import { blockClasses, sliderClasses } from "./config";

const save = ( { attributes } ) => {

	const blockProps = useBlockProps.save(
		{
			className: classnames(
				sliderClasses.wrap,
				blockClasses.blockClass,
			),
		}
	);

	const slideContainerProps = {
		className: classnames(
			sliderClasses.container,
			blockClasses.sliderContainer,
		),
	}

	return(
		<div { ...blockProps }>
			<div { ...slideContainerProps }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

export default save;
