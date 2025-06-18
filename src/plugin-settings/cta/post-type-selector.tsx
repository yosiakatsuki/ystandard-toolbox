/**
 * WordPress Dependencies
 */
import { useContext, useEffect, useState } from '@wordpress/element';

/**
 * Plugin Dependencies
 */
import CustomSelectControl from '@aktk/components/custom-select-control';
import { getPluginSetting } from '@aktk/plugin-settings/utils/setting';

/**
 * Components
 */
import { CtaContext } from './index';

/**
 * デフォルトの投稿タイプ選択肢
 * 初期状態では「----」が表示される
 */
const DEFAULT_POST_TYPE_OPTIONS = [ { name: '----', key: '' } ];

/**
 * 投稿タイプ選択コンポーネント
 * CTA設定対象の投稿タイプを選択する
 */
export default function PostTypeSelector(): JSX.Element {
	const { selectPostType, setSelectPostType, setIsShowTab } =
		useContext( CtaContext );

	// 利用可能な投稿タイプの状態管理
	const [ postTypes, setPostTypes ] = useState( DEFAULT_POST_TYPE_OPTIONS );

	/**
	 * コンポーネント初期化時の処理
	 * プラグイン設定から利用可能な投稿タイプを取得し、最初の投稿タイプを自動選択
	 */
	useEffect( () => {
		const _postTypes =
			getPluginSetting( 'ctaSelectPostType' ) ||
			DEFAULT_POST_TYPE_OPTIONS;
		setPostTypes( _postTypes );
		if ( Array.isArray( _postTypes ) ) {
			handleOnChangePostType( _postTypes[ 0 ]?.key );
		}
	}, [] );

	/**
	 * 投稿タイプ変更時の処理
	 * 選択された投稿タイプを設定し、タブ表示を制御
	 */
	const handleOnChangePostType = ( newValue: string ) => {
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
}
