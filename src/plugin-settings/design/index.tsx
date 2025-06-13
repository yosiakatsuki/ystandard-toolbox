import queryString from 'query-string';
import type { Context } from 'react';
/**
 * WordPress
 */
import {
	useState,
	useEffect,
	createContext,
	createRoot,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
/**
 * Aktk dependencies
 */
import {
	ToastContainer,
	notifySuccess,
	notifyError,
} from '@aktk/block-components/components/toast-message';
import { hasKey } from '@aktk/block-components/utils/object';
import { PrimaryButton } from '@aktk/block-components/components/buttons';
/**
 * Plugin dependencies
 */
import { apiPost, getEndpoint } from '@aktk/api';
import AppContainer from '@aktk/plugin-settings/components/app-container';
import { getPluginSetting } from '@aktk/plugin-settings/function/setting';
import { SettingsTab } from '@aktk/plugin-settings/components/settings-tab';
import { getEditorColors } from '@aktk/plugin-settings/utils';

/**
 * App
 */
import {
	DesignSettings,
	DesignSettingsTab,
	DesignSettingsSection,
} from './types';
import Copyright from './copyright';
import Header from './header';
import Menu from './menu';
import Archive from './archive';

interface DesignContextProps {
	settings: { [ key: string ]: any };
	isLoading: boolean;
	setIsLoading: ( value: boolean ) => void;
	isUpdate: boolean;
	setIsUpdate: ( value: boolean ) => void;
	getSettings: (
		section?: DesignSettingsSection
	) => DesignSettings | {} | undefined;
	updateSettings: (
		section: DesignSettingsSection,
		value: DesignSettings[ DesignSettingsSection ]
	) => void;
}

// @ts-ignore
export const DesignContext: Context< DesignContextProps > =
	// @ts-ignore
	createContext< DesignContextProps >();

const TABS: DesignSettingsTab[] = [
	{
		name: 'header',
		title: __( 'ヘッダー', 'ystandard-toolbox' ),
	},
	{
		name: 'menu',
		title: __( 'メニュー', 'ystandard-toolbox' ),
	},
	{
		name: 'archive',
		title: __( 'アーカイブ', 'ystandard-toolbox' ),
	},
	{
		name: 'copyright',
		title: __( 'Copyright', 'ystandard-toolbox' ),
	},
];

const Design = () => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isUpdate, setIsUpdate ] = useState( false );
	const [ settings, setSettings ] = useState< DesignSettings | {} >( {} );

	useEffect( () => {
		setSettings( getPluginSetting() );
		setIsLoading( false );
	}, [] );

	// eslint-disable-next-line no-undef
	const parsed = queryString.parse( location.search );
	const initialTabName = parsed?.tab as string | undefined;

	const getSettings = (
		section: DesignSettingsSection | undefined = undefined
	) => {
		if ( ! section || ! hasKey( settings, section ) ) {
			return {};
		}
		return ( settings as DesignSettings )[ section ];
	};

	const updateSettings = (
		section: DesignSettingsSection,
		value: DesignSettings[ DesignSettingsSection ]
	) => {
		setSettings( {
			...settings,
			...{
				[ section ]: value,
			},
		} );
	};

	// 設定更新.
	const handleOnClickUpdate = async () => {
		setIsUpdate( true );
		setIsLoading( true );
		await apiPost( {
			endpoint: getEndpoint( 'update_plugin_settings_all' ),
			data: settings,
			callback: ( response ) => {
				if ( response?.data ) {
					setSettings( response?.data );
				}
				setTimeout( () => {
					setIsUpdate( false );
					setIsLoading( false );
				}, 1000 );
			},
			messageSuccess: notifySuccess,
			messageError: notifyError,
		} );
	};

	// addFilter で テーマカラーを取得するフィルターを追加
	addFilter(
		'aktk.hooks.getThemeColors.themeColors',
		'ystandard-toolbox/settings/design/getThemeColors',
		() => getEditorColors()
	);

	return (
		<AppContainer title={ __( 'サイトデザイン拡張', 'ystandard-toolbox' ) } loading={ isLoading }>
			{ /* @ts-ignore */ }
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
				<SettingsTab
					tabs={ TABS }
					initialTabName={ initialTabName || '' }
				>
					{ ( tab: DesignSettingsTab ) => {
						return (
							<>
								<Header tab={ tab } />
								<Menu tab={ tab } />
								<Archive tab={ tab } />
								{ /* <Copyright tab={ tab } /> */ }
							</>
						);
					} }
				</SettingsTab>
			</DesignContext.Provider>
			<PrimaryButton
				onClick={ handleOnClickUpdate }
				disabled={ isUpdate }
				icon={ 'cloud-upload' }
			>
				{ __( '変更を保存', 'ystandard-toolbox' ) }
			</PrimaryButton>
			<ToastContainer />
		</AppContainer>
	);
};

const container = document.getElementById( 'design' );
const root = createRoot( container! );
root.render( <Design /> );
