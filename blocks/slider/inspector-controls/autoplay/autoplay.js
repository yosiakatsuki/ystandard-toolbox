import { BaseControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Autoplay = ( { attributes, setAttributes } ) => {
	const { autoplay } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { autoplay: value } );
	};
	return (
		<BaseControl
			id={ 'autoplay' }
			label={ __( '自動再生', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<ToggleControl
				label={ __( 'スライドを自動再生する', 'ystandard-toolbox' ) }
				onChange={ handleOnChange }
				checked={ autoplay ?? true }
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default Autoplay;
