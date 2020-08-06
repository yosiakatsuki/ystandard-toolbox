import { ystdtbConfig } from "../../src/js/blocks/config/config";
import { registerBlockType } from '@wordpress/blocks';
import { attributes, supports } from "./config";
import edit from './edit';
import { Archive } from 'react-feather';
import { __ } from '@wordpress/i18n';

registerBlockType( 'ystdtb/posts', {
	title: __( '記事一覧', 'ystandard-toolbox' ),
	description: __( '投稿一覧を表示するブロック', 'ystandard-toolbox' ),
	icon: (
		<Archive
			stroke={ ystdtbConfig.color.iconForeground }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [
		__( 'posts' ),
		__( 'post' ),
		__( '記事一覧' ),
		'posts',
	],
	category: ystdtbConfig.category.common,
	attributes,
	supports,
	edit,
	save() {
		return null;
	},
} );
