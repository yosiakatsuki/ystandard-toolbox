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
export function Margin( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { margin, responsiveMargin } = attributes;

	const _margin = margin ? { desktop: margin } : undefined;

	const handleOnChange = ( value: ResponsiveSpacing | undefined ) => {
		if ( isResponsive( value ) ) {
			setAttributes( {
				responsiveMargin: value,
				margin: undefined,
			} );
		} else {
			setAttributes( {
				margin: value?.desktop,
				responsiveMargin: undefined,
			} );
		}
	};

	return (
		<BaseControl
			id="margin"
			label={ __( '外側の余白(margin)', 'ystandard-toolbox' ) }
		>
			<ResponsiveSpacingSelect
				value={ responsiveMargin ? responsiveMargin : _margin }
				onChange={ handleOnChange }
				// @ts-ignore.
				sides={ SIDES }
			/>
		</BaseControl>
	);
}
