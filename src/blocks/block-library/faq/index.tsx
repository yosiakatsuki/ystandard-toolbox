import { MessageCircle } from 'react-feather';
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
import './style.scss';

/**
 * FAQブロック登録
 */
export function registerFaqBlock() {
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
				<MessageCircle
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

registerFaqBlock();
