/**
 * WordPress Dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/**
 * Plugin Dependencies
 */
import type { PostMeta, PostSettingsItemProps } from '../types';
import { getProviderConfig } from './config';

export const MENU_REPLACE_META_KEY = 'ystdtb-menu-replace';

/**
 * 投稿メタがオブジェクトの場合だけ編集値として使用する.
 *
 * @param value 投稿メタ.
 */
function normalizePostMeta( value: unknown ): PostMeta {
	return value !== null && typeof value === 'object'
		? ( value as PostMeta )
		: {};
}

/**
 * メニュー切り替え値がオブジェクトの場合だけ使用する.
 *
 * @param value メニュー切り替え値.
 */
function normalizeMenuReplace( value: unknown ): Record< string, string > {
	return value !== null && typeof value === 'object'
		? ( value as Record< string, string > )
		: {};
}

/**
 * メニュー切り替え設定を表示する.
 *
 * @param props          投稿設定項目props.
 * @param props.postType
 * @param props.postId
 */
export default function MenuReplaceSetting( {
	postType,
	postId,
}: PostSettingsItemProps ) {
	const config = getProviderConfig();
	const [ meta, setMeta ] = useEntityProp(
		'postType',
		postType,
		'meta',
		postId
	);
	if ( ! config?.menuReplace.enabled ) {
		return null;
	}
	const postMeta = normalizePostMeta( meta );
	const menuReplace = normalizeMenuReplace(
		postMeta[ MENU_REPLACE_META_KEY ]
	);
	const options = config.menuReplace.menus.map( ( menu ) => ( {
		key: menu.value,
		name: menu.label,
	} ) );

	return (
		<div className="ystdtb-post-settings__menu-replace">
			<div className="ystdtb-post-settings__menu-replace-fields">
				{ config.menuReplace.locations.map( ( location ) => {
					// 対象位置だけを更新し、ほかのメニュー設定と投稿メタを保持する.
					const updateValue = ( menuId: string ) => {
						setMeta( {
							...postMeta,
							[ MENU_REPLACE_META_KEY ]: {
								...menuReplace,
								[ location.name ]: menuId,
							},
						} );
					};

					return (
						<BaseControl key={ location.name }>
							<CustomSelectControl
								label={ location.label }
								value={ menuReplace[ location.name ] || '' }
								options={ options }
								onChange={ updateValue }
								useEmptyValue={ false }
							/>
						</BaseControl>
					);
				} ) }
			</div>
			<p className="ystdtb-post-settings__menu-replace-notice">
				{ __(
					'この投稿を表示するときだけ、選択したメニューへ切り替えます。',
					'ystandard-toolbox'
				) }
			</p>
		</div>
	);
}
