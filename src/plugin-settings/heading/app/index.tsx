/**
 * WordPress
 */
import { useState, useEffect, createContext } from '@wordpress/element';
/**
 * yStandard
 */
import { apiPost, getEndpoint } from '@aktk/api';
import { notifySuccess, notifyError } from '@aktk/components/toast-message';
import Buttons from '@aktk/plugin-settings/components/buttons';
import { getPluginSettings } from '@aktk/plugin-settings/function/setting';
import LevelSelect from './select';
import { getHeadingStyles, getLevelList } from './api';

interface HeadingAppProps {
	setIsLoading: ( value: boolean ) => void;
}

type AppMode = 'select' | 'add' | 'update';

// @ts-ignore
export const HeadingContext = createContext();

export default function HeadingApp( props: HeadingAppProps ) {
	const { setIsLoading } = props;
	const [ isUpdate, setIsUpdate ] = useState( false );
	const [ appMode, setAppMode ] = useState< AppMode >( 'select' );
	const [ selectedLevel, setSelectedLevel ] = useState< string >( '' );
	const [ levelList, setLevelList ] = useState( {} );
	const [ headingStyles, setHeadingStyles ] = useState( {} );

	const initLevelList = async () => {
		const level = await getLevelList();
		setLevelList( level );
	};
	const initHeadingStyles = async () => {
		const styles = await getHeadingStyles();
		setHeadingStyles( styles );
	};

	const initApp = async () => {
		setIsLoading( true );
		await initLevelList();
		await initHeadingStyles();
		setIsLoading( false );
	};
	useEffect( () => {
		initApp();
	}, [] );
	const updateSettings = ( value ) => {};
	const handleOnClickUpdate = () => {
		setIsLoading( true );
		setTimeout( () => {
			setIsLoading( false );
			notifySuccess();
		}, 1000 );
		// setIsUpdate( true );
		// setIsLoading( true );
	};
	return (
		<div>
			{ /* @ts-ignore */ }
			<HeadingContext.Provider
				value={ {
					appMode,
					setAppMode,
					selectedLevel,
					setSelectedLevel,
					levelList,
					initLevelList,
					headingStyles,
					initHeadingStyles,
				} }
			>
				<div className={ 'pb-5' }>
					{ 'select' === appMode && <LevelSelect /> }
				</div>
			</HeadingContext.Provider>

			<Buttons
				onClickUpdate={ handleOnClickUpdate }
				isDisabled={ isUpdate }
			/>
		</div>
	);
}
