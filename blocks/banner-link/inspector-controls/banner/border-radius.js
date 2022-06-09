import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BorderRadiusControl from '@aktk/components/border-radius-control';

const BorderRadius = ( { attributes, setAttributes } ) => {
	const { borderRadius } = attributes;

	const handleOnChange = ( value ) => {
		setAttributes( { borderRadius: value || undefined } );
	};

	return (
		<BaseControl>
			<BorderRadiusControl
				label={ __( '角丸', 'ystandard-toolbox' ) }
				value={ borderRadius }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default BorderRadius;
