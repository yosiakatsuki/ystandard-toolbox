/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../../types';
import InputControl from '@aktk/block-components/wp-controls/input-control';
import { SecondaryButton } from '@aktk/block-components/components/buttons';

export function SliderId( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { sliderId } = attributes;
	const [ isEditing, setIsEditing ] = useState( false );

	// @ts-ignore
	const handleOnChange = ( value?: string ) => {
		setAttributes( {
			sliderId: value,
		} );
	};

	return (
		<BaseControl
			id="slider-SliderId"
			label={ __( 'スライダーID', 'ystandard-toolbox' ) }
		>
			<InputControl
				value={ sliderId || '' }
				onChange={ handleOnChange }
				disabled={ ! isEditing }
			/>
			<SecondaryButton isSmall onClick={ () => setIsEditing( true ) }>
				{ __( 'スライダーIDを変更する', 'ystandard-toolbox' ) }
			</SecondaryButton>
		</BaseControl>
	);
}
