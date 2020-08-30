import { ystdtbConfig } from '../../../src/js/blocks/config/config';
import edit from './edit';
import save from './save';
import { MessageCircle } from 'react-feather';
import { attributes, supports } from './config';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockType( 'ystdtb/faq-item', {
	title: __( 'Q&A項目', 'ystandard-blocks' ),
	description: __( 'Q&Aの内容', 'ystandard-blocks' ),
	icon: (
		<MessageCircle
			stroke={ ystdtbConfig.color.iconForeground }
			style={ { fill: 'none' } }
		/>
	),
	keywords: [ __( 'faq' ), __( 'Q&A' ), 'faq' ],
	category: ystdtbConfig.category.common,
	supports,
	attributes,
	parent: [ 'ystdtb/faq' ],
	edit,
	save,
} );
