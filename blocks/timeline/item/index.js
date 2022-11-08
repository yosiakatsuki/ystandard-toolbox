import { ystdtbConfig } from '@aktk/config';
import edit from './edit';
import save from './save';
import { Clock } from 'react-feather';
import { attributes, supports } from './config';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockType( 'ystdtb/timeline-item', {
	apiVersion: 2,
	title: __( 'タイムライン(詳細)', 'ystandard-toolbox' ),
	description: __( 'タイムライン表示 詳細ブロック', 'ystandard-toolbox' ),
	icon: (
		<Clock
			stroke={ ystdtbConfig.color.iconForegroundChild }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [ __( 'timeline' ), __( 'タイムライン' ), 'timeline' ],
	category: ystdtbConfig.category.common,
	supports,
	attributes,
	parent: [ 'ystdtb/timeline' ],
	edit,
	save,
} );
