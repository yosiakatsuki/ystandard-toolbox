import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';
import { blockClasses, sliderClasses } from "./config";
import { getSliderOptions } from "./function/slider-option";

const save = ( { attributes } ) => {

	const {
		sliderId,
	} = attributes

	const blockProps = useBlockProps.save(
		{
			id: `ystdtb-slider-${ sliderId }`,
			className: classnames(
				sliderClasses.wrap,
				blockClasses.blockClass,
			),
			'data-slider-options': getSliderOptions( attributes ),
		}
	);

	const slideContainerProps = {
		className: classnames(
			sliderClasses.container,
			blockClasses.sliderContainer,
		),
	}

	return (
		<div { ...blockProps }>
			<div { ...slideContainerProps }>
				<InnerBlocks.Content/>
			</div>
		</div>
	);
}

export default save;
