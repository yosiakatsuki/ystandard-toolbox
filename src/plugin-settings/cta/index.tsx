import React from 'react';
/**
 * WordPress
 */
import {
	useState,
	useEffect,
	createContext,
	createRoot,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Aktk dependencies
 */
import {
	ToastContainer,
	notifySuccess,
	notifyError,
} from '@aktk/block-components/components/toast-message';
import {
	DestructiveButton,
	PrimaryButton,
} from '@aktk/block-components/components/buttons';
/**
 * Plugin dependencies
 */
import AppContainer from '@aktk/plugin-settings/components/app-container';
import { getPluginSetting } from '@aktk/plugin-settings/utils/setting';
import { apiPost, getEndpoint } from '@aktk/api';
/**
 * App
 */
import Tab from './tab';
import ModalReset from './modal-reset';

export const CtaContext: object = createContext( {} );

const Cta = () => {
	// ローディング状態管理
	const [ isLoading, setIsLoading ] = useState( true );
	// 更新処理中の状態管理
	const [ isUpdate, setIsUpdate ] = useState( false );
	// 設定タブの表示/非表示状態
	const [ isShowTab, setIsShowTab ] = useState( undefined );
	// CTA項目のデータ管理
	const [ ctaItems, setCtaItems ] = useState( {} );
	// 選択されている投稿タイプ
	const [ selectPostType, setSelectPostType ] = useState( '' );
	// 選択されているタブ
	const [ selectedTab, setSelectedTab ] = useState( '' );
	// リセットモーダルの表示状態
	const [ isResetModalOpen, setIsResetModalOpen ] = useState( false );

	/**
	 * CTA項目の初期化処理
	 * プラグイン設定からCTAデータを取得し、旧バージョンとの互換性を保つ
	 */
	const initCtaItems = () => {
		let _items = getPluginSetting( 'cta', {} );
		// 旧バージョンの設定を引き継ぐ
		if ( _items?.ctaSort ) {
			_items = _items.ctaSort;
			delete _items.ctaSort;
		}
		setCtaItems( _items );
		setIsLoading( false );
	};
	useEffect( initCtaItems, [] );

	/**
	 * 選択された投稿タイプに基づいて設定タブの表示を制御
	 */
	useEffect( () => {
		const _isShowSettingTab = !! selectPostType;
		setIsShowTab( _isShowSettingTab );
	}, [ selectPostType ] );

	/**
	 * 設定の更新処理
	 * REST APIを通じてサーバーに設定を保存する
	 * @param newValue
	 */
	const handleOnClickUpdate = (
		newValue: object | undefined = undefined
	) => {
		setIsUpdate( true );
		setIsLoading( true );
		apiPost( {
			endpoint: getEndpoint( 'update_cta' ),
			data: newValue,
			callback: ( response ) => {
				if ( response?.data ) {
					setCtaItems( response.data );
				}
				setIsUpdate( false );
				setIsLoading( false );
			},
			messageSuccess: notifySuccess,
			messageError: notifyError,
		} );
	};

	/**
	 * リセットボタンクリック時の処理
	 * リセット確認モーダルを表示する
	 */
	const handleOnClickReset = () => {
		setIsResetModalOpen( true );
	};

	/**
	 * 子コンポーネントに渡すContext値
	 */
	const ctaContextValue = {
		ctaItems,
		setCtaItems,
		selectPostType,
		setSelectPostType,
		isLoading,
		setIsLoading,
		setIsUpdate,
		isShowTab,
		setIsShowTab,
		selectedTab,
		setSelectedTab,
		setIsResetModalOpen,
	};
	return (
		<AppContainer
			title={ __( '投稿詳細ページ上下拡張', 'ystandard-toolbox' ) }
			loading={ isLoading }
		>
			{ /* @ts-ignore */ }
			<CtaContext.Provider value={ ctaContextValue }>
				<Tab />
				{ isResetModalOpen && (
					<ModalReset onClickUpdate={ handleOnClickUpdate } />
				) }
			</CtaContext.Provider>
			<div className="mt-4 flex justify-between">
				<PrimaryButton
					onClick={ () => handleOnClickUpdate( ctaItems ) }
					disabled={ isUpdate }
					icon={ 'cloud-upload' }
				>
					{ __( '変更を保存', 'ystandard-toolbox' ) }{ ' ' }
				</PrimaryButton>
				<DestructiveButton
					onClick={ handleOnClickReset }
					disabled={ isUpdate }
					style={ { fontSize: '0.7em' } }
				>
					{ __( '初期値に戻す', 'ystandard-toolbox' ) }
				</DestructiveButton>
			</div>
			<ToastContainer />
		</AppContainer>
	);
};

const container = document.getElementById( 'cta' );
const root = createRoot( container! );
root.render( <Cta /> );
