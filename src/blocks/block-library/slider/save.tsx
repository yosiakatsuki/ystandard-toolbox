/*
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Block dependencies.
 */
import type { SliderEditProps } from './types';
import {
	getNavigationClasses,
	getNavigationStyles,
	getPaginationClasses,
	getPaginationStyles,
	getSliderBlockClasses,
	getSliderContainerClasses,
	getSliderContainerStyles,
	getSliderOptions,
	getSliderWrapClasses,
	getSliderWrapStyles,
} from './utils';

export default function Save( props: SliderEditProps ): JSX.Element {
	const { attributes } = props;
	const { sliderId, hasNavigation, paginationType } = attributes;
	// スライダーブロック.
	const blockProps = useBlockProps.save( {
		className: getSliderBlockClasses(),
	} );
	// スライダーラップ.
	const sliderWrapProps = {
		id: `ystdtb-slider-${ sliderId }`,
		className: getSliderWrapClasses( attributes ),
		style: getSliderWrapStyles( attributes ),
		'data-slider-options': getSliderOptions( attributes ),
	};
	// スライドコンテナ.
	const slideContainerProps = {
		className: getSliderContainerClasses(),
		style: getSliderContainerStyles( attributes ),
	};
	// ナビゲーション Prev.
	const prevNavigationProps = {
		className: getNavigationClasses( 'prev', attributes ),
		style: getNavigationStyles( attributes ),
	};
	// ナビゲーション Next.
	const nextNavigationProps = {
		className: getNavigationClasses( 'next', attributes ),
		style: getNavigationStyles( attributes ),
	};
	// ページネーション.
	const paginationProps = {
		className: getPaginationClasses(),
		style: getPaginationStyles( attributes ),
	};

	return (
		<div { ...blockProps }>
			<div { ...sliderWrapProps }>
				<div { ...slideContainerProps }>
					<InnerBlocks.Content />
				</div>
				{ hasNavigation && (
					<>
						<div { ...prevNavigationProps } />
						<div { ...nextNavigationProps } />
					</>
				) }
				{ paginationType && <div { ...paginationProps } /> }
			</div>
		</div>
	);
}
