/**
 * WordPress.
 */
import { MediaUpload } from '@wordpress/block-editor';
import { MediaUpload as MediaUploadUtils } from '@wordpress/media-utils';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Component.
 */
import './_edit.scss';

const MediaUploadControl = ( {
	media,
	mediaTypes,
	onSelect,
	onSelectRaw,
	onClear,
	value,
	clearLabel,
	selectLabel,
	useUtils,
} ) => {
	const MediaComponent = !! useUtils ? MediaUploadUtils : MediaUpload;

	const MEDIA_TYPES = [ 'image' ];

	const _mediaTypes = mediaTypes || MEDIA_TYPES;

	const _clearLabel = clearLabel || __( '画像をクリア', 'ystandard-blocks' );
	const _selectLabel = selectLabel || __( '画像を選択', 'ystandard-blocks' );

	const handleOnSelect = ( newMedia ) => {
		if ( onSelectRaw ) {
			onSelectRaw( newMedia );
			return;
		}
		onSelect( {
			type: newMedia?.type,
			id: newMedia?.id,
			url: newMedia?.url,
			alt: newMedia?.alt,
		} );
	};

	const _render = ( obj ) => {
		const mediaType = media?.type || 'image';
		const mediaId = media?.id || 0;
		const mediaUrl = media?.url || '';
		if ( ! mediaId && ! mediaUrl ) {
			return (
				<Button
					className={ 'ystdtb-media-upload-control__select' }
					variant="secondary"
					onClick={ obj.open }
				>
					{ _selectLabel }
				</Button>
			);
		}

		return (
			<div className="ystdtb-media-upload-control__render">
				<Button
					onClick={ obj.open }
					className={ 'ystdtb-media-upload-control__preview' }
				>
					{ 'image' === mediaType && (
						<img src={ mediaUrl } alt={ media?.alt } />
					) }
					{ 'video' === mediaType && (
						<video
							autoPlay
							muted
							loop
							playsInline
							src={ mediaUrl }
						/>
					) }
				</Button>
				<Button
					className={ 'ystdtb-media-upload-control__clear' }
					isDestructive
					onClick={ onClear }
				>
					{ _clearLabel }
				</Button>
			</div>
		);
	};
	return (
		<div className="ystdtb-media-upload-control">
			<MediaComponent
				onSelect={ handleOnSelect }
				type={ _mediaTypes }
				value={ value }
				render={ _render }
			/>
		</div>
	);
};
MediaUploadControl.Utils = ( {
	media,
	mediaTypes,
	onSelect,
	onSelectRaw,
	onClear,
	value,
	clearLabel,
	selectLabel,
	...props
} ) => {
	return (
		<MediaUploadControl
			media={ media }
			mediaTypes={ mediaTypes }
			onSelect={ onSelect }
			onSelectRaw={ onSelectRaw }
			onClear={ onClear }
			value={ value }
			clearLabel={ clearLabel }
			selectLabel={ selectLabel }
			useUtils={ true }
			{ ...props }
		/>
	);
};

export default MediaUploadControl;
