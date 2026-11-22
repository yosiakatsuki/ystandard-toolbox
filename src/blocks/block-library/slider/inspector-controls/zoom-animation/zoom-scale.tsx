/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import RangeControl from '@aktk/block-components/wp-controls/range-control';

/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../../types';
import { ZOOM_ANIMATION_SCALE_DEFAULT } from '../../utils';

export function ZoomScale( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { zoomAnimationScale } = attributes;

	const handleOnChange = ( value?: number ) => {
		setAttributes( { zoomAnimationScale: value } );
	};

	return (
		<BaseControl
			id="slider-zoom-animation-scale"
			label={ __( '拡大率(%)', 'ystandard-toolbox' ) }
		>
			<RangeControl
				value={ zoomAnimationScale ?? ZOOM_ANIMATION_SCALE_DEFAULT }
				onChange={ handleOnChange }
				initialPosition={ ZOOM_ANIMATION_SCALE_DEFAULT }
				min={ 101 }
				max={ 150 }
				step={ 1 }
			/>
		</BaseControl>
	);
}
