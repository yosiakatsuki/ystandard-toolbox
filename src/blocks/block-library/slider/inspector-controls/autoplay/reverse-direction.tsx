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

export function ReverseDirection( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { autoplayReverseDirection = false } = attributes;

	const handleOnChange = ( value: boolean ) => {
		setAttributes( { autoplayReverseDirection: value } );
	};

	return (
		<BaseControl>
			<ToggleControl
				label={ __( '再生順を逆方向にする', 'ystandard-toolbox' ) }
				checked={ autoplayReverseDirection }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
