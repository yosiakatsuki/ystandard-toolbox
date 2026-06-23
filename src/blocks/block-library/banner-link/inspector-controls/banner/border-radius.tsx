/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { BorderRadiusControl } from '@aktk/block-components/components/border-radius-control';

const BorderRadius = ( { attributes, setAttributes } ) => {
	const { borderRadius } = attributes;

	const handleOnChange = ( value ) => {
		setAttributes( { borderRadius: value || undefined } );
	};

	return (
		<BaseControl id="banner-border-radius">
			<BorderRadiusControl
				label={ __( '角丸', 'ystandard-toolbox' ) }
				value={ borderRadius }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default BorderRadius;
