/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { isResponsive } from '@aktk/block-components/utils/object';
import {
	type ResponsiveSpacing,
	ResponsiveSpacingSelect,
} from '@aktk/block-components/components/custom-spacing-select';

const SIDES = [ 'top', 'right', 'bottom', 'left' ];

// @ts-ignore
export function Padding( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { padding, responsivePadding } = attributes;

	const _padding = padding ? { desktop: padding } : undefined;

	const handleOnChange = ( value: ResponsiveSpacing | undefined ) => {
		if ( isResponsive( value ) ) {
			setAttributes( {
				responsivePadding: value,
				padding: undefined,
			} );
		} else {
			setAttributes( {
				padding: value?.desktop,
				responsivePadding: undefined,
			} );
		}
	};

	return (
		<BaseControl
			id="padding"
			label={ __( '内側の余白(padding)', 'ystandard-toolbox' ) }
		>
			<ResponsiveSpacingSelect
				value={ responsivePadding ? responsivePadding : _padding }
				onChange={ handleOnChange }
				// @ts-ignore.
				sides={ SIDES }
			/>
		</BaseControl>
	);
}
