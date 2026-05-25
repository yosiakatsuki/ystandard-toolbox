/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import {
	ResponsiveSpacingSelect,
	type ResponsiveSpacing,
	type ResponsiveSpacingSelectOnChangeProps,
	type Spacing,
} from '@aktk/block-components/components/custom-spacing-select';
import { stripUndefined } from '@aktk/block-components/utils/object';

const hasResponsiveSpacing = ( value?: ResponsiveSpacing ) => {
	return !! value?.tablet || !! value?.mobile;
};

const getDefaultSpacing = (
	value?: ResponsiveSpacing
): Spacing | undefined => {
	return value?.desktop;
};

const getResponsiveSpacing = (
	value?: ResponsiveSpacing
): ResponsiveSpacing | undefined => {
	if ( ! hasResponsiveSpacing( value ) ) {
		return undefined;
	}
	return value;
};

const toLegacyPadding = (
	value: ResponsiveSpacingSelectOnChangeProps
): ResponsiveSpacing | undefined => {
	if ( value.responsiveSpacing ) {
		return stripUndefined( value.responsiveSpacing ) as ResponsiveSpacing;
	}
	if ( value.spacing ) {
		return stripUndefined( {
			desktop: value.spacing,
		} ) as ResponsiveSpacing;
	}
	return undefined;
};

const Padding = ( props ) => {
	const { attributes, setAttributes } = props;

	const padding = attributes.padding as ResponsiveSpacing | undefined;

	const handleOnChange = ( values: ResponsiveSpacingSelectOnChangeProps ) => {
		setAttributes( {
			padding: toLegacyPadding( values ),
		} );
	};

	return (
		<BaseControl
			id="banner-padding"
			label={ __( '内側余白', 'ystandard-toolbox' ) }
		>
			<ResponsiveSpacingSelect
				value={ getDefaultSpacing( padding ) }
				responsiveValue={ getResponsiveSpacing( padding ) }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};

export default Padding;
