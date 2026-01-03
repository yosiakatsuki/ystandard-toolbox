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
 * Block Dependencies.
 */
import type { DlColumnBlockProps } from '../../types';

export function DtWidth( props: DlColumnBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { dtWidth, responsiveDtWidth } = attributes;

	const handleOnChange = ( value: string | undefined ) => {
		setAttributes( { dtWidth: value } );
	};
	const handleOnChangeResponsive = (
		value: CustomSizeResponsiveValues | undefined
	) => {
		setAttributes( { responsiveDtWidth: value } );
	};

	return (
		<BaseControl
			id="dl-column-width"
			label={ __( '用語(dt)の幅', 'ystandard-toolbox' ) }
		>
			<CustomSizeControl
				value={ dtWidth }
				responsiveValue={ responsiveDtWidth }
				onChange={ handleOnChange }
				onChangeResponsive={ handleOnChangeResponsive }
				useResponsive={ true }
			/>
		</BaseControl>
	);
}
