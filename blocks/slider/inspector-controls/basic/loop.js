import { BaseControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Loop = ( { attributes, setAttributes } ) => {
	const { loop } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { loop: value } );
	};
	return (
		<BaseControl
			id={ 'loop' }
			label={ __( 'ループ再生', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<ToggleControl
				label={ __( 'スライドをループする', 'ystandard-toolbox' ) }
				onChange={ handleOnChange }
				checked={ loop ?? true }
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default Loop;
