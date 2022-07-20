/**
 * WordPress
 */
import { useContext, useState, useEffect } from '@wordpress/element';
/**
 * yStandard
 */
import { DesignContext } from '../index';
import Layout from './layout';
import Image from './image';
import Date from './date';
import Sort from './sort';

const TAB_NAME = 'archive';
const SECTION_NAME = 'archive';

const Archive = ( { tab } ) => {
	const { settings, getSettings, updateSettings } =
		useContext( DesignContext );
	const [ sectionSettings, setSectionSettings ] = useState( {} );
	const getSectionSettings = () => {
		setSectionSettings( getSettings( SECTION_NAME ) );
	};
	useEffect( getSectionSettings, [ settings ] );

	// 設定更新.
	const updateSection = ( value ) => {
		updateSettings( SECTION_NAME, {
			...sectionSettings,
			...value,
		} );
	};

	// タブチェック.
	if ( TAB_NAME !== tab?.name ) {
		return <></>;
	}
	const panelProps = {
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
};

export default Archive;
