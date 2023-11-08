import { ystdtbConfig } from '@ystd/config';
import edit from './edit';
import save from './save';
import { List } from 'react-feather';
import { attributes, supports } from './config';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockType( 'ystdtb/icon-list-item', {
    apiVersion: 2,
    title: __( 'アイコンリストアイテム', 'ystandard-toolbox' ),
    description: __(
        'アイコンを表示できるリストブロックの行',
        'ystandard-toolbox'
    ),
    icon: (
        <List
            stroke={ ystdtbConfig.color.iconForegroundChild }
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
    parent: [ 'ystdtb/icon-list' ],
} );
