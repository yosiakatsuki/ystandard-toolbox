/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';

/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../../types';

export function Loop( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { loop = true } = attributes;

	const handleOnChange = ( value: boolean ) => {
		setAttributes( { loop: value } );
	};

	return (
		<BaseControl
			id="slider-loop"
			label={ __( 'ループ再生', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				label={ __( 'スライドをループする', 'ystandard-toolbox' ) }
				checked={ loop }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
