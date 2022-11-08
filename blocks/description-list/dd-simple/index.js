import { Square } from 'react-feather';
import { registerBlockType } from '@wordpress/blocks';
import { ystdtbConfig } from '@aktk/config';
import { __ } from '@wordpress/i18n';
import { mergeDefaultAttributes } from '@aktk/helper/attribute';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const attributes = mergeDefaultAttributes( metadata.name, metadata.attributes );

registerBlockType( metadata.name, {
	...metadata,
	...{
		title: __( '定義リスト 説明(dd)シンプル', 'ystandard-toolbox' ),
		description: __(
			'定義リスト 説明(dd)ブロック シンプル版',
			'ystandard-toolbox'
		),
		icon: (
			<Square
				stroke={ ystdtbConfig.color.iconForegroundChild }
				style={ { fill: 'none' } }
			/>
		),
		category: ystdtbConfig.category.common,
		attributes,
		edit,
		save,
	},
} );
