import { registerBlockType } from '@wordpress/blocks';
import { attributes, supports } from './config';
import edit from './edit';
import { HardDrive } from 'react-feather';
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import { COLORS } from '@aktk/block-components/config';

/*
 * Plugin Dependencies
 */
import { CATEGORY } from '@aktk/blocks/config';

registerBlockType( 'ystdtb/parts', {
	apiVersion: 2,
	title: __( '[ys]パーツ', 'ystandard-toolbox' ),
	description: __( '[ys]パーツを表示するブロック', 'ystandard-toolbox' ),
	icon: (
		<HardDrive
			stroke={ COLORS.iconForeground }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [ __( 'parts' ), __( 'パーツ' ), 'parts', 'ys-parts' ],
	category: CATEGORY.common,
	attributes,
	supports,
	edit,
	save() {
		return null;
	},
	example: {},
} );
