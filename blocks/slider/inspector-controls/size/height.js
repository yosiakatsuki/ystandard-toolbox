import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveValues from '@ystd/components/responsive-values';

const Height = ( { attributes, setAttributes } ) => {
	const { height, ratio } = attributes;

	const handleOnChange = ( newValue ) => {
		setAttributes( {
			height: newValue,
		} );
	};
	return (
		<>
			{ ! ratio && (
				<BaseControl __nextHasNoMarginBottom>
					<ResponsiveValues
						label={ __( '高さ', 'ystandard-toolbox' ) }
						values={ height }
						onChange={ handleOnChange }
					/>
				</BaseControl>
			) }
		</>
	);
};
export default Height;
