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
import Buttons from '../component/buttons';
import { getPluginSetting } from '../function/setting';
import SettingsTab from '../component/settings-tab';
import { hasObjectKey } from '@aktk/helper/object.js';
import Copyright from './copyright';
import { update } from './update';

export const DesignContext = createContext();
const Design = () => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isUpdate, setIsUpdate ] = useState( false );
	const [ settings, setSettings ] = useState( {} );

	useEffect( () => {
		setSettings( getPluginSetting() );
		setIsLoading( false );
	}, [] );

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
			callback: () => {
				setIsUpdate( false );
				setIsLoading( false );
			},
			success: notifySuccess,
			error: notifyError,
		} );
	};

	const tabs = [
		{
			name: 'copyright',
			title: 'Copyright編集',
		},
	];

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
				<SettingsTab tabs={ tabs }>
					{ ( tab ) => {
						return (
							<>
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
