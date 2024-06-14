/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { TAB_CLASS } from './const';
import './style-editor.scss';

interface ResponsiveSelectTabProps {
	initialTabName?: 'default' | 'responsive' | undefined;
	isResponsive?: boolean;
	defaultTabContent: React.ReactNode;
	responsiveTabContent: React.ReactNode;
}

const TABS = [
	{
		name: 'default',
		title: __( '標準', 'ystandard-toolbox' ),
		className: TAB_CLASS,
	},
	{
		name: 'responsive',
		title: __( 'デバイス別', 'ystandard-toolbox' ),
		className: TAB_CLASS,
	},
];

export function ResponsiveSelectTab( props: ResponsiveSelectTabProps ) {
	const {
		initialTabName = undefined,
		defaultTabContent,
		responsiveTabContent,
		isResponsive = false,
	} = props;

	const _initialTabName =
		initialTabName ?? isResponsive ? 'responsive' : 'default';

	return (
		<TabPanel
			tabs={ TABS }
			initialTabName={ _initialTabName }
			className={ 'aktk-responsive-select-tab' }
		>
			{ ( tab ) => {
				return (
					<div className={ 'pt-4' }>
						{ tab.name === 'responsive'
							? responsiveTabContent
							: defaultTabContent }
					</div>
				);
			} }
		</TabPanel>
	);
}

export function ResponsiveControlGrid( {
	children,
}: {
	children: React.ReactNode;
} ) {
	return (
		<div className={ 'grid grid-cols-1 gap-4 md:grid-cols-3' }>
			{ children }
		</div>
	);
}