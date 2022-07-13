/**
 * WordPress
 */
import { useContext, useEffect, useState } from '@wordpress/element';
/**
 * yStandard
 */
import { DesignContext } from '../index';
import RichDrawerMenu from './rich-drawer-menu';

const TAB_NAME = 'menu';
const SECTION_NAME = 'navigation';

const Menu = ( { tab } ) => {
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
			<RichDrawerMenu { ...panelProps } />
		</>
	);
};
export default Menu;
