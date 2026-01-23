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

export function EnableAutoplay( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { autoplay = true } = attributes;

	const handleOnChange = ( value: boolean ) => {
		setAttributes( { autoplay: value } );
	};

	return (
		<BaseControl
			id="slider-autoplay"
			label={ __( '自動再生', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				label={ __( 'スライドを自動再生する', 'ystandard-toolbox' ) }
				checked={ autoplay }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
