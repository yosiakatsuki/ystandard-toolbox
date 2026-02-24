import { Archive } from 'react-feather';

/**
 * WordPress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Aktk dependencies.
 */
import { COLORS } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';

/**
 * Plugin dependencies.
 */
import { CATEGORY } from '@aktk/blocks/config';

/**
 * Block dependencies.
 */
// @ts-ignore
import metadata from './block.json';
import edit from './edit';
import './style.scss';

export function registerPostsBlock() {
	const attributes = mergeDefaultAttributes(
		metadata.name,
		metadata.attributes
	);

	// @ts-ignore
	registerBlockType( metadata.name, {
		...metadata,
		icon: () => (
			// @ts-ignore
			<Archive
				stroke={ COLORS.iconForeground }
				style={ { fill: 'none' } }
			/>
		),
		category: CATEGORY.common,
		attributes,
		edit,
		save() {
			return null;
		},
	} );
}

registerPostsBlock();
