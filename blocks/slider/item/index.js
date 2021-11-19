import { Sidebar } from 'react-feather';
import { registerBlockType } from '@wordpress/blocks';
import { __, _x } from '@wordpress/i18n';
import { ystdtbConfig } from '@ystdtb/config';
import { mergeDefaultAttributes } from '@ystdtb/helper/attribute';
import { attributes, supports } from './config';
import edit from './edit';
import save from './save';

const blockName = 'ystdtb/slider-item';
const blockAttributes = mergeDefaultAttributes( blockName, attributes );

registerBlockType( blockName, {
	apiVersion: 2,
	title: __( 'スライダーアイテム', 'ystandard-toolbox' ),
	description: __(
		'スライダー内で任意のブロックを使うためのブロック',
		'ystandard-toolbox'
	),
	icon: (
		<Sidebar
			stroke={ ystdtbConfig.color.iconForegroundChild }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [
		_x( 'slider', 'block-keywords', 'ystandard-toolbox' ),
		'slider',
	],
	category: ystdtbConfig.category.common,
	attributes: blockAttributes,
	supports,
	parent: [ 'ystdtb/slider' ],
	edit,
	save,
	example: {},
} );
