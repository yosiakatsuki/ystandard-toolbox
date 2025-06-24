/**
 * WordPress
 */
import { useContext } from '@wordpress/element';
/**
 * Plugin dependencies
 */
import { SettingsTab } from '@aktk/plugin-settings/components/settings-tab';
import { getPluginSetting } from '@aktk/plugin-settings/utils/setting';
/**
 * App
 */
import { CtaContext } from './index';
import ListContainer from './list-container';
import PostTypeSelector from './post-type-selector';

/**
 * 利用可能なタブの定義
 * ヘッダーとフッターの2つの位置でCTAを設定可能
 */
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

/**
 * タブ名からタブのタイトルを取得する関数
 * @param {string} name - タブ名
 * @return {string} タブのタイトル
 */
export function getTabName( name: string ): string {
	const currentTab = name || 'footer';
	const selected = TABS.filter( ( item ) => {
		return item.name === currentTab;
	} );

	if ( selected.length === 0 ) {
		return '';
	}
	return selected[ 0 ].title;
}

/**
 * 指定された投稿タイプのデフォルトCTA設定を取得する関数
 * @param {string} postType - 投稿タイプ
 * @return {Object} デフォルトCTA設定
 */
export function getCtaDefault( postType: string ) {
	const ctaDefault = getPluginSetting( 'ctaDefault', {} );
	return Object.hasOwnProperty.call( ctaDefault, postType )
		? ctaDefault[ postType ]
		: ctaDefault._default;
}

/**
 * CTAタブコンポーネント
 * 投稿タイプ選択とヘッダー/フッター位置でのCTA設定を管理
 */
export default function Tab(): JSX.Element {
	const { ctaItems, setCtaItems, selectPostType, isShowTab, setSelectedTab } =
		useContext( CtaContext );

	/**
	 * CTA設定変更時の処理
	 * 指定された位置のCTA設定を更新する
	 * @param newValue
	 * @param position
	 */
	const handleOnChangeCta = ( newValue: any, position: string ) => {
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

	/**
	 * 指定された投稿タイプのCTA設定を取得
	 * 設定が存在しない場合はデフォルト値を使用
	 * @param postType
	 */
	const getPostTypeCta = ( postType: string ) => {
		return Object.hasOwnProperty.call( ctaItems, postType )
			? ctaItems[ postType ]
			: getCtaDefault( postType );
	};

	/**
	 * 指定された位置のCTAアイテムを取得
	 * @param position
	 */
	const getItems = ( position: string ) => {
		const items = getPostTypeCta( selectPostType );
		return items[ position ];
	};

	/**
	 * タブ選択時の処理
	 * @param tab
	 */
	const handleOnSelectTab = ( tab: string ) => {
		setSelectedTab( tab );
	};

	return (
		<div>
			<PostTypeSelector />
			{ isShowTab && (
				<SettingsTab tabs={ TABS } onSelect={ handleOnSelectTab }>
					{ ( tab ) => {
						return (
							<ListContainer
								items={ getItems( tab.name ) }
								setItems={ ( newValue ) => {
									handleOnChangeCta( newValue, tab.name );
								} }
								position={ tab.name }
							/>
						);
					} }
				</SettingsTab>
			) }
		</div>
	);
}
