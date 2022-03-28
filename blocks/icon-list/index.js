import { ystdtbConfig } from '@ystd/config';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import { List } from 'react-feather';
import { attributes, supports } from './config';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockType( 'ystdtb/icon-list', {
	apiVersion: 2,
	title: __( 'アイコンリスト', 'ystandard-toolbox' ),
	description: __(
		'アイコンを表示できるリストブロック',
		'ystandard-toolbox'
	),
	icon: (
		<List
			stroke={ ystdtbConfig.color.iconForeground }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [ __( 'list' ), __( 'icon' ), 'list', 'icon' ],
	category: ystdtbConfig.category.common,
	attributes,
	supports,
	edit,
	save,
	example: {},
	transforms,
} );
