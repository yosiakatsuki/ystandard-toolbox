import React from 'react';
/**
 * WordPress Dependencies
 */
import {
	useState,
	useEffect,
	createContext,
	createRoot,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import {
	ToastContainer,
	notifySuccess,
	notifyError,
} from '@aktk/block-components/components/toast-message';
import { PrimaryButton } from '@aktk/block-components/components/buttons/buttons';
/**
 * Plugin Dependencies
 */
import AppContainer from '@aktk/plugin-settings/components/app-container';
import EditorTab from './editor-tab';
import { getCodeSetting } from '../utils/setting';
import { update } from './update';

/**
 * コード追加設定のコンテキスト型定義
 */
interface AddCodeContextType {
	settings: Record< string, any >;
	setSettings: React.Dispatch<
		React.SetStateAction< Record< string, any > >
	>;
	isLoading: boolean;
	setIsLoading: React.Dispatch< React.SetStateAction< boolean > >;
}

export const AddCodeContext = createContext< AddCodeContextType >( {
	settings: {},
	setSettings: () => {},
	isLoading: true,
	setIsLoading: () => {},
} );

/**
 * コード追加設定画面のメインコンポーネント
 * ヘッダー、フッター、その他のコード追加機能を提供
 */
export default function AddCode(): JSX.Element {
	// ローディング状態管理
	const [ isLoading, setIsLoading ] = useState< boolean >( true );
	// 更新処理中の状態管理
	const [ isUpdate, setIsUpdate ] = useState< boolean >( false );
	// コード追加設定データ管理
	const [ settings, setSettings ] = useState< Record< string, any > >( {} );
	/**
	 * 初期設定を読み込む
	 */
	const getSettings = () => {
		setSettings( getCodeSetting() );
		setIsLoading( false );
	};
	useEffect( getSettings, [] );
	/**
	 * 更新ボタンクリック時の処理
	 * コード追加設定をサーバーに保存する
	 */
	const handleOnClickUpdate = () => {
		setIsUpdate( true );
		setIsLoading( true );
		update( {
			data: settings,
			callback: () => {
				setIsUpdate( false );
				setIsLoading( false );
			},
			success: notifySuccess,
			error: notifyError,
		} );
	};
	// コンテキスト値の準備
	const addCodeContextValue: AddCodeContextType = {
		settings,
		setSettings,
		isLoading,
		setIsLoading,
	};

	return (
		<AppContainer
			title={ __( 'コード追加', 'ystandard-toolbox' ) }
			loading={ isLoading }
		>
			{ /* @ts-ignore */ }
			<AddCodeContext.Provider value={ addCodeContextValue }>
				<EditorTab />
			</AddCodeContext.Provider>
			<div className="flex justify-between mt-4">
				<PrimaryButton
					onClick={ handleOnClickUpdate }
					disabled={ isUpdate }
					isBusy={ isUpdate }
					icon={ 'cloud-upload' }
				>
					{ __( '変更を保存', 'ystandard-toolbox' ) }
				</PrimaryButton>
			</div>
			<ToastContainer />
		</AppContainer>
	);
}

// レンダリング処理
const container = document.getElementById( 'add-code' );
if ( container ) {
	const root = createRoot( container );
	root.render( <AddCode /> );
}
