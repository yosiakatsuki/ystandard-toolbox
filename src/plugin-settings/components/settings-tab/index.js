import { TabPanel } from '@wordpress/components';
import classnames from 'classnames';

import './_editor.scss';

const SettingsTab = ( {
	className,
	children,
	tabs,
	initialTabName,
	orientation = 'horizontal',
	activeClass = 'is-active',
	onSelect,
} ) => {
	const settingsTabClassName = classnames(
		'aktk-settings-tab-panel',
		className
	);
	return (
		<TabPanel
			className={ settingsTabClassName }
			tabs={ tabs }
			children={ children }
			initialTabName={ initialTabName }
			orientation={ orientation }
			activeClass={ activeClass }
			onSelect={ onSelect }
		/>
	);
};
export default SettingsTab;
