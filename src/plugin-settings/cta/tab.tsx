/**
 * WordPress
 */
import { useContext } from '@wordpress/element';
/**
 * yStandard
 */
import SettingsTab from '@aktk/plugin-settings/components/settings-tab';

import { getPluginSetting } from '../function/setting';
import { CtaContext } from './index';
import ListContainer from './list-container';
import PostTypeSelector from './post-type-selector';

const TABS = [
	{
		name: 'footer',
		title: 'フッター',
	},
	{
		name: 'header',
		title: 'ヘッダー',
	},
];

export const getTabName = ( name ) => {
	const currentTab = name || 'footer';
	const selected = TABS.filter( ( item ) => {
		return item.name === currentTab;
	} );

	if ( selected.length === 0 ) {
		return '';
	}
	return selected[ 0 ].title;
};

export const getCtaDefault = ( postType ) => {
	const ctaDefault = getPluginSetting( 'ctaDefault', {} );
	return Object.hasOwnProperty.call( ctaDefault, postType )
		? ctaDefault[ postType ]
		: ctaDefault._default;
};

const Tab = () => {
	const { ctaItems, setCtaItems, selectPostType, isShowTab, setSelectedTab } =
		useContext( CtaContext );

	const handleOnChangeCta = ( newValue, position ) => {
		const newPostTypeCtaItem = {
			...getPostTypeCta( selectPostType ),
			...{
				[ position ]: newValue,
			},
		};
		const newCtaItems = {
			...ctaItems,
			...{
				[ selectPostType ]: newPostTypeCtaItem,
			},
		};
		setCtaItems( newCtaItems );
	};

	const getPostTypeCta = ( postType ) => {
		return Object.hasOwnProperty.call( ctaItems, postType )
			? ctaItems[ postType ]
			: getCtaDefault( postType );
	};

	const getItems = ( position ) => {
		const items = getPostTypeCta( selectPostType );
		return items[ position ];
	};

	const handleOnSelectTab = ( tab ) => {
		setSelectedTab( tab );
	};

	return (
		<div className="ystdtb-settings-cta__tab">
			<PostTypeSelector />
			{ isShowTab && (
				<SettingsTab tabs={ TABS } onSelect={ handleOnSelectTab }>
					{ ( tab ) => {
						return (
							<>
								<ListContainer
									items={ getItems( tab.name ) }
									setItems={ ( newValue ) => {
										handleOnChangeCta( newValue, tab.name );
									} }
									position={ tab.name }
								/>
							</>
						);
					} }
				</SettingsTab>
			) }
		</div>
	);
};
export default Tab;
