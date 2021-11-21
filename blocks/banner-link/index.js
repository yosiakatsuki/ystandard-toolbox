import { Image } from 'react-feather';
import { registerBlockType } from '@wordpress/blocks';
import { __, _x } from '@wordpress/i18n';
import { ystdtbConfig } from '@ystdtb/config';
import { mergeDefaultAttributes } from '@ystdtb/helper/attribute';
import { attributes, supports } from './config';
import edit from './edit';
import save from './save';

const blockName = 'ystdtb/banner-link';
const blockAttributes = mergeDefaultAttributes( blockName, attributes );

registerBlockType( blockName, {
	apiVersion: 2,
	title: __( 'バナーリンク', 'ystandard-toolbox' ),
	description: __(
		'画像の上にテキストを配置したバナー型のリンクを作れるブロック',
		'ystandard-toolbox'
	),
	icon: (
		<Image
			stroke={ ystdtbConfig.color.iconBeta }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [
		_x( 'banner-link', 'block-keywords', 'ystandard-toolbox' ),
		_x( 'banner', 'block-keywords', 'ystandard-toolbox' ),
		'banner-link',
		'banner',
		'link',
	],
	category: ystdtbConfig.category.beta,
	attributes: blockAttributes,
	supports,
	edit,
	save,
	example: {},
} );
