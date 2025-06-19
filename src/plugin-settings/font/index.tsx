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
import { apiPost, getEndpoint } from '@aktk/api';
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
import { getPluginSettings } from '@aktk/plugin-settings/utils/setting';
import Html from './html';
import FontFamily from './font-family';

/**
 * フォント設定のコンテキスト型定義
 */
interface FontContextType {
	settings: Record<string, any>;
	setSettings: React.Dispatch<React.SetStateAction<Record<string, any>>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	updateSettings: (value: Record<string, any>) => void;
}

export const FontContext = createContext<FontContextType>({
	settings: {},
	setSettings: () => {},
	isLoading: true,
	setIsLoading: () => {},
	updateSettings: () => {},
});

/**
 * フォント設定画面のメインコンポーネント
 */
export default function Font(): JSX.Element {
	// ローディング状態管理
	const [ isLoading, setIsLoading ] = useState<boolean>( true );
	// 更新処理中の状態管理
	const [ isUpdate, setIsUpdate ] = useState<boolean>( false );
	// フォント設定データ管理
	const [ settings, setSettings ] = useState<Record<string, any>>( {} );
	/**
	 * 初期設定を読み込む
	 */
	const initSettings = () => {
		setSettings( getPluginSettings( 'font' ) );
		setIsLoading( false );
	};
	useEffect( initSettings, [] );
	/**
	 * 設定値を更新する
	 * @param value - 更新する設定値
	 */
	const updateSettings = ( value: Record<string, any> ) => {
		setSettings( {
			...settings,
			...value,
		} );
	};
	/**
	 * 更新ボタンクリック時の処理
	 * APIを通じて設定をサーバーに保存する
	 */
	const handleOnClickUpdate = () => {
		setIsUpdate( true );
		setIsLoading( true );
		apiPost( {
			endpoint: getEndpoint( 'update_font' ),
			data: settings,
			callback: () => {
				setIsUpdate( false );
				setIsLoading( false );
			},
			messageSuccess: notifySuccess,
			messageError: notifyError,
		} );
	};

	// コンテキスト値の準備
	const fontContextValue: FontContextType = {
		settings,
		setSettings,
		isLoading,
		setIsLoading,
		updateSettings,
	};

	return (
		<AppContainer
			title={ __( 'フォント設定', 'ystandard-toolbox' ) }
			loading={ isLoading }
		>
			{ /* @ts-ignore */ }
			<FontContext.Provider value={ fontContextValue }>
				<Html />
				<FontFamily />
			</FontContext.Provider>
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
const container = document.getElementById( 'font' );
if ( container ) {
	const root = createRoot( container );
	root.render( <Font /> );
}
