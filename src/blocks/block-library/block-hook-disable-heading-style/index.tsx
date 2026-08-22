import classnames from 'classnames/dedupe';

/* WordPress Dependencies */
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';

/* Plugin Dependencies */
import { BlockHookPanel } from '@aktk/components/block-hook-panel';

/* Block Dependencies */
import type {
	BlockEditProps,
	BlockListBlockProps,
	ExtendedBlockConfiguration,
} from './types';
import {
	addClassNameAttribute,
	addDisableHeadingStyleSaveProps,
	DISABLE_HEADING_STYLE_CLASS,
	isHeadingStyleDisabled,
	isTargetBlock,
	updateHeadingStyleClassName,
} from './utils';

const HOOK_NAME = 'disable-heading-style';

/**
 * ブロック登録時に対象ブロックへclassName属性を追加する。
 *
 * @param settings ブロック設定。
 * @param name     ブロック名。
 * @return 更新後のブロック設定。
 */
function addBlockAttributes(
	settings: ExtendedBlockConfiguration,
	name: string
): ExtendedBlockConfiguration {
	return addClassNameAttribute( settings, name || settings.name || '' );
}

addFilter(
	'blocks.registerBlockType',
	'ystandard-toolbox/disable-heading-style/attributes',
	addBlockAttributes,
	20
);

/**
 * 見出しデザイン無効化設定をブロック設定サイドバーへ追加する。
 */
const addBlockControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props: BlockEditProps ) => {
		const { attributes, setAttributes, name } = props;

		// 見出しタグを扱わないブロックへ設定を表示しない。
		if ( ! isTargetBlock( name ) ) {
			return <BlockEdit { ...props } />;
		}

		const isDisabled = isHeadingStyleDisabled( attributes.className );

		// 追加CSSクラスを正本として無効化状態を切り替える。
		const handleToggle = ( disabled: boolean ) => {
			setAttributes( {
				className: updateHeadingStyleClassName(
					attributes.className,
					disabled
				),
			} );
		};

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<BlockHookPanel
						title={ __( '見出しデザイン', 'ystandard-toolbox' ) }
						className={ HOOK_NAME }
						isEnabled={ isDisabled }
					>
						<ToggleControl
							label={ __(
								'Toolboxの見出しデザインを無効化',
								'ystandard-toolbox'
							) }
							checked={ isDisabled }
							onChange={ handleToggle }
							__nextHasNoMarginBottom
						/>
					</BlockHookPanel>
				</InspectorControls>
			</>
		);
	};
}, 'withYstandardToolboxDisableHeadingStyleBlockEdit' );

addFilter(
	'editor.BlockEdit',
	'ystandard-toolbox/disable-heading-style/block-edit',
	addBlockControl,
	20
);

/**
 * エディター上の対象ブロックへ見出しデザイン無効化クラスを追加する。
 */
const addEditorClass = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props: BlockListBlockProps ) => {
		// 対象外ブロックのエディター表示を変更しない。
		if ( ! isTargetBlock( props.name ) ) {
			return <BlockListBlock { ...props } />;
		}

		// 無効化されていないブロックへ状態クラスを追加しない。
		if ( ! isHeadingStyleDisabled( props.attributes.className ) ) {
			return <BlockListBlock { ...props } />;
		}

		return (
			<BlockListBlock
				{ ...props }
				className={ classnames(
					props.className,
					DISABLE_HEADING_STYLE_CLASS
				) }
			/>
		);
	};
}, 'withYstandardToolboxDisableHeadingStyleBlockListBlock' );

addFilter(
	'editor.BlockListBlock',
	'ystandard-toolbox/disable-heading-style/block-list-block',
	addEditorClass,
	20
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'ystandard-toolbox/disable-heading-style/save-props',
	addDisableHeadingStyleSaveProps,
	20
);
