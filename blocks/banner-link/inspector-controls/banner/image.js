import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import MediaUploadControl from "@ystdtb/components/media-upload-control";

const Image = ( props ) => {

	const { attributes, setAttributes } = props;

	const { backgroundImage } = attributes;

	const handleOnSelect = ( media ) => {
		setAttributes( { backgroundImage: media } );
	};
	const handleOnClear = () => {
		setAttributes( { backgroundImage: undefined } );
	};
	return (
		<BaseControl
			id={ backgroundImage }
			label={ __( '画像', 'ystandard-toolbox' ) }
		>
			<MediaUploadControl
				media={ backgroundImage }
				onSelect={ handleOnSelect }
				onClear={ handleOnClear }
				value={ backgroundImage }
			/>
		</BaseControl>
	);
}
export default Image;
