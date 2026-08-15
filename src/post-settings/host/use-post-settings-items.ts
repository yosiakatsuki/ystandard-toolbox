/**
 * WordPress Dependencies
 */
import { useEffect, useMemo, useState } from '@wordpress/element';
import { addAction, applyFilters, removeAction } from '@wordpress/hooks';

/**
 * Plugin Dependencies
 */
import {
	ITEM_FILTER,
	SECTION_FILTER,
	type PostSettingsContext,
	type PostSettingsItem,
	type PostSettingsSection,
} from '../types';

const OBSERVER_NAMESPACE = 'ystandard-toolbox/post-settings-modal-host';

type Definition = PostSettingsSection | PostSettingsItem;

interface IndexedDefinition< T extends Definition > {
	definition: T;
	index: number;
}

/**
 * 不正な投稿設定定義を開発者へ通知する.
 *
 * @param type 定義種別.
 */
function warnInvalidDefinition( type: 'section' | 'item' ) {
	if ( process.env.NODE_ENV !== 'production' ) {
		// eslint-disable-next-line no-console
		console.warn(
			`Invalid post settings ${ type } definition was ignored.`
		);
	}
}

/**
 * 定義IDの重複を解決して表示順に並べる.
 *
 * @param definitions 定義一覧.
 */
function sortDefinitions< T extends Definition >( definitions: T[] ): T[] {
	const definitionsById = new Map< string, IndexedDefinition< T > >();
	definitions.forEach( ( definition, index ) => {
		definitionsById.set( definition.id, { definition, index } );
	} );

	return Array.from( definitionsById.values() )
		.sort( ( a, b ) => {
			if ( a.definition.order === b.definition.order ) {
				return a.index - b.index;
			}
			return a.definition.order - b.definition.order;
		} )
		.map( ( { definition } ) => definition );
}

/**
 * 登録済みの投稿設定セクションを取得する.
 *
 * @param context 投稿設定コンテキスト.
 */
export function getPostSettingsSections(
	context: PostSettingsContext
): PostSettingsSection[] {
	const definitions = applyFilters( SECTION_FILTER, [], context );
	if ( ! Array.isArray( definitions ) ) {
		warnInvalidDefinition( 'section' );
		return [];
	}

	const sections = definitions.filter(
		( definition ): definition is PostSettingsSection => {
			const isValid =
				definition !== null &&
				typeof definition === 'object' &&
				typeof definition.id === 'string' &&
				definition.id !== '' &&
				typeof definition.title === 'string' &&
				definition.title !== '' &&
				typeof definition.order === 'number' &&
				Number.isFinite( definition.order );
			if ( ! isValid ) {
				warnInvalidDefinition( 'section' );
			}
			return isValid;
		}
	);

	return sortDefinitions( sections );
}

/**
 * 登録済みの投稿設定項目を取得する.
 *
 * @param context  投稿設定コンテキスト.
 * @param sections 検証済みセクション.
 */
export function getPostSettingsItems(
	context: PostSettingsContext,
	sections: PostSettingsSection[]
): PostSettingsItem[] {
	const definitions = applyFilters( ITEM_FILTER, [], context );
	if ( ! Array.isArray( definitions ) ) {
		warnInvalidDefinition( 'item' );
		return [];
	}
	const sectionIds = new Set( sections.map( ( section ) => section.id ) );
	const items = definitions.filter(
		( definition ): definition is PostSettingsItem => {
			const isValid =
				definition !== null &&
				typeof definition === 'object' &&
				typeof definition.id === 'string' &&
				definition.id !== '' &&
				typeof definition.section === 'string' &&
				sectionIds.has( definition.section ) &&
				typeof definition.order === 'number' &&
				Number.isFinite( definition.order ) &&
				typeof definition.Component === 'function';
			if ( ! isValid ) {
				warnInvalidDefinition( 'item' );
			}
			return isValid;
		}
	);

	return sortDefinitions( items );
}

/**
 * 投稿設定フックを監視して表示用の定義一覧を返す.
 *
 * @param context 投稿設定コンテキスト.
 */
export function usePostSettingsItems( context: PostSettingsContext ) {
	const [ revision, setRevision ] = useState( 0 );

	useEffect( () => {
		// 対象フックの追加・解除時だけ定義一覧を再取得する.
		const refreshDefinitions = ( hookName: string ) => {
			if ( hookName === SECTION_FILTER || hookName === ITEM_FILTER ) {
				setRevision( ( current ) => current + 1 );
			}
		};

		addAction(
			'hookAdded',
			`${ OBSERVER_NAMESPACE }/added`,
			refreshDefinitions
		);
		addAction(
			'hookRemoved',
			`${ OBSERVER_NAMESPACE }/removed`,
			refreshDefinitions
		);

		return () => {
			removeAction( 'hookAdded', `${ OBSERVER_NAMESPACE }/added` );
			removeAction( 'hookRemoved', `${ OBSERVER_NAMESPACE }/removed` );
		};
	}, [] );

	return useMemo( () => {
		const sections = getPostSettingsSections( context );
		return {
			sections,
			items: getPostSettingsItems( context, sections ),
		};
	}, [ context.apiVersion, context.postId, context.postType, revision ] );
}
