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
import { getPluginSettings } from '@aktk/plugin-settings/utils/setting';
import Html from './html';
import FontFamily from './font-family';

export const FontContext = createContext();

const Font = () => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isUpdate, setIsUpdate ] = useState( false );
	const [ settings, setSettings ] = useState( {} );
	const initSettings = () => {
		setSettings( getPluginSettings( 'font' ) );
		setIsLoading( false );
	};
	useEffect( initSettings, [] );
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

	return (
		<PageBase title={ 'フォント設定' } loading={ isLoading }>
			<FontContext.Provider
				value={ {
					settings,
					setSettings,
					isLoading,
					setIsLoading,
					updateSettings,
				} }
			>
				<Html />
				<FontFamily />
			</FontContext.Provider>
			<Buttons
				onClickUpdate={ handleOnClickUpdate }
				isDisabled={ isUpdate }
			/>
			<ToastContainer />
		</PageBase>
	);
};

render( <Font />, document.getElementById( 'font' ) );
