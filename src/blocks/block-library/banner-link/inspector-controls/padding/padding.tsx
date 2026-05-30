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
} from '@aktk/block-components/components/custom-spacing-select';
import { stripUndefined } from '@aktk/block-components/utils/object';


// @ts-ignore
const Padding = ( props ) => {
	const { attributes, setAttributes } = props;

	const padding = attributes.padding as ResponsiveSpacing | undefined;

	const handleOnChange = ( values: ResponsiveSpacingSelectOnChangeProps ) => {

		let newPadding : ResponsiveSpacing | undefined;
		if ( values.responsiveSpacing ) {
			newPadding = stripUndefined( values.responsiveSpacing ) as ResponsiveSpacing;
		} else if ( values.spacing ) {
			newPadding = stripUndefined( {
				desktop: values.spacing,
			} ) as ResponsiveSpacing;
		} else {
			newPadding = undefined;
		}

		setAttributes( {
			padding: newPadding,
		} );
	};

	return (
		<BaseControl
			id="banner-padding"
			label={ __( '内側余白', 'ystandard-toolbox' ) }
		>
			<ResponsiveSpacingSelect
				value={ padding?.desktop }
				responsiveValue={ padding }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};

export default Padding;
