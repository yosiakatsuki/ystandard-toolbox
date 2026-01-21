import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';
import { blockClasses, sliderClasses } from './config';
import { getSliderOptions } from './function/slider-option';
import { getRatioClassName, getRatioInnerClassName } from '@ystd/helper/ratio';
import { getCustomProperty } from './function/style';

const save = ( { attributes } ) => {
	const {
		sliderId,
		slideFunction,
		ratio,
		height,
		hasNavigation,
		navigationColor,
		customNavigationColor,
		paginationType,
		paginationColor,
	} = attributes;

	const isFixedHeight = !! ratio || !! height;

	const slideContainerProps = {
		className: classnames(
			sliderClasses.container,
			blockClasses.sliderContainer,
			{}
		),
		style: {
			transitionTimingFunction: slideFunction || undefined,
		},
	};

	return (
		<div { ...blockProps }>
			<div { ...sliderProps }>
				<div { ...slideContainerProps }>
					<InnerBlocks.Content />
				</div>
				{ hasNavigation && (
					<>
						<div { ...getNavigationProps( 'prev' ) } />
						<div { ...getNavigationProps( 'next' ) } />
					</>
				) }
				{ paginationType && <div { ...paginationProps } /> }
			</div>
		</div>
	);
};

export default save;
