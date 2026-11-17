import { Columns } from 'react-feather';

/* WordPress Dependencies */
import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';

/* Aktk Dependencies */
import { COLORS } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';

/* Plugin Dependencies */
import { CATEGORY } from '@aktk/blocks/config';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

/**
 * 片方が追従できるカラムを登録する。
 */
export function registerStickyColumnsBlock() {
	registerBlockType( metadata as BlockConfiguration, {
		category: CATEGORY.common,
		attributes: mergeDefaultAttributes(
			metadata.name,
			metadata.attributes
		) as BlockConfiguration[ 'attributes' ],
		icon: (
			<Columns
				stroke={ COLORS.iconForeground }
				style={ { fill: 'none' } }
			/>
		),
		edit,
		save,
	} );
}

registerStickyColumnsBlock();
