import CustomSelectControl from '@aktk/components/custom-select-control';
import { useContext, useEffect, useState } from '@wordpress/element';
import { CtaContext } from './index';

const DEFAULT_POST_TYPE_OPTIONS = [ { name: '----', key: '' } ];

const PostTypeSelector = () => {
	const { settings, selectPostType, setSelectPostType, setIsShowTab } =
		useContext( CtaContext );

	const [ postTypes, setPostTypes ] = useState( DEFAULT_POST_TYPE_OPTIONS );

	useEffect( () => {
		const _postTypes =
			settings?.ctaSelectPostType || DEFAULT_POST_TYPE_OPTIONS;
		setPostTypes( _postTypes );
		if ( Array.isArray( _postTypes ) ) {
			handleOnChangePostType( _postTypes[ 0 ]?.key );
		}
	}, [ settings ] );

	const handleOnChangePostType = ( newValue ) => {
		setSelectPostType( newValue );
		if ( !! newValue ) {
			setIsShowTab( true );
		}
	};

	return (
		<div className="ystdtb-settings-cta__post-type-selector">
			<CustomSelectControl
				label={ '投稿タイプ' }
				options={ postTypes }
				value={ selectPostType }
				onChange={ handleOnChangePostType }
				isHorizon
			/>
		</div>
	);
};
export default PostTypeSelector;
