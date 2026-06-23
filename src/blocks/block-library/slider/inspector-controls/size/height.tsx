/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import {
	CustomSizeControl,
	type CustomSizeResponsiveValues,
} from '@aktk/block-components/components/custom-size-control';
/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../../types';

export function Height( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { height, responsiveHeight, ratio = '' } = attributes;

	if ( ratio ) {
		return <></>;
	}

	const handleOnChange = ( value: string | undefined ) => {
		setAttributes( { height: value } );
	};
	const handleOnChangeResponsive = (
		value: CustomSizeResponsiveValues | undefined
	) => {
		setAttributes( { responsiveHeight: value } );
	};

	return (
		<BaseControl
			id="slider-Height"
			label={ __( '高さ', 'ystandard-toolbox' ) }
		>
			<CustomSizeControl
				value={ height }
				responsiveValue={ responsiveHeight }
				onChange={ handleOnChange }
				onChangeResponsive={ handleOnChangeResponsive }
				useResponsive={ true }
			/>
		</BaseControl>
	);
}
