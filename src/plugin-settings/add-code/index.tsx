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
import EditorTab from './editor-tab';
import { getCodeSetting } from '../function/setting';
import Buttons from '@aktk/plugin-settings/components/buttons';
import { update } from './update';

export const AddCodeContext = createContext();

const AddCode = () => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isUpdate, setIsUpdate ] = useState( false );
	const [ settings, setSettings ] = useState( {} );
	const getSettings = () => {
		setSettings( getCodeSetting() );
		setIsLoading( false );
	};
	useEffect( getSettings, [] );
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
	return (
		<PageBase title={ 'コード追加' } loading={ isLoading }>
			<AddCodeContext.Provider
				value={ {
					settings,
					setSettings,
					isLoading,
					setIsLoading,
				} }
			>
				<EditorTab />
			</AddCodeContext.Provider>
			<Buttons
				onClickUpdate={ handleOnClickUpdate }
				isDisabled={ isUpdate }
			/>
			<ToastContainer />
		</PageBase>
	);
};
render( <AddCode />, document.getElementById( 'add-code' ) );
