import React from 'react';
/**
 * WordPress
 */
import { render, useState, useEffect, createContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * yStandard
 */
import {
	ToastContainer,
	notifySuccess,
	notifyError,
} from '@aktk/components/toast-message';
import PageBase from '@aktk/plugin-settings/components/page-base';
import Buttons from '@aktk/plugin-settings/components/buttons';
import { Flex, FlexItem } from '@aktk/components/flex';
/**
 * Block.
 */
import { getPluginSetting } from '../function/setting';
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
		<PageBase
			title={ __( '投稿詳細ページ上下拡張', 'ystandard-toolbox' ) }
			loading={ isLoading }
		>
			<CtaContext.Provider value={ ctaContextValue }>
				<Tab />
				{ isResetModalOpen && (
					<ModalReset onClickUpdate={ handleOnClickUpdate } />
				) }
			</CtaContext.Provider>
			<Flex justifyBetween>
				<FlexItem>
					<Buttons
						onClickUpdate={ () => handleOnClickUpdate( ctaItems ) }
						isDisabled={ isUpdate }
					/>
				</FlexItem>
				<FlexItem>
					<Buttons.Delete
						text={ __( '初期値に戻す', 'ystandard-toolbox' ) }
						onClick={ handleOnClickReset }
						isDisabled={ isUpdate }
						style={ { fontSize: '0.7em' } }
					/>
				</FlexItem>
			</Flex>
			<ToastContainer />
		</PageBase>
	);
};

render( <Cta />, document.getElementById( 'cta' ) );
