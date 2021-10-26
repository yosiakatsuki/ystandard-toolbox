import { ystdtbConfig } from '@ystdtb/config';
import { registerBlockType } from '@wordpress/blocks';
import { attributes, supports } from './config';
import edit from './edit';
import { Share2 } from 'react-feather';
import { __ } from '@wordpress/i18n';

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
