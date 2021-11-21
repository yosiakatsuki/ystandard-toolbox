import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';
import { blockClasses, sliderClasses } from "./config";
import { getSliderOptions } from "./function/slider-option";
import { getRatioClassName, getRatioInnerClassName } from "@ystdtb/helper/ratio";
import { getCustomProperty } from "./function/style";

const save = ( { attributes } ) => {

	const {
		sliderId,
		ratio,
		height,
		hasNavigation,
	} = attributes

	const isFixedHeight = !! ratio || !! height;
	const blockProps = useBlockProps.save(
		{
			className: classnames(
				blockClasses.blockClass,
				{
					[ getRatioClassName( ratio ) ]: getRatioClassName( ratio ),
				}
			),
		}
	);

	const sliderProps = {
		id: `ystdtb-slider-${ sliderId }`,
		className: classnames(
			sliderClasses.wrap,
			blockClasses.slider,
			{
				'is-fixed-height': isFixedHeight,
				[ getRatioInnerClassName( ratio ) ]: getRatioInnerClassName( ratio ),
			}
		),
		style: {
			...getCustomProperty( 'height', height ),
		},
		'data-slider-options': getSliderOptions( attributes ),
	}

	const slideContainerProps = {
		className: classnames(
			sliderClasses.container,
			blockClasses.sliderContainer,
			{}
		),
	}

	return (
		<div{ ...blockProps }>
			<div { ...sliderProps }>
				<div { ...slideContainerProps }>
					<InnerBlocks.Content/>
				</div>
				{ ( hasNavigation &&
					<>
						<div className="swiper-button-prev"></div>
						<div className="swiper-button-next"></div>
					</>
				) }
			</div>
		</div>
	);
}

export default save;
