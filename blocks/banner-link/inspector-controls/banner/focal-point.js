import { BaseControl, FocalPointPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const FocalPoint = ( { attributes, setAttributes } ) => {

	const {
		backgroundImage,
		backgroundImageFocalPoint,
	} = attributes;

	const handleOnChange = ( value ) => {
		setAttributes( {
			backgroundImageFocalPoint: value,
		} );
	}
	return (
		<>
			{ ( backgroundImage?.url &&
				<BaseControl>
					<FocalPointPicker
						label={ __( '焦点', 'ystandard-toolbox' ) }
						value={ backgroundImageFocalPoint }
						onChange={ handleOnChange }
						url={ backgroundImage?.url }
					/>
				</BaseControl>
			) }
		</>
	);
}
export default FocalPoint;
