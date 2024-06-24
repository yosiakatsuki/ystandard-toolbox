/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import {
	MediaUpload,
	MediaObject,
} from '@aktk/block-components/components/media-upload';

/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';

interface BackgroundImageControlProps {
	value: string | undefined;
	onChange: ( newValue: {
		backgroundImage: string | undefined;
		backgroundPosition?: string | undefined;
		backgroundRepeat?: string | undefined;
		backgroundSize?: string | undefined;
	} ) => void;
}

export default function BackgroundImage( props: BackgroundImageControlProps ) {
	const { value, onChange } = props;

	const handleOnChange = ( newValue: MediaObject | undefined ) => {
		onChange( {
			backgroundImage: newValue?.url,
		} );
	};
	const onClear = () => {
		// 画像がクリアされたら関連する設定をまとめてクリア.
		onChange( {
			backgroundImage: undefined,
			backgroundPosition: undefined,
			backgroundRepeat: undefined,
			backgroundSize: undefined,
		} );
	};

	return (
		<BaseControl
			id={ 'background-image' }
			label={ __( '背景画像', 'ystandard-toolbox' ) }
		>
			<MediaUpload
				media={ { url: value } }
				onSelect={ handleOnChange }
				onClear={ onClear }
				useMediaUtils={ true }
			/>
		</BaseControl>
	);
}
