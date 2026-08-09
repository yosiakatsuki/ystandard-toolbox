/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';

/**
 * Block Dependencies
 */
import { FORMAT_TOOLBAR_GROUPS, LINE_ICON_STYLE } from './config';
import { InlineFormatIcon } from './icon';
import type { FormatEditProps } from './types';

/**
 * インラインフォーマット共通ツールバー
 *
 * yStandard Toolboxのインラインフォーマットをまとめたドロップダウンを
 * フォーマットツールバーに追加する.
 * 機能を追加した場合もボタンは1つのままで、
 * ドロップダウン内がグループごとに区切って増えていく.
 *
 * @param props フォーマットのeditプロパティ.
 *
 * @return 共通ツールバー.
 */
export function InlineFormatToolbar( props: FormatEditProps ) {
	// グループごとの項目をドロップダウン用の形式に変換する
	const controlSets = FORMAT_TOOLBAR_GROUPS.map( ( group ) => {
		return group
			.getControls( props )
			.map( ( { title, icon: ControlIcon, onClick } ) => {
				return {
					title,
					icon: <ControlIcon style={ LINE_ICON_STYLE } />,
					onClick,
				};
			} );
	} ).filter( ( controls ) => 0 < controls.length );

	if ( 0 === controlSets.length ) {
		return null;
	}

	// ToolbarGroupで包むとgroupの余白・区切り線が入り、
	// コアのフォーマットボタン(48px)と幅が揃わないため直接描画する
	return (
		<BlockControls group="inline">
			<ToolbarDropdownMenu
				icon={ <InlineFormatIcon /> }
				label={ __( 'yStandard Toolbox', 'ystandard-toolbox' ) }
				controls={ controlSets }
			/>
		</BlockControls>
	);
}
