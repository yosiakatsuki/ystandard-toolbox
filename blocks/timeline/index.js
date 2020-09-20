import { ystdtbConfig } from '../../src/js/blocks/config/config';
import edit from './edit';
import save from './save';
import { Clock } from 'react-feather';
import { attributes, supports } from './config';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockType( 'ystdtb/timeline', {
	title: __( 'タイムライン', 'ystandard-blocks' ),
	description: __( 'タイムライン表示ブロック', 'ystandard-blocks' ),
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
} );
