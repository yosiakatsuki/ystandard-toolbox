/**
 * WordPress
 */
import { render, useState, useEffect, createContext } from '@wordpress/element';
/**
 * yStandard
 */
import PageBase from '@aktk/plugin-settings/components/page-base';
import { getPluginSetting } from '../function/setting';
import {
	ToastContainer,
	notifySuccess,
	notifyError,
} from '@aktk/components/toast-message';
import Buttons from '@aktk/plugin-settings/components/buttons';
import { update } from './update';
import { getObjectValue } from '@aktk/helper/object.js';
import CorePattern from './core-pattern';

export const BlockPatternsContext = createContext();

const BlockPatterns = () => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isUpdate, setIsUpdate ] = useState( false );
	const [ settings, setSettings ] = useState( {} );

	useEffect( () => {
		setSettings( getPluginSetting( 'block-pattern' ) );
		setIsLoading( false );
	}, [] );

	const getSetting = ( name ) => {
		return getObjectValue( settings, name );
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

	return (
		<PageBase
			title={ 'ブロックパターン' }
			loading={ isLoading }
			manual={ 'ystdtb-block-patterns' }
		>
			<BlockPatternsContext.Provider
				value={ {
					settings,
					setSettings,
					isLoading,
					setIsLoading,
					getSetting,
				} }
			>
				<CorePattern />
			</BlockPatternsContext.Provider>
			<Buttons
				onClickUpdate={ handleOnClickUpdate }
				isDisabled={ isUpdate }
			/>
			<ToastContainer />
		</PageBase>
	);
};
render( <BlockPatterns />, document.getElementById( 'block-patterns' ) );
