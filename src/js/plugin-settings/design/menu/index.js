/**
 * WordPress
 */
import { useContext } from '@wordpress/element';
/**
 * yStandard
 */
import { DesignContext } from '../index';
import RichDrawerMenu from './rich-drawer-menu';

const TAB_NAME = 'menu';

const Menu = ( { tab } ) => {
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
			<RichDrawerMenu { ...panelProps } />
		</>
	);
};
export default Menu;
