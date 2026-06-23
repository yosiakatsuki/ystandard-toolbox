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
import WPCustomCss from './wp-custom-css';
import './_index.scss';
import Code from './code';

/**
 * カスタムCSS設定のコンテキスト型定義
 */
interface CustomCssContextType {
	settings: Record< string, any >;
	setSettings: React.Dispatch<
		React.SetStateAction< Record< string, any > >
	>;
	isLoading: boolean;
	setIsLoading: React.Dispatch< React.SetStateAction< boolean > >;
	updateSettings: ( value: Record< string, any > ) => void;
}

export const CustomCssContext = createContext< CustomCssContextType >( {
	settings: {},
	setSettings: () => {},
	isLoading: true,
	setIsLoading: () => {},
	updateSettings: () => {},
} );

/**
 * カスタムCSS設定画面のメインコンポーネント
 * WordPress標準のカスタムCSSとプラグイン独自のCSS編集機能を提供
 */
export default function CustomCss(): JSX.Element {
	// ローディング状態管理
	const [ isLoading, setIsLoading ] = useState< boolean >( true );
	// 更新処理中の状態管理
	const [ isUpdate, setIsUpdate ] = useState< boolean >( false );
	// カスタムCSS設定データ管理
	const [ settings, setSettings ] = useState< Record< string, any > >( {} );
	/**
	 * 初期設定を読み込む
	 */
	const initSettings = () => {
		setSettings( getPluginSettings( 'customCss' ) );
		setIsLoading( false );
	};
	useEffect( initSettings, [] );
	/**
	 * 設定値を更新する
	 * @param value - 更新する設定値
	 */
	const updateSettings = ( value: Record< string, any > ) => {
		setSettings( {
			...settings,
			...value,
		} );
	};
	/**
	 * 更新ボタンクリック時の処理
	 * APIを通じてカスタムCSS設定をサーバーに保存する
	 */
	const handleOnClickUpdate = () => {
		setIsUpdate( true );
		setIsLoading( true );
		apiPost( {
			endpoint: getEndpoint( 'update_custom_css' ),
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
	const customCssContextValue: CustomCssContextType = {
		settings,
		setSettings,
		isLoading,
		setIsLoading,
		updateSettings,
	};

	return (
		<AppContainer
			title={ __( 'カスタムCSS', 'ystandard-toolbox' ) }
			loading={ isLoading }
		>
			{ /* @ts-ignore */ }
			<CustomCssContext.Provider value={ customCssContextValue }>
				<WPCustomCss />
				<Code />
			</CustomCssContext.Provider>
			<div className="mt-4 flex justify-between">
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
const container = document.getElementById( 'custom-css' );
if ( container ) {
	const root = createRoot( container );
	root.render( <CustomCss /> );
}
