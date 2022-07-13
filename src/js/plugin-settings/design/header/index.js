/**
 * WordPress
 */
import { useContext, useEffect, useState } from '@wordpress/element';
/**
 * yStandard
 */
import { DesignContext } from '../index';
/**
 * Section
 */
import SubHeader from './sub-header';
import Overlay from './overlay';

const TAB_NAME = 'header';
const SECTION_NAME = 'header_design';

const Header = ( { tab } ) => {
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
			<SubHeader { ...panelProps } />
			<Overlay { ...panelProps } />
		</>
	);
};
export default Header;
