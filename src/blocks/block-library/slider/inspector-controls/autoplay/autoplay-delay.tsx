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

export function AutoplayDelay( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { autoplayDelay = 8 } = attributes;

	const handleOnChange = ( value?: number ) => {
		setAttributes( { autoplayDelay: value } );
	};

	return (
		<BaseControl
			id="slider-autoplay-delay"
			label={ __( 'スライド切り替えの時間(秒)', 'ystandard-toolbox' ) }
		>
			<RangeControl
				value={ autoplayDelay }
				onChange={ handleOnChange }
				initialPosition={ 8 }
				min={ 0.1 }
				max={ 100 }
				step={ 0.1 }
				allowReset={ true }
			/>
		</BaseControl>
	);
}
