import { ystdtbConfig } from '../../src/js/blocks/config/config';
import edit from './edit';
import save from './save';
import { MessageCircle } from 'react-feather';
import { attributes, supports } from './config';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockType( 'ystdtb/faq', {
	apiVersion: 2,
	title: __( 'Q&A', 'ystandard-toolbox' ),
	description: __( 'Q&A(FAQ)表示ブロック', 'ystandard-toolbox' ),
	icon: (
		<MessageCircle
			stroke={ ystdtbConfig.color.iconForeground }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [ __( 'faq' ), __( 'Q&A' ), 'faq', 'qanda' ],
	category: ystdtbConfig.category.common,
	attributes,
	supports,
	edit,
	save,
	example: {},
} );
