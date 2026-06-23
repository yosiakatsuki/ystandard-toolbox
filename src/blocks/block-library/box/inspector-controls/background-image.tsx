/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import MediaUploadControl from '@aktk/components/media-upload-control';

/*
 * Plugin Dependencies
 */
import type { BoxAttributes } from '../types';

interface BackgroundImageProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * 背景画像コントロール
 * @param props
 */
const BackgroundImage = ( props: BackgroundImageProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const { backgroundImage } = attributes;

	const handleOnSelect = ( media: any ) => {
		setAttributes( { backgroundImage: media } );
	};
	const handleOnClear = () => {
		setAttributes( { backgroundImage: undefined } );
	};

	return (
		<BaseControl>
			<MediaUploadControl
				media={ backgroundImage }
				mediaTypes={ [ 'image' ] }
				onSelect={ handleOnSelect }
				onSelectRaw={ handleOnSelect }
				onClear={ handleOnClear }
				value={ backgroundImage }
				clearLabel="削除"
				selectLabel="選択"
				useUtils={ true }
			/>
		</BaseControl>
	);
};

export default BackgroundImage;
