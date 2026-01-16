import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';
/**
 * Aktk Dependencies.
 */
import {
	getCustomProperty,
	getSliderOptions,
	getRatioClassName,
	getRatioInnerClassName,
} from './utils';

export const blockClasses = {
	blockClass: 'ystdtb-slider',
	slider: 'ystdtb-slider__slider',
	sliderContainer: 'ystdtb-slider__container',
	sliderPagination: 'ystdtb-slider__pagination',
	sliderButtonPrev: 'ystdtb-slider__button-prev',
	sliderButtonNext: 'ystdtb-slider__button-next',
	sliderScrollbar: 'ystdtb-slider__scrollbar',
};

export const sliderClasses = {
	wrap: 'swiper',
	container: 'swiper-wrapper',
	item: 'swiper-slide',
	pagination: 'swiper-pagination',
	buttonPrev: 'swiper-button-prev',
	buttonNext: 'swiper-button-next',
	scrollbar: 'swiper-scrollbar',
};

export const breakpoints = {
	desktop: 769,
	tablet: 600,
};

// @ts-ignore.
export const deprecated1341 = [
	{
		attributes: {
			sliderId: {
				type: 'string',
			},
			effect: {
				type: 'string',
			},
			speed: {
				type: 'number',
			},
			loop: {
				type: 'boolean',
				default: true,
			},
			slideFunction: {
				type: 'string',
			},
			autoplay: {
				type: 'boolean',
				default: true,
			},
			autoplayDelay: {
				type: 'number',
				default: 8,
			},
			autoplayPauseOnMouse: {
				type: 'boolean',
				default: false,
			},
			autoplayDisableOnInteraction: {
				type: 'boolean',
				default: true,
			},
			autoplayReverseDirection: {
				type: 'boolean',
				default: false,
			},
			ratio: {
				type: 'string',
			},
			height: {
				type: 'object',
			},
			slides: {
				type: 'object',
			},
			breakpoints: {
				type: 'object',
			},
			hasNavigation: {
				type: 'boolean',
				default: false,
			},
			navigationColor: {
				type: 'string',
			},
			customNavigationColor: {
				type: 'string',
			},
			paginationType: {
				type: 'string',
			},
			paginationColor: {
				type: 'string',
			},
			previewType: {
				type: 'string',
				default: 'grid',
			},
		},
		supports: {
			anchor: false,
			align: [ 'wide', 'full' ],
			className: false,
			lightBlockWrapper: true,
		},
		migrate: ( attributes: any ) => {
			const { ...rest } = attributes;

			return {
				...rest,
			};
		},
		save( { attributes }: { attributes: any } ) {
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
			const blockProps = useBlockProps.save( {
				className: classnames( blockClasses.blockClass, {
					// @ts-ignore
					[ getRatioClassName( ratio ) ]: getRatioClassName( ratio ),
				} ),
			} );

			const sliderProps = {
				id: `ystdtb-slider-${ sliderId }`,
				className: classnames(
					sliderClasses.wrap,
					blockClasses.slider,
					{
						'is-fixed-height': isFixedHeight,
						// @ts-ignore
						[ getRatioInnerClassName( ratio ) ]:
							getRatioInnerClassName( ratio ),
					}
				),
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
				style: {
					transitionTimingFunction: slideFunction || undefined,
				},
			};

			const getNavigationProps = ( type ) => {
				const colorClass = getColorClassName(
					'color',
					navigationColor
				);
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
		},
	},
];
