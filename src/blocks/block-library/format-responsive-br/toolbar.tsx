import { CornerDownLeft } from 'react-feather';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup } from '@wordpress/components';

/**
 * Block Dependencies
 */
import { RESPONSIVE_BREAKS } from './config';
import { insertResponsiveBreak } from './utils';
import type { FormatEditProps } from './types';

/**
 * レスポンシブ改行の挿入ツールバー
 *
 * フォーマットツールバー(BlockControls group="inline")に
 * 改行の種類を選ぶドロップダウンを追加する.
 *
 * @param props フォーマットのeditプロパティ.
 *
 * @return ツールバーのドロップダウン.
 */
export function ResponsiveBreakToolbar( props: FormatEditProps ) {
	const { value, onChange } = props;

	// 選択中の位置にレスポンシブ改行を挿入する
	const handleInsert = ( formatName: string ) => {
		onChange( insertResponsiveBreak( value, formatName ) );
	};

	const controls = RESPONSIVE_BREAKS.map(
		( { name, title, icon: BreakIcon } ) => {
			return {
				title,
				icon: <BreakIcon />,
				onClick: () => {
					handleInsert( name );
				},
			};
		}
	);

	return (
		<BlockControls group="inline">
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon={ <CornerDownLeft /> }
					label={ __( 'レスポンシブ改行', 'ystandard-toolbox' ) }
					controls={ controls }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}
