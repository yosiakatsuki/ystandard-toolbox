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

export function PauseOnMouse( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { autoplayPauseOnMouse = false } = attributes;

	const handleOnChange = ( value: boolean ) => {
		setAttributes( { autoplayPauseOnMouse: value } );
	};

	return (
		<BaseControl>
			<ToggleControl
				label={ __(
					'マウスホバーで再生を止める',
					'ystandard-toolbox'
				) }
				checked={ autoplayPauseOnMouse }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
