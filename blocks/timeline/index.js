import { ystdtbConfig } from '@aktk/config';
import edit from './edit';
import save from './save';
import { Clock } from 'react-feather';
import { attributes, supports } from './config';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockType( 'ystdtb/timeline', {
	apiVersion: 2,
	title: __( 'タイムライン', 'ystandard-toolbox' ),
	description: __( 'タイムライン表示ブロック', 'ystandard-toolbox' ),
	icon: (
		<Clock
			stroke={ ystdtbConfig.color.iconForeground }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [ __( 'timeline' ), __( 'タイムライン' ), 'timeline' ],
	category: ystdtbConfig.category.common,
	attributes,
	supports,
	edit,
	save,
	example: {},
} );
