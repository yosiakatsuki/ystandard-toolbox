import classnames from 'classnames';
import type { ReactNode } from 'react';
/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';
/**
 * App
 */
import './_editor.scss';

interface Tab {
	name: string;
	title: string;
	className?: string;
	icon?: any;
	disabled?: boolean;
	[ key: string ]: any;
}

export interface SettingsTabProps {
	className?: string;
	children: ( tab: Tab ) => ReactNode;
	tabs: Tab[];
	initialTabName?: string;
	orientation?: 'horizontal' | 'vertical';
	activeClass?: string;
	onSelect?: ( tabName: string ) => void;
}

export function SettingsTab( {
	className,
	children,
	tabs,
	initialTabName,
	orientation = 'horizontal',
	activeClass = 'is-active',
	onSelect,
}: SettingsTabProps ) {
	const settingsTabClassName = classnames(
		'aktk-settings-tab-panel',
		className
	);
	return (
		<TabPanel
			className={ settingsTabClassName }
			tabs={ tabs }
			initialTabName={ initialTabName }
			orientation={ orientation }
			activeClass={ activeClass }
			onSelect={ onSelect }
			children={ children }
		/>
	);
}
