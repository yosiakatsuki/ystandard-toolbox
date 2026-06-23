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

export function DisableOnInteraction( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { autoplayDisableOnInteraction = true } = attributes;

	const handleOnChange = ( value: boolean ) => {
		setAttributes( { autoplayDisableOnInteraction: value } );
	};

	return (
		<BaseControl>
			<ToggleControl
				label={ __(
					'手動スライドで再生を止める',
					'ystandard-toolbox'
				) }
				checked={ autoplayDisableOnInteraction }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
