/**
 * WordPress
 */
import { useContext } from '@wordpress/element';
/**
 * yStandard
 */
import { DesignContext } from '../index';
import Layout from './layout';

const TAB_NAME = 'archive';

const Archive = ( { tab } ) => {
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
			<Layout { ...panelProps } />
		</>
	);
};

export default Archive;
