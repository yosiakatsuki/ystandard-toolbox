import { registerBlockType } from '@wordpress/blocks';
import { COLORS } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';
import { CATEGORY } from '@aktk/blocks/config';
import { Share2 } from 'react-feather';

// @ts-ignore
import metadata from './block.json';
import edit from './edit';
import './style.scss';

registerBlockType( 'ystdtb/sns-share', {
	title: __( 'シェアボタン', 'ystandard-toolbox' ),
	description: __( 'シェアボタンを表示するブロック', 'ystandard-toolbox' ),
	icon: (
		<Share2
			stroke={ ystdtbConfig.color.iconForeground }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [
		__( 'sns' ),
		__( 'share' ),
		__( 'シェアボタン' ),
		'sns',
		'share',
	],
	category: ystdtbConfig.category.common,
	attributes,
	supports,
	edit,
	save() {
		return null;
	},
	example: {},
} );
