import { ystdtbConfig } from '@aktk/config';
import { registerBlockType } from '@wordpress/blocks';
import { attributes, supports } from './config';
import edit from './edit';
import { HardDrive } from 'react-feather';
import { __ } from '@wordpress/i18n';

registerBlockType( 'ystdtb/parts', {
	apiVersion: 2,
	title: __( '[ys]パーツ', 'ystandard-toolbox' ),
	description: __( '[ys]パーツを表示するブロック', 'ystandard-toolbox' ),
	icon: (
		<HardDrive
			stroke={ ystdtbConfig.color.iconForeground }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [ __( 'parts' ), __( 'パーツ' ), 'parts', 'ys-parts' ],
	category: ystdtbConfig.category.common,
	attributes,
	supports,
	edit,
	save() {
		return null;
	},
	example: {},
} );
