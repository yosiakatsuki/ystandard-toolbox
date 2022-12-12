import CustomSelectControl from '@aktk/components/custom-select-control';
import { useContext, useEffect, useState } from '@wordpress/element';
import { CtaContext } from './index';
import { getPluginSetting } from '../function/setting';

const DEFAULT_POST_TYPE_OPTIONS = [ { name: '----', key: '' } ];

const PostTypeSelector = () => {
	const { selectPostType, setSelectPostType, setIsShowTab } =
		useContext( CtaContext );

	const [ postTypes, setPostTypes ] = useState( DEFAULT_POST_TYPE_OPTIONS );

	useEffect( () => {
		const _postTypes =
			getPluginSetting( 'ctaSelectPostType' ) ||
			DEFAULT_POST_TYPE_OPTIONS;
		setPostTypes( _postTypes );
		if ( Array.isArray( _postTypes ) ) {
			handleOnChangePostType( _postTypes[ 0 ]?.key );
		}
	}, [] );

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
				__nextUnconstrainedWidth
			/>
		</div>
	);
};
export default PostTypeSelector;
