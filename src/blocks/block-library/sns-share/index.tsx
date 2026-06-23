import { registerBlockType } from '@wordpress/blocks';
import { COLORS } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';
import { CATEGORY } from '@aktk/blocks/config';
import { Share2 } from 'react-feather';

// @ts-ignore
import metadata from './block.json';
import edit from './edit';
import './style.scss';

export function registerSnsShareBlock() {
	const attributes = mergeDefaultAttributes(
		metadata.name,
		metadata.attributes
	);

	// @ts-ignore
	registerBlockType( metadata.name, {
		...metadata,
		icon: () => (
			// @ts-ignore
			<Share2
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

registerSnsShareBlock();
