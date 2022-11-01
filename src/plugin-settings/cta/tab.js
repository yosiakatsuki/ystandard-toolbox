/**
 * WordPress
 */
import { useContext, useState, useEffect } from '@wordpress/element';
/**
 * yStandard
 */
import Notice from '@aktk/components/notice';
import SettingsTab from '@aktk/plugin-settings/components/settings-tab';

import { getPluginSettings } from '../function/setting';
import { CtaContext } from './index';
import ListContainer from './list-container';
import { isObject } from '@aktk/helper/object.js';
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

const Tab = () => {
	const {
		settings,
		ctaItems,
		setCtaItems,
		selectPostType,
		isLoading,
		setIsLoading,
		setIsUpdate,
		updateSettings,
		isShowTab,
	} = useContext( CtaContext );

	const handleOnChangeCta = ( newValue, position ) => {
		const newPostTypeCtaItem = {
			...getPostTypeCta( selectPostType ),
			...{
				[ position ]: newValue,
			},
		};
		setCtaItems( {
			...ctaItems,
			...{
				[ selectPostType ]: newPostTypeCtaItem,
			},
		} );
	};

	const getPostTypeCta = ( postType ) => {
		return Object.hasOwnProperty.call( ctaItems, postType )
			? ctaItems[ postType ]
			: settings?.ctaDefault;
	};

	const getItems = ( position ) => {
		const items = getPostTypeCta( selectPostType );
		return items[ position ];
	};

	return (
		<div className="ystdtb-settings-cta__tab">
			<PostTypeSelector />
			{ isShowTab && (
				<SettingsTab tabs={ TABS }>
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
