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
/**
 * App
 */
import { getPluginSetting } from '@aktk/plugin-settings/utils/setting';
import ModalReset from './modal-reset';
import Tab from './tab';
import { update } from './update';
import './index.scss';

export const CtaContext: object = createContext( {} );

const Cta = () => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isUpdate, setIsUpdate ] = useState( false );
	const [ isShowTab, setIsShowTab ] = useState( undefined );
	const [ ctaItems, setCtaItems ] = useState( {} );
	const [ selectPostType, setSelectPostType ] = useState( '' );
	const [ selectedTab, setSelectedTab ] = useState( '' );
	const [ isResetModalOpen, setIsResetModalOpen ] = useState( false );

	const initCtaItems = () => {
		let _items = getPluginSetting( 'cta', {} );
		// 旧バージョンの設定を引き継ぐ.
		if ( _items?.ctaSort ) {
			_items = _items.ctaSort;
			delete _items.ctaSort;
		}
		setCtaItems( _items );
		setIsLoading( false );
	};
	useEffect( initCtaItems, [] );

	useEffect( () => {
		const _isShowSettingTab = !! selectPostType;
		setIsShowTab( _isShowSettingTab );
	}, [ selectPostType ] );

	const handleOnClickUpdate = (
		newValue: object | undefined = undefined
	) => {
		setIsUpdate( true );
		setIsLoading( true );
		update( {
			data: newValue,
			callback: ( response ) => {
				if ( response?.data ) {
					setCtaItems( response.data );
				}
				setIsUpdate( false );
				setIsLoading( false );
			},
			success: notifySuccess,
			error: notifyError,
		} );
	};
	const handleOnClickReset = () => {
		setIsResetModalOpen( true );
	};
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
			<div className="flex justify-between">
				<PrimaryButton
					onClick={ () => handleOnClickUpdate( ctaItems ) }
					disabled={ isUpdate }
					icon={ 'cloud-upload' }
				>
					{ ' ' }
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
