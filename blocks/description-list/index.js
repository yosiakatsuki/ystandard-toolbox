import { Square } from 'react-feather';
import { registerBlockType } from '@wordpress/blocks';
import { ystdtbConfig } from '@ystdtb/config';
import { __ } from '@wordpress/i18n';
import { mergeDefaultAttributes } from '@ystdtb/helper/attribute';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const attributes = mergeDefaultAttributes( metadata.name, metadata.attributes );

registerBlockType( metadata.name, {
	...metadata,
	...{
		title: __( '定義リスト(dl)', 'ystandard-toolbox' ),
		description: __( '定義リスト(dl)ブロック', 'ystandard-toolbox' ),
		icon: (
			<Square
				stroke={ ystdtbConfig.color.iconForeground }
				style={ { fill: 'none' } }
			/>
		),
		category: ystdtbConfig.category.common,
		attributes,
		edit,
		save,
	},
} );
