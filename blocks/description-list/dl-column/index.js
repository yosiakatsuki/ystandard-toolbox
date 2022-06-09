import { Columns } from 'react-feather';
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
		title: __( '定義リスト(横並び)', 'ystandard-toolbox' ),
		description: __(
			'定義リスト 用語(dt)と説明(dd)を横並びに表示するブロック',
			'ystandard-toolbox'
		),
		icon: (
			<Columns
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
