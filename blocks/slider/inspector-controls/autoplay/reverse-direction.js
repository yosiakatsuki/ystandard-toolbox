import { BaseControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ReverseDirection = ( { attributes, setAttributes } ) => {
	const { autoplayReverseDirection } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { autoplayReverseDirection: value } );
	};
	return (
		<BaseControl>
			<ToggleControl
				label={ __(
					'再生順を逆方向にする',
					'ystandard-toolbox'
				) }
				onChange={ handleOnChange }
				checked={ autoplayReverseDirection ?? true }
			/>
		</BaseControl>
	);
};

export default ReverseDirection;
