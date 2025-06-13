/**
 * WordPress
 */
// @ts-ignore
import { useContext, useEffect, useState } from '@wordpress/element';
/**
 * Settings Dependencies
 */
import { DesignContext } from '../index';
import {
	DesignSettingsTab,
	DesignSettingsSection,
	HeaderSettings,
} from '../types';
/**
 * Section
 */
import SubHeader from './sub-header';
import Overlay from './overlay';

const TAB_NAME = 'header';
const SECTION_NAME = 'header_design' as DesignSettingsSection;

export interface PanelProps {
	updateSection: ( value: HeaderSettings ) => void;
	sectionSettings: HeaderSettings;
}

export default function Header( { tab }: { tab: DesignSettingsTab } ) {
	// @ts-ignore
	const { settings, getSettings, updateSettings } =
		// @ts-ignore
		useContext( DesignContext );
	const [ sectionSettings, setSectionSettings ] = useState< HeaderSettings >(
		{}
	);
	const getSectionSettings = (): void => {
		setSectionSettings( getSettings( SECTION_NAME ) as HeaderSettings );
	};
	// @ts-ignore
	useEffect( getSectionSettings, [ settings ] );

	// 設定更新.
	const updateSection = ( value: HeaderSettings ): void => {
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
			<SubHeader { ...panelProps } />
			<Overlay { ...panelProps } />
		</>
	);
}
