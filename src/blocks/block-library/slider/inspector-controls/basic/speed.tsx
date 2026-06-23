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

export function Speed( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { speed = 0.3 } = attributes;

	const handleOnChange = ( value?: number ) => {
		setAttributes( { speed: value } );
	};

	return (
		<BaseControl
			id="slider-speed"
			label={ __(
				'スライドアニメーションの早さ(秒)',
				'ystandard-toolbox'
			) }
		>
			<RangeControl
				value={ speed }
				onChange={ handleOnChange }
				initialPosition={ 0.3 }
				min={ 0.1 }
				max={ 100 }
				step={ 0.1 }
				allowReset={ true }
			/>
		</BaseControl>
	);
}
