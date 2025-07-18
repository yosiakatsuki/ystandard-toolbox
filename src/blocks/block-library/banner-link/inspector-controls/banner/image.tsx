/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { TabPanel, FocalPointPicker } from '@wordpress/components';

/*
 * Plugin Dependencies
 */
import MediaUploadControl from '@aktk/components/media-upload-control';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const Image = ( props ) => {
	const { attributes, setAttributes } = props;

	const { backgroundImage, backgroundImageFocalPoint } = attributes;

	let tabs = [
		{
			name: 'image',
			title: __( '画像', 'ystandard-toolbox' ),
		},
	];
	if ( backgroundImage?.url ) {
		tabs = [
			...tabs,
			{
				name: 'focalPoint',
				title: __( '焦点', 'ystandard-toolbox' ),
			},
		];
	}

	const handleImageOnSelect = ( media ) => {
		setAttributes( { backgroundImage: media } );
	};
	const handleImageOnClear = () => {
		setAttributes( {
			backgroundImage: undefined,
			backgroundImageFocalPoint: undefined,
		} );
	};
	const handleFocalPointOnChange = ( value ) => {
		const isReset = 0.5 === value?.x && 0.5 === value?.y;
		setAttributes( {
			backgroundImageFocalPoint: isReset ? undefined : value,
		} );
	};
	return (
		<BaseControl
			id={ 'backgroundImage' }
			label={ __( '画像設定', 'ystandard-toolbox' ) }
		>
			<TabPanel
				className={ 'ystdtb-banner-link-inspector-controls__image' }
				tabs={ tabs }
			>
				{ ( tab ) => {
					return (
						<>
							{ 'image' === tab.name && (
								<BaseControl id="banner-image-upload">
									<MediaUploadControl
										media={ backgroundImage }
										onSelect={ handleImageOnSelect }
										onClear={ handleImageOnClear }
										value={ backgroundImage }
									/>
								</BaseControl>
							) }
							{ 'focalPoint' === tab.name && (
								<BaseControl id="banner-image-focal-point">
									<FocalPointPicker
										value={ backgroundImageFocalPoint }
										onChange={ handleFocalPointOnChange }
										url={ backgroundImage?.url }
									/>
								</BaseControl>
							) }
						</>
					);
				} }
			</TabPanel>
		</BaseControl>
	);
};
export default Image;
