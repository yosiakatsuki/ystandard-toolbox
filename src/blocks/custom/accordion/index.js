import { CreditCard } from 'react-feather';
/**
 * WordPress
 */
import { registerBlockType } from '@wordpress/blocks';
/**
 * yStandard
 */
import BlockIcon, { blockIconColor } from '@aktk/components/block-icon';
import { mergeDefaultAttributes } from '@aktk/helper/attribute';

/**
 * Block.
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import './style.scss';

registerBlockType( metadata.name, {
	attributes: mergeDefaultAttributes( metadata.name, metadata.attributes ),
	icon: <BlockIcon Icon={ CreditCard } color={ blockIconColor.beta } />,
	edit: Edit,
	save: Save,
} );
