import { List } from 'react-feather';
/*
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/*
 * Aktk Dependencies
 */
import { COLORS } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';

/*
 * Plugin Dependencies
 */
import { CATEGORY } from '@aktk/blocks/config';
// @ts-ignore
import metadata from './block.json';
import edit from './edit';
import save from './save';

export const blockClassName = 'ystdtb-icon-list-item';

/**
 * アイコンリストブロック登録
 */
export function registerIconListItemBlock() {
	const attributes = mergeDefaultAttributes(
		metadata.name,
		metadata.attributes
	);

	// @ts-ignore
	registerBlockType( metadata.name, {
		...metadata,
		...{
			icon: (
				// @ts-ignore
				<List
					stroke={ COLORS.iconForegroundChild }
					style={ { fill: 'none' } }
				/>
			),
			category: CATEGORY.common,
			attributes,
			edit,
			save,
		},
	} );
}

registerIconListItemBlock();
