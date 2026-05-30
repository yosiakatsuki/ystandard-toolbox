/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import {
	type ResponsiveSpacingSelectOnChangeProps,
	ResponsiveSpacingSelect,
} from '@aktk/block-components/components/custom-spacing-select';

const SIDES = [ 'top', 'right', 'bottom', 'left' ];

// @ts-ignore
export function Padding( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { padding, responsivePadding } = attributes;

	const handleOnChange = ( value: ResponsiveSpacingSelectOnChangeProps ) => {
		setAttributes( {
			padding: value.spacing,
			responsivePadding: value.responsiveSpacing,
		} );
	};

	return (
		<BaseControl
			id="padding"
			label={ __( '内側の余白(padding)', 'ystandard-toolbox' ) }
		>
			<ResponsiveSpacingSelect
				value={ padding }
				responsiveValue={ responsivePadding }
				onChange={ handleOnChange }
				// @ts-ignore.
				sides={ SIDES }
			/>
		</BaseControl>
	);
}
