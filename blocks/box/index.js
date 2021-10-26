import { Box } from 'react-feather';
import { registerBlockType } from '@wordpress/blocks';
import { ystdtbConfig } from '@ystdtb/config';
import { __, _x } from '@wordpress/i18n';
import { mergeDefaultAttributes } from '@ystdtb/helper/attribute';
import edit from './edit';
import save from './save';
import { attributes, supports } from './config';
import { deprecated } from "./deprecated";

const blockName = 'ystdtb/box';
const blockAttributes = mergeDefaultAttributes( blockName, attributes );

registerBlockType( blockName, {
	apiVersion: 2,
	title: __( 'ボックス', 'ystandard-toolbox' ),
	description: __( '囲み枠ブロック', 'ystandard-toolbox' ),
	icon: (
		<Box
			stroke={ ystdtbConfig.color.iconForeground }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [ _x( 'box', 'block-keywords', 'ystandard-toolbox' ), 'box' ],
	category: ystdtbConfig.category.common,
	attributes: blockAttributes,
	supports,
	edit,
	save,
	deprecated,
	example: {
		attributes: {
			label: __( 'ボックスラベル', 'ystandard-toolbox' ),
			boxBorderColor: '#07689f',
			boxBorderSize: '2px',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'ボックスコンテンツ', 'ystandard-toolbox' ),
				},
			},
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'ボックスコンテンツ', 'ystandard-toolbox' ),
				},
			},
		],
	},
} );
