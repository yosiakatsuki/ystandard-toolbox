import classnames from 'classnames/dedupe';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { hasBlockSupport, getBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Aktk Dependencies
 */
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
import { ManualLink } from '@aktk/block-components/components/manual-link';

/**
 * Plugin Dependencies.
 */
import { BlockHookPanel } from '@aktk/components/block-hook-panel';
/**
 * Block Dependencies
 */
import type { BlockEditProps, ExtendedBlockConfiguration } from './types';

import './style.scss';
import './style-editor.scss';

const HOOK_NAME = 'hidden-by-size';

/**
 * ブロック属性定義
 */
const hookAttributes: Record< string, any > = {
	ystdtbIsHiddenMobile: {
		type: 'boolean',
		default: false,
	},
	ystdtbIsHiddenTablet: {
		type: 'boolean',
		default: false,
	},
	ystdtbIsHiddenDesktop: {
		type: 'boolean',
		default: false,
	},
};

/**
 * フック有効性判定
 *
 * @param blockName ブロック名
 * @param hookName フック名
 * @param disableBlocks 無効化ブロック一覧
 * @returns フック有効性
 */
const isEnableHook = (
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
 * ブロック登録時に属性を追加
 */
const addBlockAttributes = (
	settings: ExtendedBlockConfiguration
): ExtendedBlockConfiguration => {
	const isEnable = isEnableHook( settings.name || '', HOOK_NAME );
	if ( ! isEnable ) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		...hookAttributes,
	};
	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'ystandard-toolbox/hidden-by-size/attributes',
	addBlockAttributes
);

/**
 * ブロックエディター拡張コンポーネント
 */
const addBlockControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props: BlockEditProps ) => {
		const { attributes, setAttributes, name } = props;

		const {
			ystdtbIsHiddenMobile,
			ystdtbIsHiddenTablet,
			ystdtbIsHiddenDesktop,
			className,
		} = attributes;

		// フック有効性確認
		const isEnable = isEnableHook( name, HOOK_NAME );
		if ( ! isEnable ) {
			return <BlockEdit { ...props } />;
		}

		// 属性が未定義の場合はスキップ
		if (
			typeof ystdtbIsHiddenMobile === 'undefined' ||
			typeof ystdtbIsHiddenTablet === 'undefined' ||
			typeof ystdtbIsHiddenDesktop === 'undefined'
		) {
			return <BlockEdit { ...props } />;
		}

		// ブロックタイプ取得
		const blockType = getBlockType( name );
		if ( ! blockType ) {
			return <BlockEdit { ...props } />;
		}

		// カスタムクラス名サポート確認
		if ( ! hasBlockSupport( blockType, 'customClassName', true ) ) {
			return <BlockEdit { ...props } />;
		}

		// 画面サイズ非表示サポート確認
		if ( ! hasBlockSupport( blockType, 'ystdtdHiddenBySize', true ) ) {
			return <BlockEdit { ...props } />;
		}

		const isAnyHidden =
			ystdtbIsHiddenMobile ||
			ystdtbIsHiddenTablet ||
			ystdtbIsHiddenDesktop;

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

		return (
			<>
				<BlockEdit { ...props } />

				<InspectorControls>
					<BlockHookPanel
						title={ __(
							'非表示設定(画面サイズ)',
							'ystandard-toolbox'
						) }
						className={ HOOK_NAME }
						isEnabled={ isAnyHidden }
					>
						<div className="flex justify-end mb-2 w-full">
							<ManualLink
								url={
									'https://wp-ystandard.com/manual/ystdtb-block-option-hidden-by-size/'
								}
							/>
						</div>

						<ToggleControl
							label={ __(
								'モバイルで非表示',
								'ystandard-toolbox'
							) }
							checked={ ystdtbIsHiddenMobile }
							onChange={ handleToggleMobile }
							__nextHasNoMarginBottom
						/>

						<ToggleControl
							label={ __(
								'タブレットで非表示',
								'ystandard-toolbox'
							) }
							checked={ ystdtbIsHiddenTablet }
							onChange={ handleToggleTablet }
							__nextHasNoMarginBottom
						/>

						<ToggleControl
							label={ __( 'PCで非表示', 'ystandard-toolbox' ) }
							checked={ ystdtbIsHiddenDesktop }
							onChange={ handleToggleDesktop }
							__nextHasNoMarginBottom
						/>
					</BlockHookPanel>
				</InspectorControls>
			</>
		);
	};
}, 'withYstandardToolboxHiddenBySizeBlockEdit' );

addFilter(
	'editor.BlockEdit',
	'ystandard-toolbox/hidden-by-size/block-edit',
	addBlockControl,
	Number.MAX_SAFE_INTEGER
);
