import queryString from 'query-string';
/**
 * WordPress
 */
import { render, useState, useEffect, createContext } from '@wordpress/element';
/**
 * yStandard
 */
import PageBase from '../component/page-base';
import {
	ToastContainer,
	notifySuccess,
	notifyError,
} from '@aktk/components/toast-message';
import { getPluginSetting } from '../function/setting';
import { hasObjectKey } from '@aktk/helper/object.js';
import { update } from './update';
/**
 * Admin
 */
import Buttons from '../component/buttons';
import SettingsTab from '../component/settings-tab';
import Copyright from './copyright';
import Header from './header';

export const DesignContext = createContext();
const Design = () => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isUpdate, setIsUpdate ] = useState( false );
	const [ settings, setSettings ] = useState( {} );

	useEffect( () => {
		setSettings( getPluginSetting() );
		setIsLoading( false );
	}, [] );

	// eslint-disable-next-line no-undef
	const parsed = queryString.parse( location.search );
	const initialTabName = parsed?.tab;

	const getSettings = ( section = undefined ) => {
		if ( ! section || ! hasObjectKey( settings, section ) ) {
			return settings;
		}
		return settings[ section ];
	};
	const updateSettings = ( section, value ) => {
		setSettings( {
			...settings,
			...{
				[ section ]: value,
			},
		} );
	};

	const handleOnClickUpdate = () => {
		setIsUpdate( true );
		setIsLoading( true );
		update( {
			data: settings,
			callback: ( response ) => {
				if ( response?.data ) {
					setSettings( response?.data );
				}
				setIsUpdate( false );
				setIsLoading( false );
			},
			success: notifySuccess,
			error: notifyError,
		} );
	};

	const tabs = [
		{
			name: 'header',
			title: 'ヘッダー',
		},
		{
			name: 'menu',
			title: 'メニュー',
		},
		{
			name: 'archive',
			title: 'アーカイブ',
		},
		{
			name: 'copyright',
			title: 'Copyright',
		},
	];
	console.log( { designTab: settings } );
	return (
		<PageBase title={ 'サイトデザイン拡張' }>
			<DesignContext.Provider
				value={ {
					settings,
					isLoading,
					setIsLoading,
					isUpdate,
					setIsUpdate,
					getSettings,
					updateSettings,
				} }
			>
				<SettingsTab tabs={ tabs } initialTabName={ initialTabName }>
					{ ( tab ) => {
						return (
							<>
								<Copyright tab={ tab } />
								<Header tab={ tab } />
							</>
						);
					} }
				</SettingsTab>
			</DesignContext.Provider>
			<Buttons
				onClickUpdate={ handleOnClickUpdate }
				isDisabled={ isUpdate }
			/>
			<ToastContainer />
		</PageBase>
	);
};
render( <Design />, document.getElementById( 'design' ) );
