import queryString from 'query-string';
/**
 * WordPress
 */
import { render, useState, useEffect, createContext } from '@wordpress/element';
/**
 * yStandard
 */
import PageBase from '@aktk/plugin-settings/components/page-base';
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
import Buttons from '@aktk/plugin-settings/components/buttons';
import SettingsTab from '@aktk/plugin-settings/components/settings-tab';
import Copyright from './copyright';
import Header from './header';
import Menu from './menu';
import Archive from './archive';

export const DesignContext = createContext();

const TABS = [
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
			return {};
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
				<SettingsTab tabs={ TABS } initialTabName={ initialTabName }>
					{ ( tab ) => {
						return (
							<>
								<Header tab={ tab } />
								<Menu tab={ tab } />
								<Archive tab={ tab } />
								<Copyright tab={ tab } />
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