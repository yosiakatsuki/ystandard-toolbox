/**
 * カスタムフック - ブロック拡張：画面サイズによる非表示機能
 */

/**
 * WordPress Dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Plugin Dependencies
 */
import classnames from 'classnames';
import type { HookEnableOptions, PanelClassNameOptions } from './types';

/**
 * フック有効性判定
 *
 * @param blockName ブロック名
 * @param hookName フック名
 * @param disableBlocks 無効化ブロック一覧
 * @returns フック有効性
 */
export const useIsEnableHook = (
	blockName: string,
	hookName: string,
	disableBlocks: string[] = []
): boolean => {
	// 許可する名前空間を取得
	const allowedNameSpaces = applyFilters(
		'yStandardToolbox.hooks.allowedNameSpaces',
		[ 'core', 'ystdb', 'ystdtb' ],
		hookName
	) as string[];

	// ブロック名が許可された名前空間で始まるかチェック
	const filteredAllowedNameSpaces = allowedNameSpaces.filter(
		( namespace ) => {
			return blockName.indexOf( namespace ) === 0;
		}
	);

	if ( filteredAllowedNameSpaces.length <= 0 ) {
		return false;
	}

	// 無効化ブロックリストにあるかチェック
	if ( disableBlocks && disableBlocks.includes( blockName ) ) {
		return false;
	}

	return true;
};

/**
 * パネル用CSSクラス名生成
 *
 * @param hookName フック名
 * @param isEnabled 有効化状態
 * @returns CSSクラス名
 */
export const useGetPanelClassName = (
	hookName: string,
	isEnabled = false
): string => {
	return classnames( 'ystdtb-hook-panel', hookName, {
		'is-enabled': isEnabled,
	} );
};

/**
 * 画面サイズ非表示状態管理
 *
 * @param attributes ブロック属性
 * @param setAttributes 属性更新関数
 * @returns 状態管理オブジェクト
 */
export const useHiddenBySize = (
	attributes: any,
	setAttributes: ( attrs: any ) => void
) => {
	const {
		ystdtbIsHiddenMobile,
		ystdtbIsHiddenTablet,
		ystdtbIsHiddenDesktop,
		className,
	} = attributes;

	// モバイル非表示切り替え
	const handleToggleMobile = ( value: boolean ) => {
		setAttributes( {
			ystdtbIsHiddenMobile: value,
			className: classnames( className, {
				'ystdtb-hidden-mobile': value,
			} ),
		} );
	};

	// タブレット非表示切り替え
	const handleToggleTablet = ( value: boolean ) => {
		setAttributes( {
			ystdtbIsHiddenTablet: value,
			className: classnames( className, {
				'ystdtb-hidden-tablet': value,
			} ),
		} );
	};

	// デスクトップ非表示切り替え
	const handleToggleDesktop = ( value: boolean ) => {
		setAttributes( {
			ystdtbIsHiddenDesktop: value,
			className: classnames( className, {
				'ystdtb-hidden-desktop': value,
			} ),
		} );
	};

	// いずれかの画面サイズで非表示になっているかチェック
	const isAnyHidden =
		ystdtbIsHiddenMobile || ystdtbIsHiddenTablet || ystdtbIsHiddenDesktop;

	return {
		// 状態
		ystdtbIsHiddenMobile,
		ystdtbIsHiddenTablet,
		ystdtbIsHiddenDesktop,
		isAnyHidden,
		// ハンドラー
		handleToggleMobile,
		handleToggleTablet,
		handleToggleDesktop,
	};
};
