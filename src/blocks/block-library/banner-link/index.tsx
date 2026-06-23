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
import { COLORS } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';
import { CATEGORY } from '@aktk/blocks/config';

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

	// @ts-ignore
	registerBlockType( metadata.name, {
		...metadata,
		...{
			icon: (
				<Image
					stroke={ COLORS.iconBetaForeground }
					style={ { fill: 'none' } }
				/>
			),
			category: CATEGORY.beta,
			attributes,
			edit,
			save,
		},
	} );
}

registerBannerLinkBlock();
