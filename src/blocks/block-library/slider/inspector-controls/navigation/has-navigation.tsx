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

export function HasNavigation( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { hasNavigation } = attributes;

	const handleOnChange = ( value: boolean ) => {
		setAttributes( { hasNavigation: value } );
	};

	return (
		<BaseControl
			id="slider-hasNavigation"
			label={ __( 'ナビゲーション表示', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				label={ __( 'ナビゲーションを表示する', 'ystandard-toolbox' ) }
				checked={ hasNavigation }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
