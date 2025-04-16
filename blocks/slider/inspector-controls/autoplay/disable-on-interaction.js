import { BaseControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DisableOnInteraction = ( { attributes, setAttributes } ) => {
	const { autoplayDisableOnInteraction } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { autoplayDisableOnInteraction: value } );
	};
	return (
		<BaseControl __nextHasNoMarginBottom>
			<ToggleControl
				label={ __(
					'手動スライドで再生を止める',
					'ystandard-toolbox'
				) }
				onChange={ handleOnChange }
				checked={ autoplayDisableOnInteraction ?? true }
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default DisableOnInteraction;
