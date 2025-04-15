import { BaseControl } from '@wordpress/components';
import MediaUploadControl from '@ystd/components/media-upload-control';

const BackgroundImage = ( props ) => {
	const { attributes, setAttributes } = props;

	const { backgroundImage } = attributes;

	const handleOnSelect = ( media ) => {
		setAttributes( { backgroundImage: media } );
	};
	const handleOnClear = () => {
		setAttributes( { backgroundImage: undefined } );
	};

	return (
		<BaseControl __nextHasNoMarginBottom>
			<MediaUploadControl
				media={ backgroundImage }
				onSelect={ handleOnSelect }
				onClear={ handleOnClear }
				value={ backgroundImage }
			/>
		</BaseControl>
	);
};

export default BackgroundImage;
