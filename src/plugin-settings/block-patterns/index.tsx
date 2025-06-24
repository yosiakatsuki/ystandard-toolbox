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
import { apiPost, getEndpoint } from '@aktk/api';
/**
 * Plugin Dependencies
 */
import AppContainer from '@aktk/plugin-settings/components/app-container';
import { getPluginSetting } from '@aktk/plugin-settings/utils/setting';
import { getObjectValue } from '@aktk/helper/object.js';
import CorePattern from './core-pattern';

/**
 * ブロックパターン設定のコンテキスト型定義
 */
interface BlockPatternsContextType {
	settings: Record< string, any >;
	setSettings: React.Dispatch<
		React.SetStateAction< Record< string, any > >
	>;
	isLoading: boolean;
	setIsLoading: React.Dispatch< React.SetStateAction< boolean > >;
	getSetting: ( name: string ) => any;
}

export const BlockPatternsContext = createContext< BlockPatternsContextType >( {
	settings: {},
	setSettings: () => {},
	isLoading: true,
	setIsLoading: () => {},
	getSetting: () => {},
} );

/**
 * ブロックパターン設定画面のメインコンポーネント
 * WordPressのコアブロックパターンの表示制御機能を提供
 */
export default function BlockPatterns(): JSX.Element {
	// ローディング状態管理
	const [ isLoading, setIsLoading ] = useState< boolean >( true );
	// 更新処理中の状態管理
	const [ isUpdate, setIsUpdate ] = useState< boolean >( false );
	// ブロックパターン設定データ管理
	const [ settings, setSettings ] = useState< Record< string, any > >( {} );

	/**
	 * 初期設定を読み込む
	 */
	const getSettings = () => {
		setSettings( getPluginSetting( 'block-pattern' ) );
		setIsLoading( false );
	};
	useEffect( getSettings, [] );

	/**
	 * 設定値を取得するヘルパー関数
	 */
	const getSetting = ( name: string ) => {
		return getObjectValue( settings, name );
	};

	/**
	 * 更新ボタンクリック時の処理
	 * ブロックパターン設定をサーバーに保存する
	 */
	const handleOnClickUpdate = () => {
		setIsUpdate( true );
		setIsLoading( true );
		apiPost( {
			endpoint: getEndpoint( 'update_block_pattern' ),
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
	const blockPatternsContextValue: BlockPatternsContextType = {
		settings,
		setSettings,
		isLoading,
		setIsLoading,
		getSetting,
	};

	return (
		<AppContainer
			title={ __( 'ブロックパターン', 'ystandard-toolbox' ) }
			loading={ isLoading }
		>
			{ /* @ts-ignore */ }
			<BlockPatternsContext.Provider value={ blockPatternsContextValue }>
				<CorePattern />
			</BlockPatternsContext.Provider>
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
const container = document.getElementById( 'block-patterns' );
if ( container ) {
	const root = createRoot( container );
	root.render( <BlockPatterns /> );
}
