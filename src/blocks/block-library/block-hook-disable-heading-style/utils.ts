import classnames from 'classnames/dedupe';

/* WordPress Dependencies */
import { applyFilters } from '@wordpress/hooks';

/* Block Dependencies */
import type { ExtendedBlockConfiguration } from './types';

/** 見出しデザインを無効化する状態クラス。 */
export const DISABLE_HEADING_STYLE_CLASS = 'is-ystdtb-heading-style-disabled';

/** 対象ブロックを拡張するJavaScriptフック。 */
export const TARGET_BLOCKS_FILTER =
	'yStandardToolbox.disableHeadingStyle.targetBlocks';

/** 初期状態で見出しデザイン無効化設定を追加するブロック。 */
export const DEFAULT_TARGET_BLOCKS = [ 'core/heading', 'core/post-title' ];

/**
 * 見出しデザイン無効化設定の対象ブロックを取得する。
 *
 * @return 対象ブロック名。
 */
export function getTargetBlocks(): string[] {
	const filteredBlocks = applyFilters( TARGET_BLOCKS_FILTER, [
		...DEFAULT_TARGET_BLOCKS,
	] );

	// 不正なフック戻り値で既定ブロックの設定が消えないようにする。
	if ( ! Array.isArray( filteredBlocks ) ) {
		return [ ...DEFAULT_TARGET_BLOCKS ];
	}

	return [
		...new Set(
			filteredBlocks.filter(
				( blockName ): blockName is string =>
					typeof blockName === 'string' && blockName.length > 0
			)
		),
	];
}

/**
 * 指定したブロックが見出しデザイン無効化設定の対象か判定する。
 *
 * @param blockName ブロック名。
 * @return 対象ブロックの場合はtrue。
 */
export function isTargetBlock( blockName: string ): boolean {
	return getTargetBlocks().includes( blockName );
}

/**
 * 見出しデザイン無効化クラスが設定されているか判定する。
 *
 * @param className CSSクラス。
 * @return 状態クラスが含まれる場合はtrue。
 */
export function isHeadingStyleDisabled( className?: string ): boolean {
	return ( className || '' )
		.split( /\s+/ )
		.includes( DISABLE_HEADING_STYLE_CLASS );
}

/**
 * 見出しデザイン無効化クラスを追加または削除する。
 *
 * @param className CSSクラス。
 * @param disabled  見出しデザインを無効化するか。
 * @return 更新後のCSSクラス。
 */
export function updateHeadingStyleClassName(
	className: string | undefined,
	disabled: boolean
): string | undefined {
	const updatedClassName = classnames( className, {
		[ DISABLE_HEADING_STYLE_CLASS ]: disabled,
	} );

	return updatedClassName || undefined;
}

/**
 * 対象ブロックへclassName属性を追加する。
 *
 * @param settings  ブロック設定。
 * @param blockName ブロック名。
 * @return 更新後のブロック設定。
 */
export function addClassNameAttribute(
	settings: ExtendedBlockConfiguration,
	blockName: string
): ExtendedBlockConfiguration {
	// 対象外ブロックの属性定義を変更しない。
	if ( ! isTargetBlock( blockName ) ) {
		return settings;
	}

	// WordPressまたはブロック側のclassName定義を優先する。
	if ( settings.attributes?.className ) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			className: {
				type: 'string',
			},
		},
	};
}

/**
 * 保存HTMLのルート要素へ見出しデザイン無効化クラスを追加する。
 *
 * @param extraProps           保存要素のプロパティ。
 * @param blockType            ブロック設定。
 * @param attributes           ブロック属性。
 * @param attributes.className 追加CSSクラス。
 * @return 更新後の保存要素プロパティ。
 */
export function addDisableHeadingStyleSaveProps(
	extraProps: Record< string, any >,
	blockType: ExtendedBlockConfiguration,
	attributes: { className?: string }
): Record< string, any > {
	// 対象外ブロックの保存HTMLを変更しない。
	if ( ! isTargetBlock( blockType.name || '' ) ) {
		return extraProps;
	}

	// 無効化されていないブロックへ状態クラスを追加しない。
	if ( ! isHeadingStyleDisabled( attributes.className ) ) {
		return extraProps;
	}

	return {
		...extraProps,
		className: classnames(
			extraProps.className,
			DISABLE_HEADING_STYLE_CLASS
		),
	};
}
