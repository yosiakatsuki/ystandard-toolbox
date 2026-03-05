/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ImageSizeSelect } from '@aktk/block-components/components/image-size-select';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';

export function ThumbnailSize( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { thumbnailSize } = attributes;

	const handleOnChangeThumbnailSize = ( value?: string ) => {
		setAttributes( {
			thumbnailSize: value,
		} );
	};
	return (
		<BaseControl
			id={ 'image-size' }
			label={ __( '画像サイズ', 'ystandard-toolbox' ) }
		>
			<ImageSizeSelect
				label={ '' }
				value={ thumbnailSize }
				onChange={ handleOnChangeThumbnailSize }
			/>
		</BaseControl>
	);
}
