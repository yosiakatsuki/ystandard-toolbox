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
		ratio,
		height,
		hasNavigation,
		navigationColor,
		customNavigationColor,
		paginationType,
		paginationColor,
	} = attributes;

	const isFixedHeight = !! ratio || !! height;
	const blockProps = useBlockProps.save( {
		className: classnames( blockClasses.blockClass, {
			[ getRatioClassName( ratio ) ]: getRatioClassName( ratio ),
		} ),
	} );

	const sliderProps = {
		id: `ystdtb-slider-${ sliderId }`,
		className: classnames( sliderClasses.wrap, blockClasses.slider, {
			'is-fixed-height': isFixedHeight,
			[ getRatioInnerClassName( ratio ) ]: getRatioInnerClassName(
				ratio
			),
		} ),
		style: {
			...getCustomProperty( 'height', height ),
		},
		'data-slider-options': getSliderOptions( attributes ),
	};

	const slideContainerProps = {
		className: classnames(
			sliderClasses.container,
			blockClasses.sliderContainer,
			{}
		),
	};

	const getNavigationProps = ( type ) => {
		const colorClass = getColorClassName( 'color', navigationColor );
		return {
			className: classnames( `swiper-button-${ type }`, {
				'has-text-color': colorClass || customNavigationColor,
				[ colorClass ]: colorClass,
			} ),
			style: {
				color: customNavigationColor || undefined,
			},
		};
	};
	const paginationProps = {
		className: classnames( 'swiper-pagination' ),
		style: {
			color: paginationColor,
			'--swiper-pagination-color': paginationColor,
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
