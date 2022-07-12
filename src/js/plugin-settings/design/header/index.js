/**
 * WordPress
 */
import { useContext } from '@wordpress/element';
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

const Header = ( { tab } ) => {
	const { getSettings, updateSettings } = useContext( DesignContext );

	// 設定更新.
	const updateSection = ( section, value ) => {
		updateSettings( section, {
			...getSettings( section ),
			...value,
		} );
	};

	// タブチェック.
	if ( TAB_NAME !== tab?.name ) {
		return <></>;
	}

	const panelProps = {
		updateSection,
	};
	return (
		<>
			<SubHeader { ...panelProps } />
			<Overlay { ...panelProps } />
		</>
	);
};
export default Header;
