/*
 * External Dependencies
 */
import { Image } from 'react-feather';

/*
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/*
 * Aktk Dependencies
 */
import { COLORS, CATEGORY } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';

/*
 * Plugin Dependencies
 */
// @ts-ignore
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

export function registerBannerLinkBlock() {
	const attributes = mergeDefaultAttributes(
		metadata.name,
		metadata.attributes
	);

	registerBlockType( metadata.name, {
		...metadata,
		...{
			icon: (
				<Image
					stroke={ COLORS.iconForeground }
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

registerBannerLinkBlock();
