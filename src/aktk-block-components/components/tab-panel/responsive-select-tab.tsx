/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { TAB_CLASS } from './const';
import './style-editor.scss';

interface ResponsiveSelectTabProps {
	initialTabName?: 'default' | 'responsive';
	defaultTabContent: React.ReactNode;
	responsiveTabContent: React.ReactNode;
}

const TABS = [
	{
		name: 'default',
		title: __( '共通', 'ystandard-toolbox' ),
		className: TAB_CLASS,
	},
	{
		name: 'responsive',
		title: __( 'デバイス別', 'ystandard-toolbox' ),
		className: TAB_CLASS,
	},
];

export function ResponsiveSelectTab( props: ResponsiveSelectTabProps ) {
	const { initialTabName, defaultTabContent, responsiveTabContent } = props;

	return (
		<TabPanel
			tabs={ TABS }
			initialTabName={ initialTabName }
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
