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
import { getPluginSettings } from '../function/setting';
import WPCustomCss from './wp-custom-css';
import './_index.scss';
import Code from './code';

export const CustomCssContext = createContext();

const CustomCss = () => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isUpdate, setIsUpdate ] = useState( false );
	const [ settings, setSettings ] = useState( {} );
	const initSettings = () => {
		setSettings( getPluginSettings( 'customCss' ) );
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
	return (
		<PageBase title={ 'カスタムCSS' } loading={ isLoading }>
			<CustomCssContext.Provider
				value={ {
					settings,
					setSettings,
					isLoading,
					setIsLoading,
					updateSettings,
				} }
			>
				<WPCustomCss />
				<Code />
			</CustomCssContext.Provider>
			<Buttons
				onClickUpdate={ handleOnClickUpdate }
				isDisabled={ isUpdate }
			/>
			<ToastContainer />
		</PageBase>
	);
};
render( <CustomCss />, document.getElementById( 'custom-css' ) );
