/**
 * WordPress
 */
import { useContext, useEffect, useState } from '@wordpress/element';
/**
 * Settings Dependencies
 */
import { DesignContext } from '../index';
import {
	DesignSettingsTab,
	DesignSettingsSection,
	MenuSettings,
} from '../types';
/**
 * Section
 */
import RichDrawerMenu from './rich-drawer-menu';

const TAB_NAME = 'menu';
const SECTION_NAME = 'navigation' as DesignSettingsSection;

export interface PanelProps {
	updateSection: ( value: MenuSettings ) => void;
	sectionSettings: MenuSettings;
}

export default function Menu( {
	tab,
}: {
	tab: DesignSettingsTab;
} ): JSX.Element | null {
	// @ts-ignore
	const { settings, getSettings, updateSettings } =
		// @ts-ignore
		useContext( DesignContext );
	const [ sectionSettings, setSectionSettings ] = useState< MenuSettings >(
		{}
	);
	const getSectionSettings = (): void => {
		setSectionSettings( getSettings( SECTION_NAME ) as MenuSettings );
	};
	// @ts-ignore
	useEffect( getSectionSettings, [ settings ] );

	// 設定更新.
	const updateSection = ( value: MenuSettings ): void => {
		updateSettings( SECTION_NAME, {
			...sectionSettings,
			...value,
		} );
	};

	// タブチェック.
	if ( TAB_NAME !== tab?.name ) {
		return null;
	}

	const panelProps: PanelProps = {
		updateSection,
		sectionSettings,
	};
	return (
		<>
			<RichDrawerMenu { ...panelProps } />
		</>
	);
}
