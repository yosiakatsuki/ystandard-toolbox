//https://dev.classmethod.jp/articles/react-beautiful-dnd-react-ts/
/**
 * WordPress
 */
import { render, useState, useEffect, createContext } from '@wordpress/element';
/**
 * yStandard
 */
import { apiPost, getEndpoint } from '@aktk/api';
import {
	ToastContainer,
	notifySuccess,
	notifyError,
} from '@aktk/components/toast-message';
import PageBase from '@aktk/plugin-settings/components/page-base';
import Buttons from '@aktk/plugin-settings/components/buttons';
import { getPluginSetting } from '../function/setting';
import Tab from './tab';
import './index.scss';
import { isObject } from '@aktk/helper/object.js';

export const CtaContext = createContext();

const Cta = () => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isUpdate, setIsUpdate ] = useState( false );
	const [ isShowTab, setIsShowTab ] = useState( undefined );
	const [ settings, setSettings ] = useState( {} );
	const [ ctaItems, setCtaItems ] = useState( {} );
	const [ selectPostType, setSelectPostType ] = useState( '' );

	const initSettings = () => {
		setSettings( getPluginSetting() );
		setIsLoading( false );
	};
	useEffect( initSettings, [] );
	const initCtaItems = () => {
		let _items = { ...settings?.cta };
		if ( ! isObject( _items ) ) {
			return [];
		}
		if ( _items?.ctaSort ) {
			_items = _items.ctaSort;
			delete _items.ctaSort;
		}
		setCtaItems( _items );
	};
	useEffect( initCtaItems, [ settings ] );

	useEffect( () => {
		const _isShowSettingTab = !! selectPostType;
		setIsShowTab( _isShowSettingTab );
	}, [ setSelectPostType ] );

	const updateSettings = ( value ) => {
		setSettings( {
			...settings,
			...value,
		} );
	};
	const handleOnClickUpdate = () => {
		setIsUpdate( true );
		setIsLoading( true );
		apiPost( {
			endpoint: getEndpoint( '' ),
			data: settings,
			callback: () => {
				setIsUpdate( false );
				setIsLoading( false );
			},
			messageSuccess: notifySuccess,
			messageError: notifyError,
		} );
	};
	return (
		<PageBase title={ '投稿詳細ページ上下拡張' } loading={ isLoading }>
			<CtaContext.Provider
				value={ {
					settings,
					ctaItems,
					setCtaItems,
					selectPostType,
					setSelectPostType,
					isLoading,
					setIsLoading,
					setIsUpdate,
					updateSettings,
					isShowTab,
					setIsShowTab,
				} }
			>
				<Tab />
			</CtaContext.Provider>
			<Buttons
				onClickUpdate={ handleOnClickUpdate }
				isDisabled={ isUpdate }
				isBusy={ false }
			/>
			<ToastContainer />
		</PageBase>
	);
};

render( <Cta />, document.getElementById( 'cta' ) );
