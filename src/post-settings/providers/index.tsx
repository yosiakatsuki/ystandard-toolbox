/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Plugin Dependencies
 */
import {
	ITEM_FILTER,
	SECTION_FILTER,
	type PostSettingsContext,
	type PostSettingsItem,
	type PostSettingsProviderConfig,
	type PostSettingsSection,
} from '../types';
import { getProviderConfig } from './config';
import HeaderOverlaySetting from './header-overlay';
import MenuReplaceSetting from './menu-replace';

import './style.scss';

const NAMESPACE = 'ystandard-toolbox';

/**
 * 初期データと現在の投稿設定コンテキストが一致するか判定する.
 *
 * @param config  初期データ.
 * @param context 投稿設定コンテキスト.
 */
function isSameContext(
	config: PostSettingsProviderConfig,
	context: PostSettingsContext
) {
	return (
		config.postType === context.postType && config.postId === context.postId
	);
}

/**
 * Toolboxの投稿設定コンポーネントを共通フックへ登録する.
 *
 * @param config 初期データ.
 */
export function registerPostSettingsProviders(
	config: PostSettingsProviderConfig
) {
	if ( config.overlay.enabled ) {
		addFilter(
			SECTION_FILTER,
			`${ NAMESPACE }/design`,
			(
				sections: PostSettingsSection[],
				context: PostSettingsContext
			) =>
				isSameContext( config, context )
					? [
							...sections,
							{
								id: 'ystdtb/design',
								title: __(
									'[Toolbox]デザイン',
									'ystandard-toolbox'
								),
								order: 20,
							},
					  ]
					: sections
		);
		addFilter(
			ITEM_FILTER,
			`${ NAMESPACE }/header-overlay`,
			( items: PostSettingsItem[], context: PostSettingsContext ) =>
				isSameContext( config, context )
					? [
							...items,
							{
								id: 'ystdtb/header-overlay',
								section: 'ystdtb/design',
								order: 10,
								Component: HeaderOverlaySetting,
							},
					  ]
					: items
		);
	}

	if ( config.menuReplace.enabled ) {
		addFilter(
			SECTION_FILTER,
			`${ NAMESPACE }/navigation`,
			(
				sections: PostSettingsSection[],
				context: PostSettingsContext
			) =>
				isSameContext( config, context )
					? [
							...sections,
							{
								id: 'ystdtb/navigation',
								title: __(
									'[Toolbox]ナビゲーション',
									'ystandard-toolbox'
								),
								order: 30,
							},
					  ]
					: sections
		);
		addFilter(
			ITEM_FILTER,
			`${ NAMESPACE }/menu-replace`,
			( items: PostSettingsItem[], context: PostSettingsContext ) =>
				isSameContext( config, context )
					? [
							...items,
							{
								id: 'ystdtb/menu-replace',
								section: 'ystdtb/navigation',
								order: 10,
								Component: MenuReplaceSetting,
							},
					  ]
					: items
		);
	}
}

const config = getProviderConfig();
if ( config ) {
	registerPostSettingsProviders( config );
}
