import { Square } from 'react-feather';

/* WordPress Dependencies */
import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';

/* Aktk Dependencies */
import { COLORS } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';

/* Plugin Dependencies */
import { CATEGORY } from '@aktk/blocks/config';
import type { ColumnItemAttributes } from './dimensions';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

/**
 * 片方が追従できるカラムの子ブロックを登録する。
 */
export function registerStickyColumnsItemBlock() {
	registerBlockType< ColumnItemAttributes >(
		metadata as BlockConfiguration< ColumnItemAttributes >,
		{
			category: CATEGORY.common,
			attributes: mergeDefaultAttributes(
				metadata.name,
				metadata.attributes
			) as BlockConfiguration< ColumnItemAttributes >[ 'attributes' ],
			icon: (
				<Square
					stroke={ COLORS.iconForegroundChild }
					style={ { fill: 'none' } }
				/>
			),
			edit,
			save,
		}
	);
}

registerStickyColumnsItemBlock();
