/**
 * WordPress
 */
import { useContext, useState, useEffect } from '@wordpress/element';
/**
 * Settings Dependencies
 */
import { DesignContext } from '../index';
import {
	DesignSettingsTab,
	DesignSettingsSection,
	ArchiveSettings,
} from '../types';
/**
 * Section
 */
import Layout from './layout';
import Image from './image';
import Date from './date';
import Sort from './sort';

const TAB_NAME = 'archive';
const SECTION_NAME = 'archive' as DesignSettingsSection;

export interface PanelProps {
	updateSection: ( value: ArchiveSettings ) => void;
	sectionSettings: ArchiveSettings;
}

export default function Archive( {
	tab,
}: {
	tab: DesignSettingsTab;
} ): JSX.Element | null {
	// @ts-ignore
	const { settings, getSettings, updateSettings } =
		// @ts-ignore
		useContext( DesignContext );
	const [ sectionSettings, setSectionSettings ] = useState< ArchiveSettings >(
		{}
	);
	const getSectionSettings = (): void => {
		setSectionSettings( getSettings( SECTION_NAME ) as ArchiveSettings );
	};
	// @ts-ignore
	useEffect( getSectionSettings, [ settings ] );

	// 設定更新.
	const updateSection = ( value: ArchiveSettings ): void => {
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
			<Layout { ...panelProps } />
			<Image { ...panelProps } />
			<Date { ...panelProps } />
			<Sort { ...panelProps } />
		</>
	);
}
