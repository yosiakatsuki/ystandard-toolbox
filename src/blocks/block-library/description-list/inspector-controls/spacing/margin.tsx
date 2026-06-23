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

const SIDES = [ 'top', 'bottom' ];

// @ts-ignore
export function Margin( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { margin, responsiveMargin } = attributes;

	const handleOnChange = ( value: ResponsiveSpacingSelectOnChangeProps ) => {
		setAttributes( {
			margin: value.spacing,
			responsiveMargin: value.responsiveSpacing,
		} );
	};

	return (
		<BaseControl
			id="margin"
			label={ __( '外側の余白', 'ystandard-toolbox' ) }
		>
			<ResponsiveSpacingSelect
				value={ margin }
				responsiveValue={ responsiveMargin }
				onChange={ handleOnChange }
				// @ts-ignore.
				sides={ SIDES }
			/>
		</BaseControl>
	);
}
