import classnames from 'classnames/dedupe';
/**
 * ブロック拡張：画面サイズによる非表示機能
 */

/**
 * WordPress Dependencies
 */
import { hasBlockSupport, getBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { SvgIcon } from '@aktk/block-components/components/svg-icon';
import { ManualLink } from '@aktk/block-components/components/manual-link';

/**
 * Plugin Dependencies
 */

import {
	useIsEnableHook,
	useGetPanelClassName,
	useHiddenBySize,
} from './hooks';
import type {
	HiddenBySizeAttributes,
	BlockEditProps,
	ExtendedBlockConfiguration,
} from './types';

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
 * ブロック登録時に属性を追加
 */
const addBlockAttributes = (
	settings: ExtendedBlockConfiguration
): ExtendedBlockConfiguration => {
	const isEnable = useIsEnableHook( settings.name || '', HOOK_NAME );
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
		const isEnable = useIsEnableHook( name, HOOK_NAME );
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

		// カスタムフック使用
		const {
			ystdtbIsHiddenMobile: hiddenMobile,
			ystdtbIsHiddenTablet: hiddenTablet,
			ystdtbIsHiddenDesktop: hiddenDesktop,
			isAnyHidden,
			handleToggleMobile,
			handleToggleTablet,
			handleToggleDesktop,
		} = useHiddenBySize( attributes, setAttributes );

		// パネルクラス名生成
		const panelClassName = useGetPanelClassName( HOOK_NAME, isAnyHidden );

		return (
			<>
				<BlockEdit { ...props } />

				<InspectorControls>
					<PanelBody
						title={ __(
							'非表示設定(画面サイズ)',
							'ystandard-toolbox'
						) }
						initialOpen={ false }
						icon={ <SvgIcon icon="panel" /> }
						className={ panelClassName }
					>
						<ManualLink
							path={ '/ystdtb-block-option-hidden-by-size/' }
						/>

						<ToggleControl
							label={ __(
								'モバイルで非表示',
								'ystandard-toolbox'
							) }
							checked={ hiddenMobile }
							onChange={ handleToggleMobile }
							__nextHasNoMarginBottom
						/>

						<ToggleControl
							label={ __(
								'タブレットで非表示',
								'ystandard-toolbox'
							) }
							checked={ hiddenTablet }
							onChange={ handleToggleTablet }
							__nextHasNoMarginBottom
						/>

						<ToggleControl
							label={ __( 'PCで非表示', 'ystandard-toolbox' ) }
							checked={ hiddenDesktop }
							onChange={ handleToggleDesktop }
							__nextHasNoMarginBottom
						/>
					</PanelBody>
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
