/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, ToggleControl } from '@wordpress/components';

const ShowImage = ( { attributes, setAttributes } ) => {
	const { showImg } = attributes;
	const handleOnChange = () => {
		setAttributes( {
			showImg: ! showImg,
		} );
	};
	return (
		<BaseControl>
			<ToggleControl
				label={ __( '画像を表示する', 'ystandard-toolbox' ) }
				onChange={ handleOnChange }
				checked={ showImg }
			/>
		</BaseControl>
	);
};
export default ShowImage;
